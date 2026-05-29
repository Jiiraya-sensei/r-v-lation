
# Plan d'implémentation — RÉVÉLATION

## Décisions appliquées
- **Compte obligatoire uniquement pour auditionner** ; billets en mode invité (courriel suffit)
- **Livraison billets** : courriel + PDF avec QR code unique scannable
- **Connexion** : courriel + mot de passe (Google plus tard si besoin)
- **Expéditeur** : `noreply@notify.revelationspectacle.ca` (domaine à configurer) — **reply-to** : `revelationofficielle@gmail.com`

---

## 1. Authentification (compte étudiant pour auditions)

**Base de données**
- Table `profiles` (FK → `auth.users`) : `first_name`, `last_name`, `age`, `phone`, `account_type` ('spectator' | 'participant')
- Trigger `handle_new_user` qui crée le profil automatiquement à l'inscription
- RLS : l'utilisateur lit/modifie son propre profil
- Désactiver l'auto-confirm email (les étudiants doivent vérifier leur courriel)

**Frontend**
- `src/hooks/useAuth.tsx` — contexte global avec `user`, `session`, `signIn`, `signUp`, `signOut` ; écoute `onAuthStateChange`
- `LoginPage` : branchement réel sur `supabase.auth.signInWithPassword`
- `RegisterPage` : branchement réel sur `supabase.auth.signUp` avec metadata (first_name, last_name, age, phone, account_type)
- Nouvelle page `/mot-de-passe-oublie` (envoi du lien)
- Nouvelle page `/reset-password` (saisie du nouveau mot de passe)
- `Navbar` : afficher « Mon compte » + « Déconnexion » quand connecté ; lien « Inscription » sur mobile
- `AuditionPage` : exiger une connexion ; rattacher `user_id` à la soumission ; pré-remplir prénom/nom/âge/courriel/téléphone depuis le profil

---

## 2. Page « Mon compte »

Route `/mon-compte` (protégée) :
- Onglet **Profil** : voir/modifier ses informations
- Onglet **Mes auditions** (participants) : statut de la candidature (Soumise / En évaluation / Retenue / Non retenue)
- Onglet **Mes billets** (si courriel correspond à un achat) : liste des billets achetés + lien de re-téléchargement du PDF

---

## 3. Livraison des billets (la grosse faille)

**Base de données**
- Table `orders` : `id`, `stripe_session_id`, `stripe_payment_intent_id`, `customer_email`, `customer_name`, `total_amount`, `currency`, `status`, `environment`
- Table `tickets` : `id`, `order_id`, `ticket_type` ('semifinal' | 'finale' | 'bundle_semifinal' | 'bundle_finale'), `token` (UUID unique scannable), `holder_email`, `qr_url`, `pdf_url`, `used_at`
- Bucket Storage `tickets-pdf` (privé, accès via URL signée)

**Edge Function `payments-webhook`**
- Vérifie la signature Stripe (HMAC SHA-256 via `_shared/stripe.ts`)
- Sur `checkout.session.completed` :
  1. Crée l'enregistrement `orders`
  2. Récupère les `line_items` Stripe → crée N tickets selon les quantités
  3. Génère un QR code par billet (lib `qrcode` côté edge)
  4. Génère un PDF par billet (lib `pdf-lib` : logo RÉVÉLATION, date, lieu, QR, numéro)
  5. Upload chaque PDF dans le bucket
  6. Envoie un seul courriel récapitulatif avec tous les PDF en pièces jointes
- Mettre `verify_jwt = false` dans `supabase/config.toml`

**Création du checkout (modification)**
- `create-checkout` : capter le `customer_email` côté frontend (champ requis avant ouverture) et le passer dans la session Stripe
- Inclure les `metadata` order/contenu pour que le webhook puisse reconstruire l'achat
- Activer Stripe Tax (option 2 « calcul automatique » à +0.5 % — recommandée vu que c'est du QC)

**TicketsPage**
- Avant d'ouvrir le checkout : formulaire `Prénom / Nom / Courriel` (validation)
- Bandeau test mode déjà en place

**CheckoutReturn**
- Vérifier la session Stripe côté serveur via nouvelle edge function `verify-checkout-session`
- Afficher : « Merci ! Tes billets ont été envoyés à {email}. Vérifie ton dossier promotions/spam. »

---

## 4. Courriels transactionnels

Configurer le domaine `revelationspectacle.ca` (Lovable délègue `notify.revelationspectacle.ca` automatiquement — tu ajoutes 2 records NS chez ton registraire).

Templates à scaffolder :
- **Auth** : confirmation d'inscription, mot de passe oublié
- **Transactionnels** : 
  - Confirmation de soumission d'audition
  - Confirmation d'achat de billets (PDF en pièces jointes)
  
Reply-to systématique : `revelationofficielle@gmail.com`.

---

## 5. Corrections diverses
- Lien « Inscription » manquant dans le menu mobile
- Route `/mot-de-passe-oublie` cassée (404)
- Ajouter le `user_id` (nullable) à `audition_submissions` + politique SELECT « user lit ses propres soumissions »

---

## Comment tester en preview

Une fois implémenté :

### A. Tester l'inscription / l'audition
1. `/inscription` → choisir « Je veux auditionner » → créer un compte (vérifier ton courriel pour activer)
2. Se connecter → aller sur `/auditionner` → soumettre une audition test
3. Aller sur `/mon-compte` → onglet « Mes auditions » → la voir avec statut « Soumise »

### B. Tester l'achat de billets (mode test)
1. Aller sur `/billetterie` (sans être connecté, c'est OK)
2. Sélectionner 2 billets demi-finale + 1 forfait
3. Remplir Prénom / Nom / Courriel
4. Cliquer « Passer au paiement »
5. **Carte test** :
   - Numéro : `4242 4242 4242 4242`
   - Date : n'importe quelle date future (ex `12/30`)
   - CVC : 3 chiffres au hasard (ex `123`)
   - Code postal : n'importe quoi (ex `G1K 1A1`)
6. Confirmer → tu seras redirigé sur `/billetterie/confirmation`
7. Vérifie ton courriel : tu dois recevoir un message avec **3 PDF en pièces jointes** (1 par billet) contenant chacun un QR code unique

### C. Autres cartes utiles
- **Refusée** : `4000 0000 0000 0002` (pour tester l'échec)
- **3D Secure** : `4000 0025 0000 3155` (pour tester la double authentification)

### D. Bandeau orange
En preview, tu verras toujours le bandeau « Tous les paiements sont en mode test ». Il disparaîtra automatiquement une fois passé en production.

---

## Hors de scope (à voir plus tard si tu veux)
- Système d'admin pour scanner les QR à l'entrée de la salle (app mobile ou page web)
- Connexion Google
- Connexion Apple
- Tableau de bord admin pour gérer les auditions (changer le statut, exporter la liste)

Veux-tu que je procède avec ce plan ?
