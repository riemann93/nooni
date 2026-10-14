# Warriv's memory

## Rules
- Work happens on branch Morten. Placeholder social proof must never reach production ("Swap placeholder reviews..." is the ship blocker).
- Shipping and delivery numbers come from the human, never guessed ("Fix conflicting shipping and delivery facts").
- Loops lead, Dots are secondary (human's ruling, overrides the "Lead with Dots" quest title and CONTENT-PLAN.md's keyword map order).
- Reviews come from Trustpilot (human chose it, no account yet). Never wire Judge.me or another review app. PLACEHOLDER_SOCIAL_PROOF goes false only with real Trustpilot reviews.

## Lately
- 2026-10-14 "Lead with Dots" fix-up landed (c2321cc) still Dots-first (LEAD_NAME_TAG dots-med-navn-3stk, Hero on Dots). Filed "Put Loops back in the lead" (opus) to restore order, keeping crumbs, taglines, /navnemaerker breadcrumbs and removed claims.
- 2026-10-14 "Lead with Dots" landed (429c76e) with conflicts and still made Dots lead, against the human's ruling. Fix-up (sonnet) told to keep Morten's Loops-first order and f8b3f23 titles, carrying only crumb names, taglines, /navnemaerker breadcrumbs and the removed claims.
- 2026-10-14 Round after titles fix-up landed (f8b3f23). Only "Lead with Dots" in progress, nothing blocked, no aim open. 19 landed since last ship, but production builds stay blocked by the Trustpilot guard. Nothing to do.
- 2026-10-14 "Product titles and H1s" landed with a product-meta.ts conflict against the final check (c82fbae). Fix-up (sonnet) told: rename cardTitle to title but keep Morten's values (emblem 'Loops med navn...', hub path /navnemaerker). Accepted its assumption: product-meta titles drive H1/title/schema until Shopify titles are fixed.
- 2026-10-14 Round after "Decide brand colours for small text" landed (346e525). Dots lead and titles quests in progress, nothing blocked, no aim open. Shipping waits on the Trustpilot guard. Nothing to do.
- 2026-10-14 Round after final check landed (c82fbae). NAMETAG_HUB_PATH is /navnemaerker, so dropped that Open line. Gave Model lines to the three new quests (Dots lead opus, titles and colours sonnet). Nothing else to do.
- 2026-10-14 Round: "Wire Trustpilot reviews..." marked done with no commit (main still a9cc90a, placeholders and guard on). Plan question stays open with the human. Final check still running. Nothing to do.
- 2026-10-14 Trustpilot quest needs account, unit ID, API key/export; free plan gives no product stars. Handed plan choice (paid Trustpilot, Judge.me, or free shop-wide) and details to the human, told the session to stop.
- 2026-10-14 Round: human settled reviews as Trustpilot (made a rule) and filed "Wire Trustpilot reviews..."; gave it Model: sonnet. Final check still running, NAMETAG_HUB_PATH still /produkter (it was told to flip it). Nothing else to do.
- 2026-10-14 Round after homepage rebuild landed (35b8d06). Only the final check (running, already told to flip NAMETAG_HUB_PATH) and the reviews quest (with the human) remain. Nothing to do.
- 2026-10-14 Product page merge landed (b316233) without flipping NAMETAG_HUB_PATH. Told the running final check to flip it. Only the reviews quest (with the human) and the final check remain.
- 2026-10-14 Round after hub page (c21717b) and listing sort (4f9f2ba) landed. Hub did not flip NAMETAG_HUB_PATH (still /produkter). Noted on the product page fix-up (no live session to tell) to flip it, and put hub link checks on the final check.
- 2026-10-14 "Navnemaerker hub page" landed with an llms.ts conflict. Fix-up (sonnet) told: keep both sides, flip NAMETAG_HUB_PATH to /navnemaerker, ids loops/dots/emblem (emblem on the 'emblem' handle), no new nav links (already on Morten). Camilla's claims to check go to the final check.
- 2026-10-14 "Product page reviews, facts, FAQ" landed with conflicts (page.tsx, product-meta.ts). Fix-up (sonnet) told: keep buy box, one anmeldelser section, hub links via NAMETAG_HUB_PATH, type-check. Accepted its placeholder assumptions. Hub quest noted to flip NAMETAG_HUB_PATH and add loops/dots/emblem ids. Final check gets these to verify.
- 2026-10-14 Round after "Briefs for the first long-tail posts" landed (4210ce3). Webshop nav landed too (73aa68a), so dropped that Open line. Three in progress, two waiting on After lines, reviews still with the human. Nothing to do.
- 2026-10-14 Woken again with no new events listed. Log unchanged: buy box fix-up in progress, only blocked quest is the reviews one already with the human. Nothing to do.
- 2026-10-14 "Product page buy box conventions" landed with conflicts (Footer, ValueStrip, llms, product-meta). Fix-up (sonnet) told: Morten's Footer wins, shipping from store-facts.ts, keep both sides of product-meta.
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
- Check "Put Loops back in the lead" lands Loops-first (Hero on Loops, Bestseller on Loops, LEAD_NAME_TAG and NAME_TAG_HANDLES Loops first). Sessions keep following the quest title and CONTENT-PLAN.md; if it slips again, consider asking the human to update CONTENT-PLAN.md's keyword map.
- Human (Camilla) to confirm hub guide claims: washing untested, Dots on zipper pulls with a cord and on hats/mittens; and whether a separate Emblem product is coming.
- Human to confirm shipping facts: is 'Fri fragt over 350 kr.' real? If yes, add it to Shopify policy and SHIPPING in src/lib/store-facts.ts.
- Human to pick paid Trustpilot product reviews, Judge.me, or free shop-wide Trustpilot, and supply account, business unit ID and API key/export for "Wire Trustpilot reviews...". Guard in next.config.ts blocks production builds meanwhile. If they switch, update the Trustpilot rule.
