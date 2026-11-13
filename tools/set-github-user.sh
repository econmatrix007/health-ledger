#!/bin/bash
# Replaces the OWNER placeholder with your GitHub username in every file that links to the repo.
# Usage: ./tools/set-github-user.sh your-github-username
set -euo pipefail
U="${1:?Usage: $0 your-github-username}"
cd "$(dirname "$0")/.."
for f in README.md .github/FUNDING.yml app/index.html docs/*.md pilot/*.md; do
  [ -f "$f" ] && sed -i '' "s/OWNER/${U}/g" "$f" && echo "updated $f"
done
