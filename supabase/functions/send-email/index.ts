import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@3.2.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RECAPTCHA_SECRET_KEY = Deno.env.get("RECAPTCHA_SECRET_KEY");

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "juniorentreprise@bem.sn";

// Fonction de validation reCAPTCHA avec seuil adaptatif
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  try {
    if (!RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY non configurée');
      return { success: false, error: 'Configuration reCAPTCHA manquante' };
    }

    if (!token) {
      return { success: false, error: 'Token reCAPTCHA manquant' };
    }

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${encodeURIComponent(token)}`
      }
    );

    const recaptchaResult = await recaptchaResponse.json();

    // LOG DÉTAILLÉ pour debug
    console.log('🔐 reCAPTCHA result:', JSON.stringify(recaptchaResult));
    console.log('📊 Score:', recaptchaResult.score);
    console.log('✅ Success:', recaptchaResult.success);

    // Seuil adaptatif selon l'environnement
    const isDev = Deno.env.get('ENVIRONMENT') !== 'production';
    const SCORE_THRESHOLD = isDev ? 0.3 : 0.5;
    
    console.log('🎯 Seuil reCAPTCHA:', SCORE_THRESHOLD, '(env:', isDev ? 'dev' : 'production', ')');

    if (!recaptchaResult.success) {
      console.error('❌ reCAPTCHA validation failed:', recaptchaResult['error-codes']);
      return { 
        success: false, 
        error: `Validation reCAPTCHA échouée: ${recaptchaResult['error-codes']?.join(', ') || 'Erreur inconnue'}`,
        score: recaptchaResult.score
      };
    }

    // Vérifier le score seulement s'il existe
    if (typeof recaptchaResult.score === 'number' && recaptchaResult.score < SCORE_THRESHOLD) {
      console.warn('⚠️ reCAPTCHA score trop bas:', recaptchaResult.score, '< seuil:', SCORE_THRESHOLD);
      return { 
        success: false, 
        score: recaptchaResult.score,
        error: `Score de sécurité insuffisant (${recaptchaResult.score}). Seuil requis: ${SCORE_THRESHOLD}` 
      };
    }

    console.log('✅ reCAPTCHA passed - Score:', recaptchaResult.score);
    return { success: true, score: recaptchaResult.score };
  } catch (error) {
    console.error('Erreur lors de la vérification reCAPTCHA:', error);
    return { success: false, error: 'Erreur de validation reCAPTCHA' };
  }
}

function getEmailHeader(title: string, subtitle?: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @media only screen and (max-width: 600px) {
          .email-container { width: 100% !important; }
          .email-content { padding: 24px 16px !important; }
          .header-content { padding: 28px 16px 24px !important; }
          .title-banner { padding: 16px !important; }
          .title-banner h2 { font-size: 16px !important; }
          .footer-content { padding: 24px 16px !important; }
          .footer-table td { display: block !important; text-align: center !important; padding: 8px 0 !important; }
          .social-icons { margin-top: 16px !important; }
          .social-icons td { display: inline-block !important; padding: 0 4px !important; }
          .copyright-section { padding: 16px !important; }
          .info-table td { display: block !important; width: 100% !important; padding: 10px 16px !important; }
          .info-table tr { display: block !important; border-bottom: 1px solid #e5e5e5 !important; }
          .cta-buttons td { display: block !important; padding: 8px 0 !important; text-align: center !important; }
          .cta-buttons a { display: block !important; width: 100% !important; box-sizing: border-box !important; }
          .dark-box { padding: 20px !important; }
          .dark-box td { padding: 8px 0 !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); max-width: 600px;">
              <!-- Header avec logo -->
              <tr>
                <td class="header-content" style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 40px 32px; text-align: center;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center">
                        <img src="https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/0e789853a84899bd777f9f2b0f6da08d.png" alt="Dakar Marketing" style="height: 50px; max-width: 200px; margin-bottom: 12px;" />
                        <p style="color: #dc2626; font-size: 10px; margin: 0; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;">Junior Entreprise de Consultance Marketing</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- Bandeau titre -->
              <tr>
                <td class="title-banner" style="background-color: #dc2626; padding: 20px 40px; text-align: center;">
                  <h2 style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 600; letter-spacing: 0.5px;">${title}</h2>
                  ${subtitle ? `<p style="color: rgba(255,255,255,0.9); font-size: 12px; margin: 8px 0 0; font-weight: 400;">${subtitle}</p>` : ''}
                </td>
              </tr>
              <!-- Contenu -->
              <tr>
                <td class="email-content" style="padding: 40px;">
  `;
}

