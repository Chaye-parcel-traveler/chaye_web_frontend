#!/bin/sh

set -u

control_dir="${E2E_CONTROL_DIR:-/e2e-control}"
done_file="${control_dir}/done"
stopped_file="${control_dir}/stopped"
db_stopped_file="${control_dir}/db-stopped"
status=0

npm run e2e || status=$?
touch "$done_file"

attempt=0
while { [ ! -f "$stopped_file" ] || [ ! -f "$db_stopped_file" ]; } && [ "$attempt" -lt 60 ]; do
  attempt=$((attempt + 1))
  sleep 1
done

if [ ! -f "$stopped_file" ] || [ ! -f "$db_stopped_file" ]; then
  echo "API or MariaDB E2E did not stop after the Playwright run." >&2
  [ "$status" -ne 0 ] || status=1
fi

exit "$status"
