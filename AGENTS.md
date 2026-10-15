<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Branch policy

Two long-lived branches. They are not interchangeable.

- **`main`** — active development. Pushes deploy to a Vercel **preview** URL.
- **`production`** — what `nooni.dk` actually serves. Protected on GitHub: only the repo owner (`riemann93`) can update it, and only by merging a pull request from `main`.

## Who commits where

Several people work on this repo, mostly through AI agents. Work out which case you're in before your first commit:

- **The repo owner's own sessions (GitHub user `riemann93`)** may commit straight to `main`.
- **Everyone else, collaborators and their agents,** never push to `main` or `production`. Branch off the latest `main`, push the branch, and open a pull request into `main`. Each pull request gets its own Vercel preview URL; `riemann93` reviews and merges it.

`gh api user --jq .login` shows which GitHub user you're pushing as. If you can't tell, use a branch and a pull request — that is always allowed.

## Rules

1. **Before staging or committing**, run `git status` and confirm the current branch is a feature branch (or `main`, for the owner's sessions) — never `production`.
2. If you find yourself on `production` by accident, **stop**. Switch off it before doing anything else: `git stash -u` (if there are local changes) → `git checkout main` → `git stash pop`.
3. **Never** run `git push origin production` directly. It will be rejected by GitHub branch protection, but the local commit will still exist and have to be cleaned up.
4. To **ship to production** (only when the owner explicitly asks): open a PR from `main` to `production` and give the owner its link. The owner merges it on GitHub; don't try to merge it yourself.
   ```
   gh pr create --base production --head main --title "Ship to production" --body "..."
   ```
5. Do not attempt to bypass branch protection. If a push is rejected, that's working as designed — figure out why you're trying to push there and stop.
6. **Keep pull requests small and on one topic** (one feature, one blog post, one batch of SEO fixes) so they're quick to review.
7. **Never commit secrets.** The repo is public. `.env*` files are gitignored; only `.env.example`, with empty values, is tracked.
8. Close and delete branches you abandon. Merged branches are deleted automatically.

## Why this matters

`production` is the live shop. Accidental commits there change what real customers see. The protection on GitHub catches it server-side, but stopping earlier — at the local commit stage — saves cleanup time. And because the repo is public, anything ever pushed (including to branches deleted later) can be read by anyone.
