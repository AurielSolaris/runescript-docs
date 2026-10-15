#!/bin/sh
# Renders the raster icons and the Open Graph card into public/ with headless
# Microsoft Edge (or Chrome: BROWSER=...). Run after `bun run sync`, which
# copies the logo SVGs from the RuneScript repo.
#
# usage: scripts/render-images.sh
set -eu
cd "$(dirname "$0")/.."

BROWSER=${BROWSER:-"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}
# A separate profile keeps headless runs independent of an open browser window.
profile=$(mktemp -d)
trap 'rm -rf "$profile"*' EXIT
command -v cygpath >/dev/null 2>&1 && profile=$(cygpath -w "$profile")

# shot <html> <query> <width> <height> <out>
shot() {
	page=$(realpath "scripts/images/$1")
	out=$(realpath -m "public/$5")
	if command -v cygpath >/dev/null 2>&1; then
		page=$(cygpath -m "$page")
		out=$(cygpath -w "$out")
	fi
	timeout 60 "$BROWSER" --headless=new --disable-gpu --user-data-dir="$profile-$5" --hide-scrollbars --allow-file-access-from-files \
		--default-background-color=00000000 \
		--window-size="$3,$4" --force-device-scale-factor=1 \
		--screenshot="$out" "file:///${page#/}?$2" 2>/dev/null
	echo "wrote public/$5"
}

shot icon.html "size=32&pad=0" 32 32  favicon-32.png
shot icon.html "size=180&pad=0.12&bg=1" 180 180  apple-touch-icon.png
shot icon.html "size=192&pad=0.04" 192 192  icon-192.png
shot icon.html "size=512&pad=0.04" 512 512  icon-512.png
shot icon.html "size=512&pad=0.2&bg=1" 512 512  icon-maskable-512.png
shot og.html   ""             1200 630  og.png

# Safari pinned-tab icon: the logo in a single colour.
sed -e 's/#1F6FEB/#000000/g' -e 's/#FFB020/#000000/g' public/favicon.svg > public/mask-icon.svg
echo "wrote public/mask-icon.svg"
