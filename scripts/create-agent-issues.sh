#!/usr/bin/env bash
set -euo pipefail

repo="Chaye-parcel-traveler/chaye_web_frontend"
dry_run="${DRY_RUN:-false}"

if ! gh auth status >/dev/null 2>&1; then
  echo "gh is not authenticated. Run: gh auth login -h github.com"
  exit 1
fi

create_label() {
  local name="$1"
  local color="$2"
  local description="$3"
  if [[ "$dry_run" == "true" ]]; then
    echo "DRY_RUN label: $name"
    return 0
  fi
  gh label create "$name" --repo "$repo" --color "$color" --description "$description" >/dev/null 2>&1 || true
}

create_issue() {
  local title="$1"
  local body="$2"
  shift 2
  local id="${title%%]*}"
  id="${id#[}"

  local existing
  existing="$(
    gh issue list --repo "$repo" --state all --limit 200 --json number,title \
      --jq "map(select(.title | startswith(\"[$id]\"))) | .[0].number // empty"
  )"
  if [[ -n "$existing" ]]; then
    echo "Skip existing $id: #$existing"
    return 0
  fi

  if [[ "$dry_run" == "true" ]]; then
    echo "DRY_RUN issue: $title"
    return 0
  fi

  local args=(issue create --repo "$repo" --title "$title" --body "$body")
  for label in "$@"; do
    args+=(--label "$label")
  done

  gh "${args[@]}"
}

create_label "agent:ready" "2DA44E" "Ticket scoped enough for an AI agent"
create_label "agent:needs-review" "D29922" "Needs careful human or senior-agent review"
create_label "agent:needs-scope" "D29922" "Needs scope clarification before implementation"
create_label "agent:too-small" "BFDADC" "Too small; should be merged with a nearby capability"
create_label "agent:too-large" "F9D0C4" "Too large; should be split by workflow or risk"
create_label "size:S" "C2E0C6" "Small scoped change"
create_label "size:M" "BFD4F2" "Medium change; target size for agent-ready implementation"
create_label "size:L" "F9D0C4" "Large change; review or split before implementation"
create_label "blocked:backend-contract" "B60205" "Needs backend endpoint or contract first"
create_label "area:frontend" "1D76DB" "Frontend work"
create_label "area:auth" "B60205" "Authentication or signup flow"
create_label "area:compliance" "FBCA04" "Legal/compliance UI"
create_label "area:admin" "5319E7" "Admin/back-office UI"
create_label "area:api-client" "0E8A16" "API integration and Axios calls"
create_label "sprint:legal-1" "F9D0C4" "Launch-blocking legal Sprint 1"
create_label "sprint:ops" "C5DEF5" "Agentic/dev workflow improvement"
create_label "type:feature" "A2EEEF" "Product feature"
create_label "type:bug" "D73A4A" "Bug report"
create_label "type:tech-debt" "D4C5F9" "Technical debt"
create_label "risk:legal" "D93F0B" "Legal/compliance risk"

create_issue "[FE-OPS-001] Ajouter une CI frontend pour les tests et le build" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- GitHub Actions exécute `npm test -- --watchAll=false`.\n- GitHub Actions exécute `npm run build`.' \
"agent:ready" "size:S" "area:frontend" "sprint:ops" "type:tech-debt"

create_issue "[FE-OPS-002] Ajouter un service Docker Compose de développement frontend" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Le serveur Vite démarre dans Docker sur le port 3000.\n- `VITE_API_URL=http://localhost:3333` est configuré.\n- Le hot reload fonctionne.' \
"agent:ready" "size:M" "area:frontend" "sprint:ops" "type:tech-debt"

create_issue "[FE-API-001] Remplacer les appels API hardcodés vers localhost" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Les écrans touchés utilisent la base URL Axios.\n- Aucun nouvel appel `http://localhost:5000` n\'est ajouté.' \
"agent:ready" "size:M" "area:frontend" "area:api-client" "type:tech-debt"

