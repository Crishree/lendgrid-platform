#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
echo "Starting LendGrid on http://localhost:3000"
npm run dev
