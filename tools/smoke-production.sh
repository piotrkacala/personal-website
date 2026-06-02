#!/usr/bin/env bash

set -euo pipefail

base_url="${BASE_URL:-https://piotrkacala.pl}"
tmp_dir="$(mktemp -d)"

cleanup() {
  rm -rf "$tmp_dir"
}

trap cleanup EXIT

fetch() {
  local path="$1"
  local output="$2"

  curl --fail --silent --show-error --location "${base_url}${path}" >"$output"
}

fetch_with_headers() {
  local path="$1"
  local output="$2"
  local headers="$3"

  curl --fail --silent --show-error --location \
    --dump-header "$headers" \
    "${base_url}${path}" >"$output"
}

assert_contains() {
  local file="$1"
  local pattern="$2"

  if ! grep --fixed-strings --quiet "$pattern" "$file"; then
    printf 'Missing expected text in %s: %s\n' "$file" "$pattern" >&2
    exit 1
  fi
}

assert_matches() {
  local file="$1"
  local pattern="$2"

  if ! grep --extended-regexp --ignore-case --quiet "$pattern" "$file"; then
    printf 'Missing expected pattern in %s: %s\n' "$file" "$pattern" >&2
    exit 1
  fi
}

fetch_with_headers "/" "$tmp_dir/en.html" "$tmp_dir/en.headers"
fetch_with_headers "/pl/" "$tmp_dir/pl.html" "$tmp_dir/pl.headers"
fetch "/index.md" "$tmp_dir/en.md"
fetch "/pl/index.md" "$tmp_dir/pl.md"
fetch "/llms.txt" "$tmp_dir/llms.txt"
fetch "/llms-full.txt" "$tmp_dir/llms-full.txt"
fetch "/sitemap.xml" "$tmp_dir/sitemap.xml"

curl --fail --silent --show-error --location \
  --header "Accept: text/markdown" \
  "$base_url/" >"$tmp_dir/en-negotiated.md"
curl --fail --silent --show-error --location \
  --header "Accept: text/markdown" \
  "$base_url/pl/" >"$tmp_dir/pl-negotiated.md"

cmp "$tmp_dir/en.md" "$tmp_dir/en-negotiated.md"
cmp "$tmp_dir/pl.md" "$tmp_dir/pl-negotiated.md"

for file in "$tmp_dir/en.html" "$tmp_dir/en.md" "$tmp_dir/llms-full.txt"; do
  assert_contains "$file" "Phonetic Benchmark"
  assert_contains "$file" "https://piotrkacala.pl/phonetic-benchmark/"
done

for file in "$tmp_dir/pl.html" "$tmp_dir/pl.md"; do
  assert_contains "$file" "Phonetic Benchmark"
  assert_contains "$file" "https://piotrkacala.pl/pl/phonetic-benchmark/"
done

assert_contains "$tmp_dir/en.html" 'type="text/markdown"'
assert_contains "$tmp_dir/pl.html" 'type="text/markdown"'
assert_matches "$tmp_dir/en.headers" 'link:.*<https://piotrkacala\.pl/index\.md>.*rel="?alternate"?'
assert_matches "$tmp_dir/pl.headers" 'link:.*<https://piotrkacala\.pl/pl/index\.md>.*rel="?alternate"?'
assert_contains "$tmp_dir/llms-full.txt" "AI agents are the build interface. The differentiator is judgment across product, design, QA, and development."

for profile in 400m phonetic-alphabet-trainer surfaced client-audit-platform; do
  assert_contains "$tmp_dir/llms.txt" "https://piotrkacala.pl/projects/${profile}.md"
  assert_contains "$tmp_dir/llms-full.txt" "https://piotrkacala.pl/projects/${profile}.md"
  assert_contains "$tmp_dir/sitemap.xml" "<loc>https://piotrkacala.pl/projects/${profile}.md</loc>"
  fetch "/projects/${profile}.md" "$tmp_dir/${profile}.md"
  assert_contains "$tmp_dir/${profile}.md" "Companion machine-readable profile"
done

printf 'Production smoke checks passed for %s\n' "$base_url"
