# Tickets Agentiques Chaye Web Frontend

Ce document découpe le travail frontend V3.1 en issues GitHub adaptées aux humains et aux agents IA.

Règle de granularité:

- Une issue agentique doit livrer une capacité vérifiable, pas une étape technique isolée.
- Ne pas créer une issue par fichier, composant, bouton, page ou commande.
- La taille cible est `size:M`: assez petite pour une PR lisible, assez complète pour être testée seule.
- Utiliser `agent:needs-scope`, `agent:too-small` ou `agent:too-large` quand le cadrage doit être revu avant implémentation.

Règle de langue:

- Les titres d'issues, descriptions, dépendances fonctionnelles et critères d'acceptation sont en français.
- Les identifiants techniques, commandes, endpoints, champs, labels d'automatisation et noms de fichiers restent en anglais.

Repository GitHub:

- `Chaye-parcel-traveler/chaye_web_frontend`

Script de création:

- `scripts/create-agent-issues.sh`

Statut de synchronisation GitHub:

- Créé sur GitHub: 2026-06-24.
- Issues créées: #1 à #13.
- Ne pas relancer le script sans vérifier les issues existantes, car il peut créer des doublons.

## Stratégie De Labels

Les labels restent en anglais car ils servent de métadonnées techniques pour le filtrage, l'automatisation et les agents.

| Label | Signification |
| --- | --- |
| `agent:ready` | Ticket suffisamment cadré pour un agent IA. |
| `agent:needs-review` | Ticket nécessitant une revue humaine ou senior attentive. |
| `agent:needs-scope` | Ticket à recadrer avant implémentation. |
| `agent:too-small` | Ticket trop atomique, à fusionner avec une capacité voisine. |
| `agent:too-large` | Ticket trop large, à découper par parcours ou risque. |
| `size:S` | Changement local et peu risqué. |
| `size:M` | Changement cohérent multi-fichiers avec tests; taille cible pour les agents. |
| `size:L` | Changement large à rediscuter ou découper. |
| `blocked:backend-contract` | Dépend d'un endpoint ou contrat backend. |
| `area:frontend` | Travail frontend. |
| `area:auth` | Authentification ou inscription. |
| `area:compliance` | UI de conformité juridique. |
| `area:admin` | Back-office ou UI admin. |
| `area:api-client` | Intégration API et appels Axios. |
| `sprint:legal-1` | Sprint juridique bloquant pour le lancement. |
| `sprint:ops` | Amélioration du workflow agentique/dev. |
| `type:feature` | Fonctionnalité produit. |
| `type:tech-debt` | Dette technique existante. |
| `risk:legal` | Risque juridique ou conformité. |

## Tickets Frontend