function getEmailFooter() {
  return `
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td class="footer-content" style="background-color: #fafafa; padding: 32px 40px; border-top: 1px solid #eee;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="footer-table">
                    <tr>
                      <td style="vertical-align: top;">
                        <p style="color: #1a1a1a; font-size: 14px; margin: 0 0 4px; font-weight: 700;">Dakar Marketing</p>
                        <p style="color: #666; font-size: 11px; margin: 0 0 2px;">Junior Entreprise de Consultance Marketing</p>
                        <p style="color: #888; font-size: 11px; margin: 0;">BEM Dakar - Sacré Cœur 2, Pyrotechnie, Fann</p>
                      </td>
                      <td align="right" style="vertical-align: top;" class="social-icons">
                        <table role="presentation" cellspacing="0" cellpadding="0" class="social-icons">
                          <tr>
                            <td style="padding: 0 4px;">
                              <a href="https://www.linkedin.com/company/dakar-marketing/" target="_blank" rel="noopener noreferrer" style="display: inline-block; width: 32px; height: 32px; background-color: #1a1a1a; border-radius: 8px; text-align: center; line-height: 32px; text-decoration: none;">
                                <span style="color: #ffffff; font-size: 14px; font-weight: bold;">in</span>
                              </a>
                            </td>
                            <td style="padding: 0 4px;">
                              <a href="https://www.instagram.com/dakar_marketing?igsh=b3RmZG5yb2I0aW83" target="_blank" rel="noopener noreferrer" style="display: inline-block; width: 32px; height: 32px; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); border-radius: 8px; text-align: center; line-height: 32px; text-decoration: none;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-top: 8px;">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
                                </svg>
                              </a>
                            </td>
                            <td style="padding: 0 4px;">
                              <a href="mailto:juniorentreprise@bem.sn" style="display: inline-block; width: 32px; height: 32px; background-color: #1a1a1a; border-radius: 8px; text-align: center; line-height: 32px; text-decoration: none;">
                                <span style="color: #ffffff; font-size: 14px; font-weight: bold;">@</span>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- Copyright -->
              <tr>
                <td class="copyright-section" style="background-color: #1a1a1a; padding: 16px 40px; text-align: center;">
                  <p style="color: #888; font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Dakar Marketing. Tous droits réservés.</p>
                  <p style="color: #666; font-size: 10px; margin: 8px 0 0;">Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function contactConfirmationEmail(data: any) {
  return `
    ${getEmailHeader('Message bien reçu !', 'Nous vous répondrons dans les plus brefs délais')}
    
    <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Bonjour <strong>${data.nom || 'cher client'}</strong>,
    </p>
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Nous vous remercions d'avoir contacté <strong style="color: #1a1a1a;">Dakar Marketing</strong>. Votre message a bien été transmis à notre équipe.
    </p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8; border-radius: 12px; margin: 28px 0;">
      <tr>
        <td style="padding: 24px;">
          <p style="color: #1a1a1a; font-size: 13px; font-weight: 600; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px;">Votre message</p>
          <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0; font-style: italic; border-left: 3px solid #dc2626; padding-left: 16px;">
            "${data.message || 'Non renseigné'}"
          </p>
        </td>
      </tr>
    </table>
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 28px;">
      Un membre de notre équipe vous répondra sous <strong style="color: #dc2626;">24 heures ouvrées</strong>. En attendant, n'hésitez pas à découvrir nos services ou à demander un devis personnalisé.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto; width: 100%;">
      <tr>
        <td align="center" style="border-radius: 8px; background-color: #dc2626;">
          <a href="https://dakarmarketing.sn/demande-devis" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
            Demander un devis gratuit →
          </a>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 36px; border-top: 1px solid #eee; padding-top: 24px;">
      <tr>
        <td>
          <p style="color: #333; font-size: 15px; margin: 0;">Cordialement,</p>
          <p style="color: #dc2626; font-size: 15px; font-weight: 600; margin: 8px 0 0;">L'équipe Dakar Marketing</p>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function contactInternalEmail(data: any) {
  return `
    ${getEmailHeader('Nouveau message de contact', 'Action requise')}
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border-radius: 12px; border-left: 4px solid #dc2626; margin-bottom: 28px;">
      <tr>
        <td style="padding: 16px 20px;">
          <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 0;">⚡ Nouveau contact à traiter</p>
          <p style="color: #991b1b; font-size: 12px; margin: 6px 0 0;">Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="info-table" style="border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
      <tr style="background-color: #fafafa;">
        <td style="padding: 14px 20px; font-weight: 600; color: #333; width: 140px; font-size: 13px; border-bottom: 1px solid #e5e5e5;">Nom complet</td>
        <td style="padding: 14px 20px; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #e5e5e5; font-weight: 500;">${data.nom || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; font-weight: 600; color: #333; font-size: 13px; border-bottom: 1px solid #e5e5e5;">Email</td>
        <td style="padding: 14px 20px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.email}</a>
        </td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 14px 20px; font-weight: 600; color: #333; font-size: 13px; border-bottom: 1px solid #e5e5e5;">Entreprise</td>
        <td style="padding: 14px 20px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.entreprise || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 14px 20px; font-weight: 600; color: #333; font-size: 13px; vertical-align: top;">Message</td>
        <td style="padding: 14px 20px; color: #333; font-size: 14px; line-height: 1.7;">${data.message || 'Non renseigné'}</td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px auto 0; width: 100%;">
      <tr>
        <td align="center" style="border-radius: 8px; background-color: #1a1a1a;">
          <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px;">
            Répondre au client →
          </a>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function devisConfirmationEmail(data: any) {
  const prenom = data.prenom || '';
  return `
    ${getEmailHeader('Demande de devis enregistrée', 'Nous analysons votre projet')}
    
    <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Bonjour <strong>${prenom}</strong>,
    </p>
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Nous vous remercions pour l'intérêt que vous portez à <strong style="color: #1a1a1a;">Dakar Marketing</strong>. Votre demande de devis a bien été enregistrée et est actuellement en cours d'analyse par notre équipe d'experts.
    </p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="dark-box" style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 12px; margin: 28px 0;">
      <tr>
        <td style="padding: 28px;">
          <p style="color: #dc2626; font-size: 12px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 2px;">Récapitulatif de votre demande</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: #888; font-size: 13px;">Service demandé</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">
                <span style="color: #fff; font-size: 14px; font-weight: 500;">${data.typeService || '-'}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: #888; font-size: 13px;">Budget estimé</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">
                <span style="color: #fff; font-size: 14px; font-weight: 500;">${data.budget || '-'}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <span style="color: #888; font-size: 13px;">Délai souhaité</span>
              </td>
              <td style="padding: 10px 0; text-align: right;">
                <span style="color: #fff; font-size: 14px; font-weight: 500;">${data.delai || '-'}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0fdf4; border-radius: 12px; border-left: 4px solid #22c55e; margin: 28px 0;">
      <tr>
        <td style="padding: 20px 24px;">
          <p style="color: #166534; font-size: 14px; font-weight: 600; margin: 0 0 8px;">✓ Prochaines étapes</p>
          <p style="color: #15803d; font-size: 13px; line-height: 1.7; margin: 0;">
            Un consultant dédié analysera votre demande et vous contactera sous <strong>24 à 48 heures</strong> pour un premier échange gratuit et sans engagement.
          </p>
        </td>
      </tr>
    </table>
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 28px;">
      En attendant, nous restons disponibles pour toute information complémentaire.
    </p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 36px; border-top: 1px solid #eee; padding-top: 24px;">
      <tr>
        <td>
          <p style="color: #333; font-size: 15px; margin: 0;">Cordialement,</p>
          <p style="color: #dc2626; font-size: 15px; font-weight: 600; margin: 8px 0 0;">L'équipe Dakar Marketing</p>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function devisInternalEmail(data: any) {
  return `
    ${getEmailHeader('Nouvelle demande de devis', 'Prospect qualifié - Action requise')}
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border-radius: 12px; border-left: 4px solid #dc2626; margin-bottom: 28px;">
      <tr>
        <td style="padding: 16px 20px;">
          <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 0;">🎯 Nouvelle opportunité commerciale</p>
          <p style="color: #991b1b; font-size: 12px; margin: 6px 0 0;">Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </td>
      </tr>
    </table>
    
    <!-- Informations client -->
    <p style="color: #1a1a1a; font-size: 13px; font-weight: 600; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px;">👤 Informations client</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="info-table" style="border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; width: 160px; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Nom complet</td>
        <td style="padding: 12px 16px; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #e5e5e5; font-weight: 500;">${data.prenom || ''} ${data.nom || ''}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Entreprise</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.entreprise || 'Non renseigné'}</td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Poste</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.poste || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Secteur</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.secteur || 'Non renseigné'}</td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Email</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px;">Téléphone</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px;">
          <a href="tel:${data.telephone}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.telephone || 'Non renseigné'}</a>
        </td>
      </tr>
    </table>
    
    <!-- Détails du projet -->
    <p style="color: #1a1a1a; font-size: 13px; font-weight: 600; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px;">📋 Détails du projet</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="info-table" style="border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; width: 160px; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Service demandé</td>
        <td style="padding: 12px 16px; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #e5e5e5; font-weight: 600;">${data.typeService || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Budget</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <span style="background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${data.budget || 'Non renseigné'}</span>
        </td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Délai</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${data.delai || 'Non renseigné'}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; vertical-align: top;">Description</td>
        <td style="padding: 12px 16px; color: #333; font-size: 14px; line-height: 1.7;">${data.description || 'Non renseigné'}</td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff7ed; border-radius: 12px; border-left: 4px solid #f97316; margin: 24px 0;">
      <tr>
        <td style="padding: 16px 20px;">
          <p style="color: #c2410c; font-size: 13px; margin: 0;"><strong>⏰ Action requise :</strong> Contacter ce prospect dans les 24h pour maximiser les chances de conversion.</p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" class="cta-buttons" style="margin: 24px auto 0; width: 100%;">
      <tr>
        <td style="padding-right: 12px; text-align: center;">
          <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 28px; background-color: #dc2626; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
            Envoyer un email
          </a>
        </td>
        <td style="text-align: center;">
          <a href="tel:${data.telephone}" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
            Appeler le client
          </a>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function appointmentConfirmationEmail(data: any) {
  return `
    ${getEmailHeader('Rendez-vous confirmé', 'Nous avons hâte de vous rencontrer')}
    
    <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Bonjour <strong>${data.name || 'cher client'}</strong>,
    </p>
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Nous confirmons la bonne réception de votre demande de rendez-vous auprès de <strong style="color: #1a1a1a;">Dakar Marketing</strong>.
    </p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="dark-box" style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 12px; margin: 28px 0;">
      <tr>
        <td style="padding: 28px;">
          <p style="color: #dc2626; font-size: 12px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 2px;">📅 Détails du rendez-vous</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${data.preferred_date || data.date ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: #888; font-size: 13px;">Date souhaitée</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">
                <span style="color: #fff; font-size: 14px; font-weight: 500;">${data.preferred_date || data.date}</span>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0;">
                <span style="color: #888; font-size: 13px;">Service</span>
              </td>
              <td style="padding: 10px 0; text-align: right;">
                <span style="color: #fff; font-size: 14px; font-weight: 500;">${data.service || 'Consultation générale'}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #eff6ff; border-radius: 12px; border-left: 4px solid #3b82f6; margin: 28px 0;">
      <tr>
        <td style="padding: 20px 24px;">
          <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 8px;">ℹ️ Information</p>
          <p style="color: #1e3a8a; font-size: 13px; line-height: 1.7; margin: 0;">
            Notre équipe prendra contact avec vous sous <strong>24 heures</strong> pour confirmer le créneau et les modalités de la rencontre.
          </p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 36px; border-top: 1px solid #eee; padding-top: 24px;">
      <tr>
        <td>
          <p style="color: #333; font-size: 15px; margin: 0;">Cordialement,</p>
          <p style="color: #dc2626; font-size: 15px; font-weight: 600; margin: 8px 0 0;">L'équipe Dakar Marketing</p>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function appointmentInternalEmail(data: any) {
  return `
    ${getEmailHeader('Nouveau rendez-vous', 'À confirmer rapidement')}
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border-radius: 12px; border-left: 4px solid #dc2626; margin-bottom: 28px;">
      <tr>
        <td style="padding: 16px 20px;">
          <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 0;">📅 Nouvelle demande de rendez-vous</p>
          <p style="color: #991b1b; font-size: 12px; margin: 6px 0 0;">Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="info-table" style="border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; width: 160px; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Nom</td>
        <td style="padding: 12px 16px; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #e5e5e5; font-weight: 500;">${data.name || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Email</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.email}</a>
        </td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Téléphone</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <a href="tel:${data.phone}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.phone || 'Non renseigné'}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Entreprise</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.company || 'Non renseigné'}</td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Service</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.service || 'Non renseigné'}</td>
      </tr>
      ${data.preferred_date || data.date ? `
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Date souhaitée</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${data.preferred_date || data.date}</span>
        </td>
      </tr>
      ` : ''}
      <tr ${data.preferred_date || data.date ? 'style="background-color: #fafafa;"' : ''}>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; vertical-align: top;">Message</td>
        <td style="padding: 12px 16px; color: #333; font-size: 14px; line-height: 1.7;">${data.message || 'Non renseigné'}</td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" class="cta-buttons" style="margin: 24px auto 0; width: 100%;">
      <tr>
        <td style="padding-right: 12px; text-align: center;">
          <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 28px; background-color: #dc2626; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
            Confirmer par email
          </a>
        </td>
        <td style="text-align: center;">
          <a href="tel:${data.phone}" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
            Appeler
          </a>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function chatbotLeadConfirmationEmail(data: any) {
  return `
    ${getEmailHeader('Merci pour votre intérêt !', 'Nous vous recontactons très vite')}
    
    <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Bonjour <strong>${data.name || 'cher client'}</strong>,
    </p>
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Merci d'avoir échangé avec notre assistant virtuel sur <strong style="color: #1a1a1a;">Dakar Marketing</strong>. Nous avons bien enregistré vos coordonnées et votre demande.
    </p>
    
    ${data.service ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8; border-radius: 12px; margin: 28px 0;">
      <tr>
        <td style="padding: 24px;">
          <p style="color: #1a1a1a; font-size: 13px; font-weight: 600; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px;">Votre demande</p>
          <p style="color: #555; font-size: 14px; margin: 0;">Service intéressé : <strong style="color: #1a1a1a;">${data.service}</strong></p>
          ${data.preferred_date ? `<p style="color: #555; font-size: 14px; margin: 8px 0 0;">Date souhaitée : <strong style="color: #1a1a1a;">${data.preferred_date}</strong></p>` : ''}
        </td>
      </tr>
    </table>
    ` : ''}
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 28px;">
      Un membre de notre équipe vous contactera très prochainement pour discuter de votre projet.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto; width: 100%;">
      <tr>
        <td align="center" style="border-radius: 8px; background-color: #dc2626;">
          <a href="https://dakarmarketing.sn/demande-devis" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
            Compléter ma demande de devis →
          </a>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 36px; border-top: 1px solid #eee; padding-top: 24px;">
      <tr>
        <td>
          <p style="color: #333; font-size: 15px; margin: 0;">Cordialement,</p>
          <p style="color: #dc2626; font-size: 15px; font-weight: 600; margin: 8px 0 0;">L'équipe Dakar Marketing</p>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function chatbotLeadInternalEmail(data: any) {
  return `
    ${getEmailHeader('Nouveau lead via Chatbot', 'Prospect chaud - Action immédiate')}
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border-radius: 12px; border-left: 4px solid #dc2626; margin-bottom: 28px;">
      <tr>
        <td style="padding: 16px 20px;">
          <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 0;">🤖 Lead capturé via Chatbot</p>
          <p style="color: #991b1b; font-size: 12px; margin: 6px 0 0;">Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="info-table" style="border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; width: 160px; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Nom</td>
        <td style="padding: 12px 16px; color: #1a1a1a; font-size: 14px; border-bottom: 1px solid #e5e5e5; font-weight: 500;">${data.name || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Email</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.email}</a>
        </td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Téléphone</td>
        <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e5e5e5;">
          <a href="tel:${data.phone}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${data.phone || 'Non renseigné'}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Service intéressé</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.service || 'Non renseigné'}</td>
      </tr>
      <tr style="background-color: #fafafa;">
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; border-bottom: 1px solid #e5e5e5;">Date souhaitée</td>
        <td style="padding: 12px 16px; color: #555; font-size: 14px; border-bottom: 1px solid #e5e5e5;">${data.preferred_date || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #333; font-size: 12px; vertical-align: top;">Notes</td>
        <td style="padding: 12px 16px; color: #333; font-size: 14px; line-height: 1.7;">${data.notes || 'Aucune note'}</td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff7ed; border-radius: 12px; border-left: 4px solid #f97316; margin: 24px 0;">
      <tr>
        <td style="padding: 16px 20px;">
          <p style="color: #c2410c; font-size: 13px; margin: 0;"><strong>⏰ Action requise :</strong> Contacter ce prospect dans les 24h - Les leads chatbot ont un taux de conversion élevé !</p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" class="cta-buttons" style="margin: 24px auto 0; width: 100%;">
      <tr>
        <td style="padding-right: 12px; text-align: center;">
          <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 28px; background-color: #dc2626; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
            Envoyer un email
          </a>
        </td>
        <td style="text-align: center;">
          <a href="tel:${data.phone}" style="display: inline-block; padding: 14px 28px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
            Appeler
          </a>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

function newsletterConfirmationEmail(data: any) {
  return `
    ${getEmailHeader('Bienvenue dans la communauté !', 'Vous êtes maintenant inscrit à notre newsletter')}
    
    <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Bonjour,
    </p>
    
    <p style="color: #555; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
      Merci d'avoir rejoint la communauté <strong style="color: #1a1a1a;">Dakar Marketing</strong> ! Vous recevrez désormais nos actualités, conseils marketing et offres exclusives directement dans votre boîte mail.
    </p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8; border-radius: 12px; margin: 28px 0;">
      <tr>
        <td style="padding: 24px;">
          <p style="color: #1a1a1a; font-size: 13px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Ce que vous recevrez</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: #dc2626; margin-right: 12px;">✓</span>
                <span style="color: #555; font-size: 14px;">Conseils marketing exclusifs</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: #dc2626; margin-right: 12px;">✓</span>
                <span style="color: #555; font-size: 14px;">Études de cas et success stories</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0;">
                <span style="color: #dc2626; margin-right: 12px;">✓</span>
                <span style="color: #555; font-size: 14px;">Offres et promotions en avant-première</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto; width: 100%;">
      <tr>
        <td align="center" style="border-radius: 8px; background-color: #dc2626;">
          <a href="https://dakarmarketing.sn/blog" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
            Découvrir nos articles →
          </a>
        </td>
      </tr>
    </table>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 36px; border-top: 1px solid #eee; padding-top: 24px;">
      <tr>
        <td>
          <p style="color: #333; font-size: 15px; margin: 0;">Cordialement,</p>
          <p style="color: #dc2626; font-size: 15px; font-weight: 600; margin: 8px 0 0;">L'équipe Dakar Marketing</p>
        </td>
      </tr>
    </table>
    
    ${getEmailFooter()}
  `;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, data, recaptchaToken } = await req.json();

    // Validation reCAPTCHA pour toutes les soumissions
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      if (!recaptchaResult.success) {
        console.error('Échec validation reCAPTCHA:', recaptchaResult.error);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: recaptchaResult.error || 'Validation de sécurité échouée. Veuillez réessayer.',
            score: recaptchaResult.score 
          }), 
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }

      console.log('✅ reCAPTCHA validé avec succès. Score:', recaptchaResult.score);
    } else {
      console.warn('⚠️ Aucun token reCAPTCHA fourni');
    }

    const emails: any[] = [];

    if (type === "contact") {
      await supabase.from("contact_messages").insert({
        full_name: data.nom,
        email: data.email,
        company: data.entreprise || null,
        message: data.message,
        status: "new",
      });

      await supabase.from("leads").insert({
        full_name: data.nom,
        email: data.email,
        company: data.entreprise || null,
        message: data.message,
        source: "contact_form",
        status: "nouveau",
      });

      emails.push({
        from: "Dakar Marketing <contact@dakarmarketing.sn>",
        to: [data.email],
        subject: "✓ Votre message a bien été reçu - Dakar Marketing",
        html: contactConfirmationEmail(data),
      });

      emails.push({
        from: "Dakar Marketing <notifications@dakarmarketing.sn>",
        to: [ADMIN_EMAIL],
        subject: "📩 Nouveau message de contact - Site Dakar Marketing",
        html: contactInternalEmail(data),
      });

    } else if (type === "devis") {
      await supabase.from("leads").insert({
        full_name: `${data.prenom || ""} ${data.nom || ""}`.trim(),
        email: data.email,
        phone: data.telephone || null,
        company: data.entreprise || null,
        message: data.description || null,
        service_interest: data.typeService || null,
        budget: data.budget || null,
        timeline: data.delai || null,
        sector: data.secteur || null,
        source: "demande_devis",
        status: "nouveau",
      });

      emails.push({
        from: "Dakar Marketing <devis@dakarmarketing.sn>",
        to: [data.email],
        subject: "✓ Votre demande de devis a bien été enregistrée - Dakar Marketing",
        html: devisConfirmationEmail(data),
      });

      emails.push({
        from: "Dakar Marketing <notifications@dakarmarketing.sn>",
        to: [ADMIN_EMAIL],
        subject: "🎯 Nouvelle demande de devis - Site Dakar Marketing",
        html: devisInternalEmail(data),
      });

    } else if (type === "chatbot") {
      const appointmentData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: null,
        service: "Rendez-vous via Chatbot",
        preferred_date: data.date || null,
        message: `Rendez-vous pris via le chatbot. Date: ${data.date || "Non précisée"}`,
      };

      await supabase.from("appointments").insert({
        name: appointmentData.name,
        email: appointmentData.email,
        phone: appointmentData.phone,
        company: appointmentData.company,
        service: appointmentData.service,
        preferred_date: appointmentData.preferred_date,
        message: appointmentData.message,
        status: "pending",
      });

      await supabase.from("leads").insert({
        full_name: appointmentData.name,
        email: appointmentData.email,
        phone: appointmentData.phone,
        service_interest: appointmentData.service,
        preferred_date: appointmentData.preferred_date,
        message: appointmentData.message,
        source: "chatbot",
        status: "nouveau",
      });

      emails.push({
        from: "Dakar Marketing <contact@dakarmarketing.sn>",
        to: [appointmentData.email],
        subject: "✓ Votre rendez-vous a bien été enregistré - Dakar Marketing",
        html: appointmentConfirmationEmail(appointmentData),
      });

      emails.push({
        from: "Dakar Marketing <notifications@dakarmarketing.sn>",
        to: [ADMIN_EMAIL],
        subject: "📅 Nouveau rendez-vous via Chatbot - Site Dakar Marketing",
        html: appointmentInternalEmail(appointmentData),
      });

    } else if (type === "chatbot_lead") {
      await supabase.from("leads").insert({
        full_name: data.name || null,
        email: data.email,
        phone: data.phone || null,
        service_interest: data.service || null,
        preferred_date: data.preferred_date || null,
        message: data.notes || null,
        source: "chatbot",
        status: "nouveau",
      });

      emails.push({
        from: "Dakar Marketing <contact@dakarmarketing.sn>",
        to: [data.email],
        subject: "✓ Merci pour votre intérêt - Dakar Marketing",
        html: chatbotLeadConfirmationEmail(data),
      });

      emails.push({
        from: "Dakar Marketing <notifications@dakarmarketing.sn>",
        to: [ADMIN_EMAIL],
        subject: "🤖 Nouveau lead via Chatbot - Action requise",
        html: chatbotLeadInternalEmail(data),
      });

    } else if (type === "appointment") {
      await supabase.from("appointments").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service || null,
        preferred_date: data.preferred_date || null,
        message: data.message || null,
        status: "pending",
      });

      emails.push({
        from: "Dakar Marketing <contact@dakarmarketing.sn>",
        to: [data.email],
        subject: "✓ Votre demande de rendez-vous a bien été reçue - Dakar Marketing",
        html: appointmentConfirmationEmail(data),
      });

      emails.push({
        from: "Dakar Marketing <notifications@dakarmarketing.sn>",
        to: [ADMIN_EMAIL],
        subject: "📅 Nouvelle demande de rendez-vous - Site Dakar Marketing",
        html: appointmentInternalEmail(data),
      });

    } else if (type === "newsletter") {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: data.email,
        is_active: true,
        source: data.source || "website",
      });

      if (!error) {
        emails.push({
          from: "Dakar Marketing <contact@dakarmarketing.sn>",
          to: [data.email],
          subject: "🎉 Bienvenue dans la communauté Dakar Marketing !",
          html: newsletterConfirmationEmail(data),
        });
      }
    }

    const results = [];
    for (const emailData of emails) {
      try {
        const result = await resend.emails.send(emailData);
        console.log("Email sent successfully:", result);
        results.push({ success: true, data: result });
      } catch (err) {
        console.error("Resend error:", err);
        results.push({ success: false, error: err.message });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});