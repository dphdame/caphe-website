#!/bin/bash
# Deploy-parity gate (REG-2026-07-04-f).
#
# The Heroku remote (`origin` = git.heroku.com/caphegroup) is a DEPLOY target, and
# `git push origin master` ships whatever local master is. On 2026-07-04 that shipped
# a stale, unreviewed local commit to prod (v217). This gate refuses to deploy unless
# local HEAD == the reviewed/merged tip on GitHub (`github/master`).
#
# Usage:  scripts/check-deploy-parity.sh
# Escape hatch (intentional hotfix, logged):  ALLOW_DEPLOY_DIVERGENCE=1 git push origin master
set -euo pipefail

GITHUB_REMOTE="${GITHUB_REMOTE:-github}"
GITHUB_BRANCH="${GITHUB_BRANCH:-master}"

if [ "${ALLOW_DEPLOY_DIVERGENCE:-0}" = "1" ]; then
  echo "⚠️  ALLOW_DEPLOY_DIVERGENCE=1 — skipping deploy-parity check (intentional hotfix)." >&2
  exit 0
fi

# Fetch the reviewed tip (quietly; don't fail the whole push on a transient network error).
if ! git fetch "$GITHUB_REMOTE" "$GITHUB_BRANCH" --quiet 2>/dev/null; then
  echo "⚠️  deploy-parity: could not fetch $GITHUB_REMOTE/$GITHUB_BRANCH — cannot verify parity." >&2
  echo "    Re-run with ALLOW_DEPLOY_DIVERGENCE=1 to override intentionally." >&2
  exit 1
fi

LOCAL_HEAD="$(git rev-parse HEAD)"
REVIEWED="$(git rev-parse "$GITHUB_REMOTE/$GITHUB_BRANCH")"

if [ "$LOCAL_HEAD" != "$REVIEWED" ]; then
  echo "❌ deploy-parity FAILED — refusing to deploy an unreviewed commit." >&2
  echo "    local HEAD          : $LOCAL_HEAD" >&2
  echo "    $GITHUB_REMOTE/$GITHUB_BRANCH : $REVIEWED" >&2
  echo "" >&2
  echo "    Deploy the reviewed tip instead:" >&2
  echo "      git fetch $GITHUB_REMOTE $GITHUB_BRANCH && git reset --hard $GITHUB_REMOTE/$GITHUB_BRANCH && git push origin master" >&2
  echo "    Or, for an intentional hotfix: ALLOW_DEPLOY_DIVERGENCE=1 git push origin master" >&2
  exit 1
fi

echo "✅ deploy-parity OK — HEAD matches $GITHUB_REMOTE/$GITHUB_BRANCH ($LOCAL_HEAD)."
exit 0
