# Frais de transport

Application web pour suivre ses achats de titres de transport et préparer sa déclaration de frais.

Elle fonctionne dans le navigateur, sans compte ni serveur. Les données restent sur l'appareil, dans le stockage local du navigateur, et ne sont transmises nulle part.

## Ce qu'elle fait

- Enregistrer chaque achat de carte, avec son justificatif (photo, capture d'écran ou PDF)
- Décompter les trajets restants sur la carte en cours et prévenir avant qu'elle ne soit épuisée
- Signaler les achats sans justificatif et les pièces pas encore imprimées
- Sortir en une seule impression la déclaration du mois suivie des justificatifs numérotés
- Exporter en CSV, sauvegarder et restaurer l'ensemble des données

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application entière : structure, styles et script |
| `sw.js` | Service worker, pour l'utilisation hors ligne |
| `manifest.webmanifest` | Déclaration PWA (nom, icônes, couleurs) |
| `apple-touch-icon.png` | Icône utilisée par iOS sur l'écran d'accueil |
| `icon-192.png`, `icon-512.png` | Icônes pour Android et le manifeste |

Tous les fichiers vont à la racine du dépôt. Les chemins sont relatifs : un sous-dossier casserait la mise en cache. Les noms doivent rester identiques, la page et le service worker y renvoient.

## Mise en ligne

1. Déposer les six fichiers à la racine d'un dépôt.
2. Settings → Pages → Source : *Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Ouvrir l'adresse publiée, puis, sur mobile, l'ajouter à l'écran d'accueil.

Le hors-ligne exige HTTPS. En ouvrant le fichier en local, le service worker ne s'active pas et l'application fonctionne normalement, mais elle a besoin du réseau pour se charger.

## Après chaque modification

Incrémenter `VERSION` dans `sw.js` — `v1` devient `v2`, et ainsi de suite. Sans ça, les appareils qui ont déjà installé l'application continueront de servir l'ancienne version depuis leur cache.

## Limites connues

- Les données ne se synchronisent pas entre appareils. Pour changer de téléphone : *Sauvegarder* d'un côté, *Restaurer* de l'autre.
- Vider les données du navigateur efface tout. Les justificatifs d'origine restent dans les mails et sur les comptes des opérateurs : l'application ne doit jamais être l'unique copie.
- Les PDF ne peuvent pas être placés sur la planche imprimable et s'impriment séparément. Une capture d'écran, elle, s'intègre à la planche.

## Licence

Usage libre. Fourni tel quel, sans garantie.