| ID | Titre | Labels | Dépend de | Critères d'acceptation |
| --- | --- | --- | --- | --- |
| FE-OPS-001 | Ajouter une CI frontend pour les tests et le build | `agent:ready`, `size:S`, `area:frontend`, `sprint:ops`, `type:tech-debt` | Aucune dépendance | GitHub Actions exécute `npm test -- --watchAll=false` et `npm run build`. |
| FE-OPS-002 | Ajouter un service Docker Compose de développement frontend | `agent:ready`, `size:M`, `area:frontend`, `sprint:ops`, `type:tech-debt` | Aucune dépendance | Le serveur Vite démarre dans Docker sur le port 3000 avec `VITE_API_URL=http://localhost:3333`; le hot reload fonctionne. |
| FE-API-001 | Remplacer les appels API hardcodés vers localhost | `agent:ready`, `size:M`, `area:frontend`, `area:api-client`, `type:tech-debt` | Aucune dépendance | Les écrans touchés utilisent la base URL Axios; aucun nouvel appel `http://localhost:5000` n'est ajouté; les erreurs API restent affichables. |
| FE-ANN-001 | Corriger le contrat du formulaire de création d'annonce | `agent:ready`, `size:M`, `area:frontend`, `area:api-client`, `type:tech-debt` | Aucune dépendance | Le formulaire envoie `departingFrom`, `arrivingAt`, `weightAvailability`; le type d'annonce correspond au sens de l'UI; les tests/build restent verts. |
| FE-LEGAL-001 | Mettre à jour les mentions légales et l'accès depuis la connexion | `agent:ready`, `size:S`, `area:frontend`, `area:compliance`, `sprint:legal-1`, `risk:legal` | Aucune dépendance | Les mentions légales sont accessibles depuis le footer et l'écran de connexion; les données société manquantes restent clairement indiquées comme en attente. |
| FE-CGU-001 | Ajouter la case CGU obligatoire à l'inscription | `agent:ready`, `size:M`, `area:frontend`, `area:auth`, `area:compliance`, `sprint:legal-1`, `risk:legal` | API-CGU-001 | La soumission est bloquée si la case n'est pas cochée; la version des CGU acceptée est envoyée au backend; l'erreur backend reste visible. |
| FE-MINOR-001 | Ajouter la date de naissance et le message mineur à l'inscription | `agent:ready`, `size:M`, `area:frontend`, `area:auth`, `area:compliance`, `sprint:legal-1`, `risk:legal` | API-MINOR-001 | L'inscription envoie la date de naissance; le message mineur existe; l'UX supporte la validation backend. |
| FE-REPORT-001 | Ajouter le signalement sur profil et annonces | `agent:ready`, `size:M`, `area:frontend`, `area:compliance`, `sprint:legal-1`, `risk:legal` | API-REPORT-001 | Les écrans profil et annonce exposent "Signaler"; le formulaire gère type et description optionnelle; la soumission appelle l'endpoint backend; un succès affiche un retour utilisateur. |
| FE-ADMIN-001 | Ajouter la modération admin frontend | `blocked:backend-contract`, `agent:needs-scope`, `size:L`, `area:frontend`, `area:admin`, `area:compliance`, `sprint:legal-1`, `risk:legal` | API-MOD-001, API-MOD-002, API-SUSP-001 | Une route/page admin existe; elle liste les signalements avec filtres; elle gère l'état interdit; l'admin peut classer sans suite, avertir ou suspendre via les endpoints backend. |
| FE-ACCOUNT-001 | Afficher l'état de compte suspendu ou banni | `blocked:backend-contract`, `size:M`, `area:frontend`, `area:auth`, `area:compliance`, `sprint:legal-1`, `risk:legal` | API-MEMBER-001, API-SUSP-001 | Les utilisateurs suspendus voient leur statut; les actions publier, réserver et envoyer un message sont indisponibles dans l'UI. |
| FE-OPS-003 | Activer la protection de branche GitHub | `agent:needs-review`, `size:S`, `area:frontend`, `sprint:ops`, `type:tech-debt` | Droits GitHub admin | La branche `task/lboi/use_chaye_api_backend` exige PR, 1 review, CODEOWNERS, conversations résolues, checks `test`, `build`, et bloque force-push/suppression. |

## Ordre Recommandé

1. FE-OPS-001 et FE-API-001
2. FE-ANN-001
3. FE-LEGAL-001
4. FE-CGU-001 après API-CGU-001
5. FE-MINOR-001 après API-MINOR-001
6. FE-REPORT-001 après API-REPORT-001
7. FE-ADMIN-001 après les APIs de modération
8. FE-ACCOUNT-001 après les APIs de statut/suspension
9. FE-OPS-002 quand l'équipe veut un développement frontend entièrement Dockerisé

## Issues GitHub Créées

| ID | Issue GitHub |
| --- | --- |
| FE-OPS-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/1 |
| FE-OPS-002 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/2 |
| FE-API-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/3 |
| FE-ANN-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/4 |
| FE-LEGAL-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/5 |
| FE-CGU-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/6 |
| FE-MINOR-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/7 |
| FE-REPORT-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/8 |
| FE-ADMIN-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/10 |
| FE-ACCOUNT-001 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/12 |
| FE-OPS-003 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/13 |

## Issues À Fermer Ou Fusionnées

| ID | Issue GitHub | Raison |
| --- | --- | --- |
| FE-REPORT-002 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/9 | Fusionné dans FE-REPORT-001, car composant et intégration doivent livrer une capacité testable ensemble. |
| FE-ADMIN-002 | https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/11 | Fusionné dans FE-ADMIN-001, car la page admin sans actions ne livre pas une capacité de modération complète. |
