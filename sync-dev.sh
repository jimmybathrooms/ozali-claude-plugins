#!/usr/bin/env bash
# Uso: ./sync-dev.sh <carpeta-de-mods-de-la-sesion>
set -euo pipefail
DEST="${1:?Uso: ./sync-dev.sh <carpeta-de-mods>}"
cd "$(dirname "$0")"
for p in plugins/*/; do rsync -a --delete "$p" "$DEST/$(basename "$p")/"; done
echo "sincronizado en $DEST"
