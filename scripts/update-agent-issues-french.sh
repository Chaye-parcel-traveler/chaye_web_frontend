#!/usr/bin/env bash
set -euo pipefail

repo="Chaye-parcel-traveler/chaye_web_frontend"

if ! gh auth status >/dev/null 2>&1; then
  echo "gh is not authenticated. Run: gh auth login -h github.com"
  exit 1
fi

edit_issue() {
  local number="$1"
  local title="$2"
  local body="$3"

  gh issue edit "$number" --repo "$repo" --title "$title" --body "$body"
}

edit_issue 1 "[FE-OPS-001] Ajouter une CI frontend pour les tests et le build" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- GitHub Actions exécute `npm test -- --watchAll=false`.\n- GitHub Actions exécute `npm run build`.'

edit_issue 2 "[FE-OPS-002] Ajouter un service Docker Compose de développement frontend" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Le serveur Vite démarre dans Docker sur le port 3000.\n- `VITE_API_URL=http://localhost:3333` est configuré.\n- Le hot reload fonctionne.'

edit_issue 3 "[FE-API-001] Remplacer les appels API hardcodés vers localhost" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Les écrans touchés utilisent la base URL Axios.\n- Aucun nouvel appel `http://localhost:5000` n\'est ajouté.'

edit_issue 4 "[FE-ANN-001] Corriger le contrat du formulaire de création d'annonce" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Le formulaire envoie `departingFrom`, `arrivingAt`, `weightAvailability`.\n- Le type d\'annonce correspond au sens de l\'UI.'

edit_issue 5 "[FE-LEGAL-001] Mettre à jour les mentions légales et l'accès depuis la connexion" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Les mentions légales sont accessibles depuis le footer et l\'écran de connexion.\n- Les données société manquantes restent clairement indiquées comme en attente.'

edit_issue 6 "[FE-CGU-001] Ajouter la case CGU obligatoire à l'inscription" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-CGU-002\n\nCritères d\'acceptation:\n- La soumission est bloquée si la case n\'est pas cochée.\n- La version des CGU acceptée est envoyée au backend.'

edit_issue 7 "[FE-MINOR-001] Ajouter la date de naissance et le message mineur à l'inscription" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-MINOR-001\n\nCritères d\'acceptation:\n- L\'inscription envoie la date de naissance.\n- Le message mineur existe.\n- L\'UX supporte la validation backend.'

edit_issue 8 "[FE-REPORT-001] Ajouter un composant réutilisable de formulaire de signalement" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-REPORT-002\n\nCritères d\'acceptation:\n- Le formulaire gère le type de signalement et la description optionnelle.\n- Il soumet vers l\'endpoint backend.'

edit_issue 9 "[FE-REPORT-002] Ajouter les actions de signalement sur profil et annonces" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: FE-REPORT-001\n\nCritères d\'acceptation:\n- Les écrans profil et annonce exposent `Signaler`.\n- Une soumission réussie affiche un retour utilisateur.'

edit_issue 10 "[FE-ADMIN-001] Ajouter la page admin de modération" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-MOD-001\n\nCritères d\'acceptation:\n- Une route/page admin existe.\n- Elle charge la liste des signalements avec filtres.\n- Elle gère l\'état interdit.'

edit_issue 11 "[FE-ADMIN-002] Ajouter les actions UI de modération" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: FE-ADMIN-001, API-MOD-002, API-SUSP-001\n\nCritères d\'acceptation:\n- L\'admin peut classer sans suite, avertir ou suspendre via les endpoints backend.'

edit_issue 12 "[FE-ACCOUNT-001] Afficher l'état de compte suspendu ou banni" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-MEMBER-001, API-SUSP-001\n\nCritères d\'acceptation:\n- Les utilisateurs suspendus voient leur statut.\n- Les actions publier, réserver et envoyer un message sont indisponibles dans l\'UI.'
