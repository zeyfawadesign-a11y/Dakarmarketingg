import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { MongoClient } from 'mongodb';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const MONGODB_URI = process.env.MONGODB_URI || '';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';
const ADMIN_EMAIL = 'juniorentreprise@bem.sn';

const resend = new Resend(RESEND_API_KEY);
let cachedDb: any = null;

// SANITIZATION XSS
function escapeHtml(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Connexion MongoDB avec cache
async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('dakarmarketing');
  cachedDb = db;
  return db;
}

// Templates HTML
const templates: Record<string, (d: any) => string> = {
  contact: (d: any) => `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Nouveau message de contact</h2>
        <p><strong>De:</strong> ${d.name || 'Inconnu'}</p>
        <p><strong>Email:</strong> ${d.email || 'Non fourni'}</p>
        <p><strong>Téléphone:</strong> ${d.phone || 'Non fourni'}</p>
        <p><strong>Entreprise:</strong> ${d.company || 'Non fournie'}</p>
        <p><strong>Message:</strong></p>
        <p>${d.message || 'Aucun message'}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Dakar Marketing - Junior Entreprise BEM</p>
      </body>
    </html>
  `,

  devis: (d: any) => `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Nouvelle demande de devis</h2>
        <p><strong>De:</strong> ${d.name || d.fullName || 'Inconnu'}</p>
        <p><strong>Entreprise:</strong> ${d.company || d.entreprise || 'Non fournie'}</p>
        <p><strong>Email:</strong> ${d.email || 'Non fourni'}</p>
        <p><strong>Téléphone:</strong> ${d.phone || d.telephone || 'Non fourni'}</p>
        <p><strong>Service:</strong> ${d.service || d.typeService || 'Non précisé'}</p>
        <p><strong>Budget:</strong> ${d.budget || 'Non précisé'}</p>
        <p><strong>Description:</strong></p>
        <p>${d.message || d.description || 'Aucune description'}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Dakar Marketing - Junior Entreprise BEM</p>
      </body>
    </html>
  `,

  chatbot: (d: any) => `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Demande de rendez-vous</h2>
        <p><strong>De:</strong> ${d.name || 'Inconnu'}</p>
        <p><strong>Email:</strong> ${d.email || 'Non fourni'}</p>
        <p><strong>Téléphone:</strong> ${d.phone || 'Non fourni'}</p>
        <p><strong>Date souhaitée:</strong> ${d.date || 'À définir'}</p>
        <p><strong>Service:</strong> ${d.service || 'Non précisé'}</p>
        <p><strong>Motif:</strong></p>
        <p>${d.message || 'Non précisé'}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Dakar Marketing - Junior Entreprise BEM</p>
      </body>
    </html>
  `,

  newsletter: (d: any) => `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Nouvelle inscription newsletter</h2>
        <p><strong>Adresse email :</strong> ${d.email || 'Non fourni'}</p>
        <p><strong>Source :</strong> ${d.source || 'Non précisé'}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Dakar Marketing - Junior Entreprise BEM</p>
      </body>
    </html>
  `
};

