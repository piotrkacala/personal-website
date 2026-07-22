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

assert_unavailable() {
  local path="$1"

  if curl --fail --silent --location "${base_url}${path}" >/dev/null 2>&1; then
    printf 'Expected removed production path to be unavailable: %s\n' "$path" >&2
    exit 1
  fi
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
fetch "/consulting/" "$tmp_dir/consulting-en.html"
fetch "/pl/consulting/" "$tmp_dir/consulting-pl.html"
fetch "/index.md" "$tmp_dir/en.md"
fetch "/pl/index.md" "$tmp_dir/pl.md"
fetch "/consulting.md" "$tmp_dir/consulting-en.md"
fetch "/pl/consulting.md" "$tmp_dir/consulting-pl.md"
fetch "/llms.txt" "$tmp_dir/llms.txt"
fetch "/llms-full.txt" "$tmp_dir/llms-full.txt"
fetch "/sitemap.xml" "$tmp_dir/sitemap.xml"
fetch_with_headers "/phonetic-benchmark/" "$tmp_dir/benchmark.html" "$tmp_dir/benchmark.headers"
fetch_with_headers "/phonetic-benchmark/results.json" "$tmp_dir/results.json" "$tmp_dir/results-json.headers"
fetch_with_headers "/phonetic-benchmark/results.csv" "$tmp_dir/results.csv" "$tmp_dir/results-csv.headers"
fetch_with_headers "/400m/" "$tmp_dir/400m.html" "$tmp_dir/400m.headers"

curl --fail --silent --show-error --location \
  --header "Accept: text/markdown" \
  --dump-header "$tmp_dir/en-negotiated.headers" \
  "$base_url/" >"$tmp_dir/en-negotiated.md"
curl --fail --silent --show-error --location \
  --header "Accept: text/markdown" \
  --dump-header "$tmp_dir/pl-negotiated.headers" \
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
assert_matches "$tmp_dir/en.headers" 'link:.*<(https://piotrkacala\.pl)?/index\.md>.*rel="?alternate"?'
assert_matches "$tmp_dir/pl.headers" 'link:.*<(https://piotrkacala\.pl)?/pl/index\.md>.*rel="?alternate"?'
assert_matches "$tmp_dir/en-negotiated.headers" '^content-type: text/markdown; charset=(UTF-8|utf-8)'
assert_matches "$tmp_dir/pl-negotiated.headers" '^content-type: text/markdown; charset=(UTF-8|utf-8)'
assert_contains "$tmp_dir/llms-full.txt" "AI agents are the implementation interface. I own the product decisions, system boundaries, review, and outcome."
assert_contains "$tmp_dir/en.html" "I own the product decisions, system boundaries, review, and outcome."
assert_contains "$tmp_dir/pl.html" "Ja odpowiadam za decyzje produktowe, granice systemu, review i rezultat."

for file in "$tmp_dir/consulting-en.html" "$tmp_dir/consulting-en.md" "$tmp_dir/llms-full.txt"; do
  assert_contains "$file" "From rough product idea to shipped software."
  assert_contains "$file" "Start with the scope"
done

for file in "$tmp_dir/consulting-pl.html" "$tmp_dir/consulting-pl.md" "$tmp_dir/llms-full.txt"; do
  assert_contains "$file" "Od niejasnego pomysłu do działającego produktu."
  assert_contains "$file" "Zacznijmy od zakresu"
done

for path in /consulting/ /pl/consulting/ /consulting.md /pl/consulting.md; do
  assert_contains "$tmp_dir/sitemap.xml" "<loc>https://piotrkacala.pl${path}</loc>"
done

for profile in 400m phonetic-alphabet-trainer surfaced; do
  assert_contains "$tmp_dir/llms.txt" "https://piotrkacala.pl/projects/${profile}.md"
  assert_contains "$tmp_dir/llms-full.txt" "https://piotrkacala.pl/projects/${profile}.md"
  assert_contains "$tmp_dir/sitemap.xml" "<loc>https://piotrkacala.pl/projects/${profile}.md</loc>"
  fetch "/projects/${profile}.md" "$tmp_dir/${profile}.md"
  assert_contains "$tmp_dir/${profile}.md" "Companion machine-readable profile"
done

assert_unavailable "/projects/client-audit-platform.md"
for file in "$tmp_dir/en.html" "$tmp_dir/pl.html" "$tmp_dir/en.md" "$tmp_dir/pl.md" "$tmp_dir/llms.txt" "$tmp_dir/llms-full.txt" "$tmp_dir/sitemap.xml"; do
  if grep --extended-regexp --ignore-case --quiet 'client-audit-platform|private client audit platform|prywatna platforma do audytów' "$file"; then
    printf 'Retired private project remains in %s\n' "$file" >&2
    exit 1
  fi
done

assert_contains "$tmp_dir/benchmark.html" "43 archived web applications"
assert_contains "$tmp_dir/benchmark.html" "GPT 5.6 Sol"
assert_contains "$tmp_dir/benchmark.html" "GPT 5.6 Terra"
assert_contains "$tmp_dir/benchmark.html" "GPT 5.6 Luna"
assert_contains "$tmp_dir/benchmark.html" "Kimi K3"
assert_contains "$tmp_dir/benchmark.html" "Grok 4.5 High"
assert_contains "$tmp_dir/results.json" '"id": "gpt-5-6-sol-v2"'
assert_contains "$tmp_dir/results.json" '"comparativeScore": 94'
assert_contains "$tmp_dir/results.csv" 'gpt-5-6-luna-v2'
assert_contains "$tmp_dir/results.csv" 'kimi-k3-v2'
assert_contains "$tmp_dir/results.csv" 'grok-4-5-v2'
assert_matches "$tmp_dir/results-json.headers" '^content-type: application/json(; charset=(UTF-8|utf-8))?'
assert_matches "$tmp_dir/results-csv.headers" '^content-type: text/csv; charset=(UTF-8|utf-8)'
assert_matches "$tmp_dir/400m.headers" '^content-type: text/html; charset=(UTF-8|utf-8)'
assert_contains "$tmp_dir/400m.html" "400m"

printf 'Production smoke checks passed for %s\n' "$base_url"
