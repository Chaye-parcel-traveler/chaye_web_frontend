#!/bin/sh

set -u

control_dir="${E2E_CONTROL_DIR:-/e2e-control}"
done_file="${control_dir}/done"
stopped_file="${control_dir}/stopped"
status=0

npm run e2e || status=$?
touch "$done_file"

attempt=0
while [ ! -f "$stopped_file" ] && [ "$attempt" -lt 30 ]; do
  attempt=$((attempt + 1))
  sleep 1
done

if [ ! -f "$stopped_file" ]; then
  echo "API E2E did not stop after the Playwright run." >&2
  [ "$status" -ne 0 ] || status=1
fi

exit "$status"