function confirmationClient(type: string, d: any) {
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Merci de nous avoir contactés !</h2>
        <p>Bonjour ${d.name || 'client'},</p>
        <p>Nous avons bien reçu votre ${type === 'devis' ? 'demande de devis' : type === 'chatbot' || type === 'chatbot_lead' ? 'demande de rendez-vous' : type === 'newsletter' ? 'inscription à la newsletter' : 'message'}.</p>
        <p>Notre équipe reviendra vers vous dans les plus brefs délais.</p>
        <p>À très bientôt !</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Dakar Marketing - Junior Entreprise BEM<br>
          Email: contact@dakarmarketing.sn
        </p>
      </body>
    </html>
  `;
}

const rateLimitMap = new Map<string, number[]>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { recaptchaToken, type, data } = req.body;

    if (!recaptchaToken) {
      console.warn('Token reCAPTCHA manquant - poursuite avec risque');
    } else {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        { method: 'POST' }
      );
      const recaptchaResult = await recaptchaResponse.json();

      console.log('reCAPTCHA result:', recaptchaResult);

      if (!recaptchaResult.success || (recaptchaResult.score && recaptchaResult.score < 0.3)) {
        return res.status(403).json({
          error: 'Vérification de sécurité échouée',
          debug: { score: recaptchaResult.score }
        });
      }
    }

    if (!type || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const key = `${ip}_${type}`;
    const attempts = rateLimitMap.get(key) || [];
    const recentAttempts = attempts.filter(t => now - t < 10 * 60 * 1000);

    if (recentAttempts.length >= 3) {
      return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans 10 minutes.' });
    }

    rateLimitMap.set(key, [...recentAttempts, now]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidChars = /[\r\n\0]/;

    if (data.email && (invalidChars.test(data.email) || !emailRegex.test(data.email))) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const sanitizedData = {
      name: escapeHtml(data.name || `${data.prenom || ''} ${data.nom || ''}`.trim() || ''),
      email: data.email || '',
      phone: escapeHtml(data.phone || data.telephone || ''),
      message: escapeHtml(data.message || data.description || data.notes || ''),
      company: escapeHtml(data.company || data.entreprise || ''),
      date: escapeHtml(data.date || ''),
      service: escapeHtml(data.service || data.typeService || ''),
      budget: escapeHtml(data.budget || ''),
      source: escapeHtml(data.source || ''),
    };

    let fromAddress = 'contact@dakarmarketing.sn';
    if (type === 'devis') fromAddress = 'devis@dakarmarketing.sn';

    const results: any[] = [];

    if (sanitizedData.email) {
      try {
        const clientSubject = type === 'devis'
          ? 'Votre demande de devis a été reçue'
          : type === 'chatbot' || type === 'chatbot_lead'
            ? 'Confirmation de votre demande de rendez-vous'
            : type === 'newsletter'
              ? 'Inscription newsletter confirmée'
              : 'Confirmation de votre message';

        const clientHtml = type === 'newsletter'
          ? `<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; padding: 20px;"><h2>Merci pour votre inscription à la newsletter</h2><p>Vous êtes maintenant inscrit(e) à notre newsletter.</p><hr><p style="font-size: 12px; color: #666;">Dakar Marketing - Junior Entreprise BEM</p></body></html>`
          : confirmationClient(type, sanitizedData);

        const clientResult = await resend.emails.send({
          from: `Dakar Marketing <${fromAddress}>`,
          to: [sanitizedData.email],
          subject: clientSubject,
          html: clientHtml,
        });

        results.push({ type: 'client', success: true, data: clientResult });
      } catch (error: any) {
        console.error('Erreur envoi client:', error);
        results.push({ type: 'client', success: false, error: error.message });
      }
    }

    try {
      const adminSubject = type === 'devis'
        ? 'Nouvelle demande de devis'
        : type === 'chatbot' || type === 'chatbot_lead'
          ? 'Nouvelle demande de rendez-vous'
          : type === 'newsletter'
            ? 'Nouvelle inscription newsletter'
            : 'Nouveau message de contact';

      const templateType = type === 'chatbot_lead' ? 'chatbot' : type;
      const adminHtml = templates[templateType] ? templates[templateType](sanitizedData) : templates.contact(sanitizedData);

      const adminResult = await resend.emails.send({
        from: `Notifications Dakar Marketing <notifications@dakarmarketing.sn>`,
        to: [ADMIN_EMAIL],
        subject: adminSubject,
        html: adminHtml,
      });

      results.push({ type: 'admin', success: true, data: adminResult });
    } catch (error: any) {
      console.error('Erreur envoi admin:', error);
      results.push({ type: 'admin', success: false, error: error.message });
    }

    try {
      const db = await connectToDatabase();
      const collectionName = type === 'devis' ? 'devis_requests'
        : type === 'chatbot' || type === 'chatbot_lead' ? 'appointments'
        : type === 'newsletter' ? 'newsletter_subscribers'
        : 'contact_messages';

      await db.collection(collectionName).insertOne({
        type,
        originalData: data,
        sanitizedData,
        created_at: new Date(),
      });
    } catch (error) {
      console.error('Erreur DB:', error);
    }

    const hasSuccess = results.some(r => r.success);

    return res.status(hasSuccess ? 200 : 500).json({
      success: hasSuccess,
      results,
      message: hasSuccess ? 'Au moins un email envoyé' : 'Échec de tous les envois'
    });
  } catch (error: any) {
    console.error('Erreur globale:', error);
    return res.status(500).json({ error: error.message });
  }
}