create_issue "[FE-ANN-001] Corriger le contrat du formulaire de création d'annonce" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Le formulaire envoie `departingFrom`, `arrivingAt`, `weightAvailability`.\n- Le type d\'annonce correspond au sens de l\'UI.' \
"agent:ready" "size:M" "area:frontend" "area:api-client" "type:tech-debt"

create_issue "[FE-LEGAL-001] Mettre à jour les mentions légales et l'accès depuis la connexion" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- Les mentions légales sont accessibles depuis le footer et l\'écran de connexion.\n- Les données société manquantes restent clairement indiquées comme en attente.' \
"agent:ready" "size:S" "area:frontend" "area:compliance" "sprint:legal-1" "risk:legal"

create_issue "[FE-CGU-001] Ajouter la case CGU obligatoire à l'inscription" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-CGU-001\n\nCritères d\'acceptation:\n- La soumission est bloquée si la case n\'est pas cochée.\n- La version des CGU acceptée est envoyée au backend.\n- L\'erreur backend reste visible.' \
"agent:ready" "size:M" "area:frontend" "area:auth" "area:compliance" "sprint:legal-1" "risk:legal"

create_issue "[FE-MINOR-001] Ajouter la date de naissance et le message mineur à l'inscription" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-MINOR-001\n\nCritères d\'acceptation:\n- L\'inscription envoie la date de naissance.\n- Le message mineur existe.\n- L\'UX supporte la validation backend.' \
"agent:ready" "size:M" "area:frontend" "area:auth" "area:compliance" "sprint:legal-1" "risk:legal"

create_issue "[FE-REPORT-001] Ajouter le signalement sur profil et annonces" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-REPORT-001\n\nCritères d\'acceptation:\n- Les écrans profil et annonce exposent `Signaler`.\n- Le formulaire gère le type de signalement et la description optionnelle.\n- La soumission appelle l\'endpoint backend.\n- Un succès affiche un retour utilisateur.' \
"agent:ready" "size:M" "area:frontend" "area:compliance" "sprint:legal-1" "risk:legal"

create_issue "[FE-ADMIN-001] Ajouter la modération admin frontend" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-MOD-001, API-MOD-002, API-SUSP-001\n\nCritères d\'acceptation:\n- Une route/page admin existe.\n- Elle liste les signalements avec filtres.\n- Elle gère l\'état interdit.\n- L\'admin peut classer sans suite, avertir ou suspendre via les endpoints backend.' \
"blocked:backend-contract" "agent:needs-scope" "size:L" "area:frontend" "area:admin" "area:compliance" "sprint:legal-1" "risk:legal"

create_issue "[FE-ACCOUNT-001] Afficher l'état de compte suspendu ou banni" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nDépend de: API-MEMBER-001, API-SUSP-001\n\nCritères d\'acceptation:\n- Les utilisateurs suspendus voient leur statut.\n- Les actions publier, réserver et envoyer un message sont indisponibles dans l\'UI.' \
"blocked:backend-contract" "size:M" "area:frontend" "area:auth" "area:compliance" "sprint:legal-1" "risk:legal"

create_issue "[FE-OPS-003] Activer la protection de branche GitHub" \
$'Source: docs/agent-tickets.md#tickets-frontend\n\nCritères d\'acceptation:\n- La branche `task/lboi/use_chaye_api_backend` exige une PR avant merge.\n- Au moins 1 review est requise.\n- Les reviews CODEOWNERS sont requises.\n- Les conversations doivent être résolues.\n- Les force-pushes et suppressions sont interdits.\n- Les checks obligatoires sont `test` et `build`.\n\nNote technique:\nLe compte `gh` utilisé par l\'agent a `viewerPermission=WRITE`, pas `ADMIN`; un admin GitHub doit appliquer ce réglage.' \
"agent:needs-review" "size:S" "area:frontend" "sprint:ops" "type:tech-debt"
