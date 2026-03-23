# Politique de sécurité - Dakar Marketing

## 🚨 Signalement de vulnérabilités

Si vous découvrez une faille de sécurité dans ce projet, **NE LA PUBLIEZ PAS** publiquement.

**Contactez-nous de manière responsable :**
- Email : contact@dakarmarketing.sn
- Sujet : `[SECURITY] Vulnérabilité découverte`

Nous nous engageons à :
- Répondre dans les 48 heures
- Corriger la vulnérabilité rapidement
- Créditer le rapporteur (si souhaité)

## 🔒 Mesures de sécurité implémentées

### Frontend
- **reCAPTCHA v3** : Protection anti-spam et anti-bot
- **Sanitization XSS** : Échappement de tous les caractères HTML
- **Validation stricte** : Emails, formats de données
- **Rate limiting** : 3 soumissions maximum par 10 minutes par IP

### Backend (Vercel Functions)
- **Validation d'origine** : Whitelist des domaines autorisés
- **Headers de sécurité** : X-Frame-Options, CSP, etc.
- **Connexion sécurisée** : MongoDB avec authentification
- **Logs sécurisés** : Aucun secret exposé dans les logs

### Base de données
- **Accès restreint** : IP whitelist (Vercel uniquement)
- **Authentification forte** : Utilisateur dédié avec permissions limitées
- **Chiffrement** : Connexion TLS obligatoire

## 🛡️ Bonnes pratiques

### Pour les développeurs
- **Jamais de secrets dans le code** : Tout dans les variables d'environnement
- **Validation côté serveur** : Ne jamais faire confiance au frontend
- **Logs sécurisés** : Pas de données sensibles dans les logs
- **Mises à jour régulières** : Dépendances et sécurité

### Pour les utilisateurs
- **HTTPS obligatoire** : Toutes les communications chiffrées
- **Cookies sécurisés** : HttpOnly, Secure, SameSite
- **Protection CSRF** : Tokens anti-contrefaçon

## 📋 Checklist sécurité

- [x] Secrets dans variables d'environnement Vercel
- [x] .env exclu du versioning Git
- [x] Accès réseau MongoDB restreint
- [x] Headers de sécurité activés
- [x] Validation d'origine activée
- [x] Rate limiting implémenté
- [x] Sanitization XSS active
- [x] reCAPTCHA v3 configuré

## 🔄 Mises à jour de sécurité

Ce document est mis à jour régulièrement. Dernière révision : Mars 2026.

## 📞 Contact

Pour toute question de sécurité :
- Email : contact@dakarmarketing.sn
- Junior Entreprise BEM Dakar