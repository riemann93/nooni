# Warriv's memory

## Rules
- Work happens on branch Morten. Placeholder social proof must never reach production ("Swap placeholder reviews..." is the ship blocker).
- Shipping and delivery numbers come from the human, never guessed ("Fix conflicting shipping and delivery facts").

## Lately
- 2026-10-14 The nav fix-up hit a second Footer.tsx conflict with the blog quest's 'Gode raad' link. New fix-up (sonnet) told to keep the webshop columns with 'Gode raad' in them, then type-check and build.
- 2026-10-14 Round after "Make the blog serve the navnemaerker goal" landed (checks pass on main at 69dd99b). Briefs started on it; the two unstarted quests wait on their After lines. Both Open items still wait on the human. Nothing to do.
- 2026-10-14 Round after a landing (hero, cart drawer on main). Six in progress, none blocked, unstarted ones wait on their After lines. Both Open items still wait on the human. Nothing to do.
- 2026-10-14 Round after a ship. Hero landed, homepage rebuild started, six in progress. Both Open items still wait on the human. Nothing to do.
- 2026-10-14 "Navigation and footer" landed with a merge conflict; fix-up quest (sonnet) told to type-check and build. Accepted its assumptions (footer anchors, FAQ link, payment chips) and put their verification on the final conversion and SEO check.
- 2026-10-14 "Swap placeholder reviews" blocked after adding the production build guard. Handed the review service choice (Judge.me or Trustpilot) and real reviews to the human.
- 2026-10-14 Round after "Fix conflicting shipping and delivery facts" landed. It took the Shopify policies as truth (55 kr flat, no free-shipping threshold), noted as Assumed for the human. Six quests in progress, none blocked. Nothing to do.
- 2026-10-14 Round after "Placeholder social proof data" landed. Shipping facts, hero, hub page and product cards in progress, nothing blocked. Nothing to do.
- 2026-10-14 Round after "Bring Morten up to date with Discoverability" landed. Social proof and shipping facts quests in progress. Gave every unstarted quest a Model line (opus for hub page, homepage rebuild, final check; sonnet for the rest). Day look back: clean, nothing went wrong twice.

## Open
- Check the webshop nav lands on Morten via "Fix the merge of fix-the-merge-of-navigation-and-footer-as". If it conflicts a third time, hand it to an opus session to redo the footer on top of Morten instead of cherry-picking.
- Human to confirm shipping facts: is 'Fri fragt over 350 kr.' real? If yes, add it to Shopify policy and SHIPPING in src/lib/store-facts.ts.
- Human to pick Judge.me or Trustpilot and supply real reviews for "Swap placeholder reviews for real ones before production". Guard in next.config.ts blocks production builds meanwhile.
