#!/bin/sh
# Dev helper: screenshot a page. usage: scripts/shot.sh <url> <width> <height> <out.png> [scale]
set -eu
BROWSER=${BROWSER:-"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}
profile=$(mktemp -d)
trap 'rm -rf "$profile"' EXIT
out=$(realpath -m "$4")
if command -v cygpath >/dev/null 2>&1; then profile=$(cygpath -w "$profile"); out=$(cygpath -w "$out"); fi
timeout 60 "$BROWSER" --headless=new --disable-gpu --user-data-dir="$profile" --hide-scrollbars \
	--window-size="$2,$3" --force-device-scale-factor="${5:-1}" --screenshot="$out" "$1" 2>/dev/null
