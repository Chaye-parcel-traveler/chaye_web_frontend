#!/usr/bin/env bash
set -euo pipefail

image="${1:-chaye-web-frontend}"
api_url="${2:-http://localhost:3333}"
container_id="$(docker run -d --publish 127.0.0.1::80 "$image")"
trap 'docker rm --force "$container_id" >/dev/null' EXIT

port="$(docker port "$container_id" 80/tcp | sed -E 's/^.*:([0-9]+)$/\1/')"
base_url="http://127.0.0.1:$port"
ready=false
for _ in {1..30}; do
  if curl --fail --silent --output /dev/null "$base_url/"; then
    ready=true
    break
  fi
  sleep 1
done
[[ "$ready" == true ]] || { echo "Production container did not become ready." >&2; exit 1; }

headers="$(curl --fail --silent --show-error --head "$base_url/")"
for expected in \
  'X-Content-Type-Options: nosniff' \
  'Referrer-Policy: strict-origin-when-cross-origin' \
  'X-Frame-Options: DENY' \
  'Permissions-Policy: camera=(), microphone=(), geolocation=()'; do
  grep -iqF "$expected" <<<"$headers" || {
    echo "Missing HTTP header: $expected" >&2
    exit 1
  }
done

csp="$(sed -nE 's/^Content-Security-Policy:[[:space:]]*(.*)$/\1/p' <<<"$headers")"
for expected in "default-src 'self'" "object-src 'none'" "frame-ancestors 'none'" "connect-src 'self' $api_url"; do
  [[ "$csp" == *"$expected"* ]] || { echo "CSP is missing: $expected" >&2; exit 1; }
done
if grep -Eq '(^|[[:space:]])\*([;[:space:]]|$)' <<<"$csp"; then
  echo "CSP contains a wildcard source." >&2
  exit 1
fi

for path in / /index.html; do
  cache_control="$(curl --fail --silent --show-error --head "$base_url$path" | sed -nE 's/^Cache-Control:[[:space:]]*(.*)$/\1/p')"
  [[ "$cache_control" == *no-cache* && "$cache_control" != *immutable* ]] || {
    echo "$path must revalidate instead of being cached immutably." >&2
    exit 1
  }
done

asset="$(curl --fail --silent --show-error "$base_url/" | sed -nE 's/.*src="([^"]*\/assets\/[^" ]*\.js)".*/\1/p')"
[[ "$asset" == /assets/* ]] || { echo "Could not find a built Vite asset." >&2; exit 1; }
grep -Eq '^/assets/[^/]+-[A-Za-z0-9_-]{8}\.js$' <<<"$asset" || {
  echo "Vite asset name is not content-hashed: $asset" >&2
  exit 1
}
asset_cache="$(curl --fail --silent --show-error --head "$base_url$asset" | sed -nE 's/^Cache-Control:[[:space:]]*(.*)$/\1/p')"
[[ "$asset_cache" == *max-age=31536000* && "$asset_cache" == *immutable* ]] || {
  echo "Hashed asset does not have a one-year immutable cache policy." >&2
  exit 1
}

echo "Production HTTP headers and cache policy are valid."
