<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Branch policy

Two long-lived branches. They are not interchangeable.

- **`main`** — active development. All feature work and Claude commits go here by default. Pushes deploy to a Vercel **preview** URL.
- **`production`** — what `nooni.dk` actually serves. Protected on GitHub: direct pushes are rejected. Updates land via a pull request from `main`.

## Rules

1. **Before staging or committing**, run `git status` and confirm the current branch is `main` or a feature branch — never `production`.
2. If you find yourself on `production` by accident, **stop**. Switch off it before doing anything else: `git stash -u` (if there are local changes) → `git checkout main` → `git stash pop`.
3. **Never** run `git push origin production` directly. It will be rejected by GitHub branch protection, but the local commit will still exist and have to be cleaned up.
4. To **ship to production** (only when the user explicitly asks): open a PR from `main` to `production` and merge it.
   ```
   gh pr create --base production --head main --title "Ship to production" --body "..."
   gh pr merge --merge
   ```
5. Do not attempt to bypass branch protection. If a push to `production` is rejected, that's working as designed — figure out why you're trying to push there and stop.

## Why this matters

`production` is the live site under-construction page (or, after launch, the live shop). Accidental commits there change what real customers see. The protection on GitHub catches it server-side, but stopping earlier — at the local commit stage — saves cleanup time.
