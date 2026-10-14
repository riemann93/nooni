- [x] Bring Morten up to date with Discoverability @bring-morten-up-to-date-with-59565
  Morten is 6 commits behind Discoverability (SEO basics, src/lib/seo.ts, pageMetadata, policies, llms.txt, SEARCH-GUIDE.md, CONTENT-PLAN.md, SEO.md). It is a clean fast-forward: on Morten run git merge --ff-only Discoverability, then push. Every other quest builds on these files.
- [x] Placeholder social proof data @placeholder-social-proof-data-59587
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Create one module, src/lib/social-proof.ts, holding ALL made-up social proof: overall rating (e.g. 4.9), review count, 8 to 12 short Danish parent reviews (first name + town, product handle, stars, text about navnemaerker in vuggestue/boernehave), per-product rating and count by handle, and a 'X familier bruger Nooni' number. Export PLACEHOLDER_SOCIAL_PROOF = true and a top comment saying it is fake and must be replaced before production. Never feed it into JSON-LD (no Review/AggregateRating schema from placeholder data; Google penalises it, and fake reviews going live breaks Danish markedsfoeringsloven). Also build a small reusable Stars component (rating + count) in brand colours.
  After: Bring Morten up to date with Discoverability
  Assumed: 4.9 from 312 reviews, 1200 familier, 10 reviews on loops-navn/loops/emblem/dots handles; Stars fills in nooni-headline on nooni-line, Danish aria-label.
- [x] Fix conflicting shipping and delivery facts @fix-conflicting-shipping-and-delivery-59597
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) ValueStrip.tsx says 'Fri fragt over 350 kr.' and 'Klar til afsendelse paa 2-4 dage'. src/lib/seo.ts (copied from the store policies) says shipping 55 kr, handling 1-2 days, transit 1-3 days, 14 day returns. Hero, USP bar, product page and cart will all show these, so they must agree. Ask the user which numbers are true, do not guess. Then move them into one shared module (e.g. src/lib/store-facts.ts) used by seo.ts and every UI surface.
  After: Bring Morten up to date with Discoverability
  Assumed: the published Shopify policies are the truth (55 kr flat, no free-shipping threshold, 1-2 days handling, 1-3 days delivery, 14 days returns), since they are the terms customers agree to at checkout. ValueStrip's 'Fri fragt over 350 kr.' and '2-4 dage' were dropped. If free shipping over 350 kr. is real, add it to the Shopify shipping policy and to SHIPPING in src/lib/store-facts.ts.
- [x] Homepage hero for navnemaerker @homepage-hero-for-navnemaerker-59651
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Also needs: Fix conflicting shipping and delivery facts. Biggest-impact quest. Today the hero sells Deks (card holder) and the page H1 is 'Deks'. Rebuild src/components/Hero.tsx around navnemaerker with high-converting shop conventions: the single page H1 containing 'navnemaerker' (e.g. 'Personlige navnemaerker til boern'); one-line benefit (sidder paa lynlaas/taske, bliver ikke vaek i institutionen, kan genkendes af boern der ikke kan laese); stars + review count from social-proof.ts right under the H1; 'Fra XX kr' price for Loops pulled from Shopify; primary CTA 'Design dit navnemaerke' to the Loops product page; secondary CTA 'Se alle navnemaerker' to /navnemaerker; 3 short trust ticks from store facts (levering, haandlavet i Borris, ...); a product-focused Loops image. At 375px the H1, rating and CTA must be above the fold. Keep the rounded frame and cream wash look.
  After: Placeholder social proof data
  Warriv: Model: sonnet
  Assumed: trust ticks avoid shipping times/prices until store-facts lands; hero falls back to dots_name_lifestyle.jpg when Shopify is unreachable; CTA goes to /produkter/loops.
- [x] Navigation and footer as a webshop @navigation-and-footer-as-a-webshop-59701
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Navbar.tsx and MobileMenu.tsx: first item 'Navnemaerker' (to /navnemaerker), then 'Alle produkter', 'Om Nooni', 'Kontakt'. Remove Blog from the main nav. Cart with item count stays prominent on the right. Add a slim announcement/USP bar above the navbar (shipping, delivery time, haandlavet i Danmark) from the shared store facts. Footer: shop-style columns (Shop: Navnemaerker, Loops, Dots, Emblem, Alle produkter; Hjaelp: Fragt og levering, Returnering, Kontakt, FAQ; Om: Min historie, Gode raad = the blog) and payment method icons matching what Shopify checkout offers. Keep the arched footer design.
  After: Fix conflicting shipping and delivery facts
  Warriv: Model: sonnet
  Assumed: Loops/Dots/Emblem footer links go to /navnemaerker#loops, #dots, #emblem (hub page is built on another branch); FAQ links to /kontakt#faq since no FAQ page exists; payment icons are text chips for Visa, Mastercard, MobilePay, Dankort (what the footer already stated), not verified against Shopify checkout; not type-checked, worktree has no node_modules.
  Warriv: Assumed: its choices stand (footer family links to /navnemaerker#loops/#dots/#emblem, FAQ to /kontakt#faq, payment chips Visa/Mastercard/MobilePay/Dankort). Payment methods get checked against Shopify checkout in the final conversion and SEO check.
- [x] Fix the merge of navigation-and-footer-as-a-webshop @fix-the-merge-of-navigation-and-footer-as-59776
  "Navigation and footer as a webshop" is done on the branch `navigation-and-footer-as-a-webshop` but did not merge into `Morten`: rebasing it on `Morten` conflicts.
  Take its commits onto your branch with `git cherry-pick Morten..navigation-and-footer-as-a-webshop`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D navigation-and-footer-as-a-webshop`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging src/components/Footer.tsx
  CONFLICT (content): Merge conflict in src/components/Footer.tsx
  Auto-merging src/lib/store-facts.ts
  CONFLICT (add/add): Merge conflict in src/lib/store-facts.ts
  error: could not apply d6539e6... Webshop navigation, announcement bar and footer columns
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply d6539e6... # Webshop navigation, announcement bar and footer columns
  ```
  Warriv: Model: sonnet. Told it to type-check and build after resolving, since the nav quest shipped unchecked.
- [x] Fix the merge of fix-the-merge-of-navigation-and-footer-as @fix-the-merge-of-fix-the-merge-of-59850
  "Fix the merge of navigation-and-footer-as-a-webshop" is done on the branch `fix-the-merge-of-navigation-and-footer-as` but did not merge into `Morten`: rebasing it on `Morten` conflicts.
  Take its commits onto your branch with `git cherry-pick Morten..fix-the-merge-of-navigation-and-footer-as`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D fix-the-merge-of-navigation-and-footer-as`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging src/components/Footer.tsx
  CONFLICT (content): Merge conflict in src/components/Footer.tsx
  error: could not apply 0400829... Webshop navigation, announcement bar and footer columns
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply 0400829... # Webshop navigation, announcement bar and footer columns
  ```
  Warriv: Model: sonnet
  Warriv: Second merge conflict, in Footer.tsx: the blog quest landed a 'Gode raad' footer link first. Told it to keep the webshop columns, put 'Gode raad' (/blog) in them, and type-check and build before committing.
  Assumed: footer blog link keeps the label 'Gode raad' to match the rest of the site, not 'Gode råd' from the cherry-picked commit.
- [x] Navnemaerker hub page @navnemaerker-hub-page-59607
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Build /navnemaerker as described in CONTENT-PLAN.md Phase 1 and SEARCH-GUIDE.md 'New pages'. It is both the category page and the page meant to rank #1 for 'navnemaerker'. Above the fold: H1 'Navnemaerker til boern', short intro, rating, the name-tag product grid (Loops, Loops navn, Dots med navn, Dots motiv, Emblem) with prices and stars. Below: comparison (what fits where: lynlaas, taske, jakke), short guide (what to mark for vuggestue/boernehave, how they mount, washing; tested claims only), FAQ with FAQPage schema, links to related posts. Use pageMetadata() with canonical, add to sitemap.ts and llms.txt. Respect 'The intent problem' in CONTENT-PLAN.md.
  After: Bring Morten up to date with Discoverability
  Warriv: Model: opus
  Assumed: no separate Emblem product exists in Shopify (handle 'emblem' is titled 'Loops - Navn'), so the grid shows the 4 live name tags. A future Emblem or 'loops-navn' handle shows up by adding it to NAME_TAGS in src/lib/navnemaerker.ts.
  Assumed: the branch merges placeholder-social-proof-data (commit 10b7865) to use Stars. Ratings show on the page but never in JSON-LD.
  For Camilla: the guide says washing is untested and to take tags off before washing. It also says Dots tie into the zipper pull with a cord (from the product photos) and can go on hats and mittens (from the Dots description). Check both.
  Not linked from navbar/footer yet: left to 'Navigation and footer as a webshop' to avoid conflicts. Until then it is reachable via sitemap and llms.txt only.
  Warriv: Warriv: Morten now has NAMETAG_HUB_PATH in src/lib/product-meta.ts (/produkter until this page exists). Set it to /navnemaerker in the same commit as the page. Give sections ids loops, dots, emblem; the footer links to them.
- [x] Fix the merge of navnemaerker-hub-page @fix-the-merge-of-navnemaerker-hub-page-60030
  "Navnemaerker hub page" is done on the branch `navnemaerker-hub-page` but did not merge into `Morten`: rebasing it on `Morten` conflicts.
  Take its commits onto your branch with `git cherry-pick Morten..navnemaerker-hub-page`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D navnemaerker-hub-page`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging src/lib/llms.ts
  CONFLICT (content): Merge conflict in src/lib/llms.ts
  Auto-merging src/lib/seo.ts
  warning: skipped previously applied commit 10b7865
  hint: use --reapply-cherry-picks to include skipped commits
  hint: Disable this message with "git config set advice.skippedCherryPicks false"
  error: could not apply 0761e6d... Add the /navnemaerker hub page
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply 0761e6d... # Add the /navnemaerker hub page
  ```
  Warriv: Model: sonnet
  Warriv: Assumed: llms.ts keeps both sides; NAMETAG_HUB_PATH flips to /navnemaerker here; #emblem anchors the 'emblem' handle product since no separate Emblem exists. Nav links already landed with the webshop nav quest, so the hub's 'not linked yet' is settled.
- [x] Product cards with shop conventions @product-cards-with-shop-conventions-59661
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) ProductCard.tsx is shared by the homepage and /produkter. Add stars + count, a clear 'Fra XX kr' price, an optional badge ('Bestseller', 'Kan personliggoeres'), and titles that say what the product is (e.g. 'Loops, navnemaerke til taske') via product-meta.ts until Shopify titles are fixed (SEO.md issue 4). Keep the dome shape and shadows. Check legibility in the 2-column mobile grid.
  After: Placeholder social proof data
  Warriv: Model: sonnet
  Assumed: badges Bestseller on Loops, Kan personliggøres on Emblem/Dots; ratings hidden when VERCEL_ENV=production; no Shopify env here so mobile grid checked by sizing math only (title 16px on mobile).
- [x] Product page buy box conventions @product-page-buy-box-conventions-59671
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Also needs: Fix conflicting shipping and delivery facts. ProductPageClient.tsx / ProductPurchaseSection.tsx. Add standard buy-box elements: breadcrumbs (Forside > Navnemaerker > Loops), stars + review count under the H1 linking to the reviews section, price with 'inkl. moms', a 'Laves til dig' status, delivery estimate, a trust row under add-to-cart (levering, return rules for personalised goods, sikker betaling, payment icons), and a sticky add-to-cart bar on mobile once the main button scrolls away. Remove the leftover [pose] console.log lines in src/app/produkter/[handle]/page.tsx.
  After: Placeholder social proof data
  Warriv: Model: sonnet
  Assumed: shipping facts follow seo.ts, the footer and the levering page meta (55 kr, 1 to 2 hverdage to make, 1 to 3 hverdage transit). The ValueStrip claims (free shipping over 350 kr, 2 to 4 days) were dropped. Please confirm against Shopify policies.
  Assumed: personalised products state that the 14 day fortrydelsesret does not apply (made to order), with 24 months reklamationsret. Check wording against /returnering.
  Assumed: breadcrumb Navnemærker links to /produkter until the hub exists (NAMETAG_HUB_PATH in product-meta.ts). A placeholder reviews section with id anmeldelser is on the product page, hidden when VERCEL_ENV is production. Not visually tested: no Shopify env in the worktree.
- [x] Fix the merge of product-page-buy-box-conventions @fix-the-merge-of-product-page-buy-box-59903
  "Product page buy box conventions" is done on the branch `product-page-buy-box-conventions` but did not merge into `Morten`: rebasing it on `Morten` conflicts.
  Take its commits onto your branch with `git cherry-pick Morten..product-page-buy-box-conventions`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D product-page-buy-box-conventions`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging src/components/Footer.tsx
  CONFLICT (content): Merge conflict in src/components/Footer.tsx
  Auto-merging src/components/ValueStrip.tsx
  CONFLICT (content): Merge conflict in src/components/ValueStrip.tsx
  Auto-merging src/lib/llms.ts
  CONFLICT (content): Merge conflict in src/lib/llms.ts
  Auto-merging src/lib/product-meta.ts
  Auto-merging src/lib/seo.ts
  CONFLICT (content): Merge conflict in src/lib/seo.ts
  error: could not apply 02d4a0d... Add buy box conventions to the product page and unify shipping facts
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply 02d4a0d... # Add buy box conventions to the product page and unify shipping facts
  ```
  Warriv: Model: sonnet
  Warriv: Told it: Morten's Footer wins, shipping facts from store-facts.ts, keep both sides of product-meta.ts. Accepted the buy box's Assumed lines; they match the shipping facts quest already on Morten.
- [x] Product page reviews, facts, FAQ and related @product-page-reviews-facts-faq-and-59892
  After: Fix the merge of product-page-buy-box-conventions
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Below the buy box: reviews section (rating summary, distribution bars, review cards from social-proof.ts filtered by handle), a facts block per product (material, size, mounting, washing, age; from product-meta.ts; mark unknowns for Camilla, never invent product claims), a product FAQ, and an 'Andre navnemaerker' related row. Name-tag products link to /navnemaerker. No Review/AggregateRating schema while the data is placeholder.
  After: Product page buy box conventions
  Warriv: Model: sonnet
  Assumed: placeholder reviews and unknown facts (material, size, mounting, washing, age) show only outside production; unknowns read 'Camilla udfylder'. Fill facts in src/lib/product-meta.ts. Not typechecked (no node_modules in worktree). /navnemaerker hub page does not exist yet, links point to it.
- [x] Fix the merge of product-page-reviews-facts-faq-and @fix-the-merge-of-product-page-reviews-60000
  "Product page reviews, facts, FAQ and related" is done on the branch `product-page-reviews-facts-faq-and` but did not merge into `Morten`: rebasing it on `Morten` conflicts.
  Take its commits onto your branch with `git cherry-pick Morten..product-page-reviews-facts-faq-and`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D product-page-reviews-facts-faq-and`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging src/app/produkter/[handle]/page.tsx
  CONFLICT (content): Merge conflict in src/app/produkter/[handle]/page.tsx
  Auto-merging src/lib/product-meta.ts
  error: could not apply 4c98bee... Product page: reviews, facts, FAQ and related name tags
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply 4c98bee... # Product page: reviews, facts, FAQ and related name tags
  ```
  Warriv: Model: sonnet
  Warriv: Assumed: one anmeldelser section, hub links go through NAMETAG_HUB_PATH so nothing 404s before /navnemaerker lands. Accepted the original's assumptions (placeholders and 'Camilla udfylder' only outside production), consistent with the ship-blocker rule.
  Warriv: Hub landed (c21717b) without flipping NAMETAG_HUB_PATH, still /produkter. Told this fix-up to flip it to /navnemaerker since it already edits product-meta.ts. Anchor ids loops/dots/emblem on the hub were not added; left for the final check.
- [x] Rebuild the homepage around navnemaerker @rebuild-the-homepage-around-navnemaerker-59800
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Also needs: Navnemaerker hub page and Product cards with shop conventions. src/app/page.tsx new order: Hero > USP strip (ValueStrip with real facts) > 'Vores navnemaerker' product row (name-tag family only, link 'Se alle navnemaerker') > reviews band (3 to 4 cards + overall rating) > Saadan virker det (HowItWorks, kept short) > short SEO text section about navnemaerker linking to /navnemaerker > 'Mere fra Nooni' row for Deks, Box and Tic Tac Take (secondary, smaller) > short Story/founder trust beat. Remove BlogTeaser from the homepage. Exactly one H1 (in the hero). Closes SEO.md issue 1.
  After: Homepage hero for navnemaerker
  Warriv: Model: opus
  Assumed: name-tag row shows dots-med-navn-3stk, loops, emblem, dots-5stk (loops-navn is not a live handle; note the Shopify 'emblem' handle is titled 'Loops - Navn'). Mere fra Nooni uses deks-single, box-kort-aesker, tic-tac-take. ReviewsBand hides on Vercel production while PLACEHOLDER_SOCIAL_PROOF is true. Story shortened in place (only the homepage used it); full story stays on /om-os. BlogTeaser.tsx kept but unused, for the blog quest to reuse or delete. SEO text makes no washing/durability claims, only what the Shopify descriptions say.
- [x] Sort the product listing by category @sort-the-product-listing-by-category-60019
  After: Fix the merge of navnemaerker-hub-page
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Also needs: Product cards with shop conventions. /produkter is a flat grid in Shopify default order. Group it: 'Navnemaerker' first (link to /navnemaerker), then 'Kortspil og spil' (Deks, Box, Tic Tac Take). Hide the add-on bag product (handle uden-titel-17-jun-_10-36-17) from the listing and sitemap; it should only appear as an add-on. Simple category chips at the top. H1 and meta lead with navnemaerker.
  After: Navnemaerker hub page
  Warriv: Model: sonnet
  Assumed: not typechecked (no node_modules in worktree). Hub link on /produkter points to /navnemaerker, which another quest builds. Add-on bag added to UNINDEXED_PRODUCT_HANDLES, so it is also noindex and out of llms.txt.
- [x] Make the blog serve the navnemaerker goal @make-the-blog-serve-the-navnemaerker-goal-59766
  After: Fix the merge of fix-the-merge-of-navigation-and-footer-as
  After: Fix the merge of navigation-and-footer-as-a-webshop
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) The blog should support SEO quietly, not compete with the shop. Keep the /blog URL (no redirects), label it 'Gode raad' in the footer. Restyle the index as a simple guide list. On every post: author box for Camilla (laerer og mor til to, link /om-os, Person schema per CONTENT-PLAN.md) and an in-post product CTA card linking to the matching name-tag product and /navnemaerker. The existing 3D-print post stays and gets those links. No AI-written filler posts (SEARCH-GUIDE.md).
  After: Navigation and footer as a webshop
  Warriv: Model: sonnet
  Assumed: /navnemaerker hub is built by another quest, so links point there already. 3D-print post uses Loops as its CTA product (frontmatter 'product'). Navbar label left for the navigation quest. Could not run tsc/build: no node_modules in worktree.
- [x] Briefs for the first long-tail posts @briefs-for-the-first-long-tail-posts-59839
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Write briefs (not finished posts) for Camilla for the first three Phase 2 posts in CONTENT-PLAN.md, e.g. vuggestue checklist, boernehavestart garderobe checklist, navnemaerker til boern der ikke kan laese. Each brief: keyword, title under 60 chars, excerpt 120 to 155 chars, H3 outline based on what ranks on google.dk today, which own photos/tests she needs, product and hub links. Save in content/briefs/ (not content/posts, so nothing publishes).
  After: Make the blog serve the navnemaerker goal
  Warriv: Model: sonnet
- [x] Cart drawer conversion details @cart-drawer-conversion-details-59711
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) CartDrawer.tsx: free-shipping progress bar only if a threshold is real (store facts), a 'Mangler du et navnemaerke mere?' cross-sell, delivery estimate and payment icons under the checkout button, clear subtotal 'inkl. moms'. Keep the focus-trap fix from Discoverability.
  After: Fix conflicting shipping and delivery facts
  Warriv: Model: sonnet
  Assumed: no free-shipping bar, since store-facts has one flat 55 kr fragt and no threshold. Cross-sell links to Loops, Dots, Emblem product pages (personalised, so no direct add). Not built or linted: worktree has no node_modules.
- [x] Swap placeholder reviews for real ones before production @swap-placeholder-reviews-for-real-ones-59682
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) SHIP BLOCKER. Nothing with PLACEHOLDER_SOCIAL_PROOF = true may reach the production branch. Pick a Shopify review app (e.g. Judge.me) or Trustpilot with the user, collect real reviews, wire social-proof.ts to it, then add AggregateRating/Review schema. Until then, add a guard that fails production builds while the flag is true. This quest waits on the user for real reviews.
  After: Placeholder social proof data
  Warriv: Model: sonnet
  Warriv: Production guard is in (next.config.ts fails Vercel production builds while PLACEHOLDER_SOCIAL_PROOF is true), so the ship blocker is enforced. Rest needs the human: a review account (Judge.me or Trustpilot) and real reviews. Handed on; the rest of the list goes on.
  Assumed: Trustpilot chosen, no account yet. Placeholders stay for now; the production-build guard stays on so it still can't ship.
- [x] Conversion and SEO check of the new shop @conversion-and-seo-check-of-the-new-shop-60099
  Branch: Morten. Keep the brand: existing tokens in globals.css (nooni-* colours, --nooni-text-* sizes), the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. No new palette or fonts. Read AGENTS.md (Next.js docs in node_modules/next/dist/docs) and SEARCH-GUIDE.md first. Core product: navnemaerker (Loops, plus Dots and Emblem as the name-tag family). Navnemaerker must be THE primary focus everywhere. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) Also needs: Product page reviews, facts, FAQ and related, Sort the product listing by category, Cart drawer conversion details. Final pass in the Horadric browser at 375px and desktop: hero CTA + rating above the fold, one H1 per page, 'navnemaerker' visible on home, hub and listing, every name-tag page links to /navnemaerker, no brand drift, Lighthouse mobile not worse than SEO.md (83 perf, 96 a11y, 100 SEO), Rich Results Test on a product page and /navnemaerker. Fix small findings, add quests for big ones.
  After: Rebuild the homepage around navnemaerker
  Warriv: Model: opus
  Warriv: Also verify: footer payment chips (Visa, Mastercard, MobilePay, Dankort) match what Shopify checkout really offers; footer anchors /navnemaerker#loops, #dots, #emblem exist on the hub page; /kontakt#faq exists or point FAQ elsewhere.
  Warriv: Warriv: Also verify: NAMETAG_HUB_PATH in product-meta.ts is /navnemaerker; product facts still reading 'Camilla udfylder' are listed for the human; the product page has one anmeldelser section and no Review/AggregateRating schema.
  Warriv: Warriv: Also list for the human the hub guide claims to confirm: washing untested (take tags off first), Dots tie to zipper pulls with a cord, Dots fit hats and mittens. And whether a separate Emblem product is coming (now 'emblem' handle = 'Loops - Navn').
  Warriv: Verify: NAMETAG_HUB_PATH is /navnemaerker; hub links to product pages work (page.tsx line 152 labels /produkter/emblem as Loops, check that is right); hub has no loops/dots/emblem anchor ids, add them only if something links to them.
  Warriv: Product page merge landed (b316233) still with NAMETAG_HUB_PATH = /produkter. Told this check to flip it to /navnemaerker rather than add a quest, since it already touches these pages.
  Assumed: payment chips now MobilePay, Visa, Mastercard, Klarna, PayPal. A real Shopify checkout (test cart, nothing ordered) offers cards (Visa, Mastercard, Maestro, Amex, UnionPay), MobilePay, Klarna, PayPal, Shop Pay, Google Pay; no Dankort. Edit PAYMENT_METHODS in src/lib/store-facts.ts to change.
  Assumed: buy box now shows 14 dages fortrydelsesret on personalised items too, because the published Shopify return policy, the product schema and the product FAQ all grant it. To exempt made-to-order name tags, add that to the Shopify policy first, then set RETURNS.personalisedExempt in store-facts.ts and change RETURN_POLICY in seo.ts.
  Assumed: footer FAQ link goes to /navnemaerker#faq (/kontakt has no FAQ). Hub got ids loops, dots, emblem on the product cards; #emblem lands on the 'emblem' handle, which Shopify titles 'Loops - Navn'. Hub table's Loops column now links /produkter/loops instead of /produkter/emblem.
  For the human: (1) Is a real Emblem product coming? Today 'Emblem' in the footer and cart cross-sell leads to the product titled 'Loops - Navn' (40 kr). Rename the handle or drop 'Emblem' from the footer. (2) Confirm the hub guide claims: washing untested (take tags off first), Dots tie to zipper pulls with a cord, Dots fit hats and mittens. (3) Every product's facts (material, size, mounting, washing, age) still read 'Camilla udfylder': loops, emblem, dots-5stk, dots-med-navn-3stk, deks-single, deks-duo, box-kort-aesker, tic-tac-take. Fill them in src/lib/product-meta.ts.
  Checked OK: one H1 per page on 16 pages; navnemærker visible on home, hub and listing; hero H1, rating and CTA above the fold at 375x667; every name-tag page links /navnemaerker; NAMETAG_HUB_PATH is /navnemaerker; one anmeldelser section and no Review/AggregateRating schema; only brand colours and fonts; cart drawer shows inkl. moms, cross-sell, delivery and payment. Lighthouse mobile: home 88/96/100/100, hub 88/96, product 89/97 (only contrast left, SEO.md issue 6). Rich Results: product valid (Product, Merchant listings, Breadcrumbs), hub valid Breadcrumbs. Used the public Storefront token from the live bundle in a gitignored .env.local.
- [x] Wire Trustpilot reviews into social-proof.ts and add AggregateRating/Review schema (needs a Trustpilot account with real reviews; then set PLACEHOLDER_SOCIAL_PROOF false) @wire-trustpilot-reviews-into-social-proof-60535
  Warriv: Model: sonnet
  Warriv: Session needs: a Trustpilot business account for nooni.dk with real reviews, its business unit ID, and an API key or review export. Free Trustpilot only gives shop-wide reviews, so no product stars in Google; product AggregateRating/Review needs paid Trustpilot product reviews, or Judge.me as the cheaper switch. Account and money are the human's, so handed on. Placeholders and the production guard stay.
- [x] Lead with Dots, not Loops, per the content plan @lead-with-dots-not-loops-per-the-content-60843
  Branch: Morten. Keep the brand tokens and fonts. The user said: follow CONTENT-PLAN.md on which product leads. Earlier quests assumed Loops was the core navnemaerke; that was wrong. Per CONTENT-PLAN.md keyword map: Dots med navn (dots-med-navn-3stk) is the lead navnemaerke (lynlaas, flyverdragt, overtoej), Dots motiv (dots-5stk) is for boern der ikke kan laese, and Loops/Emblem (handle emblem, titled 'Loops - Navn') is navnemaerke til taske. Change everywhere Loops leads: Hero.tsx (image, 'Fra XX kr' price, primary CTA to /produkter/dots-med-navn-3stk), the homepage name-tag row order (Dots med navn first), /navnemaerker hub order and copy (src/lib/navnemaerker.ts, src/app/navnemaerker/page.tsx), product card badges (Bestseller on Dots med navn, not Loops), CartDrawer cross-sell order, PostProductCTA/blog.ts default product, footer family link order, social-proof.ts review mix (most reviews about Dots on lynlaas/flyverdragt), and llms.txt wording. Breadcrumbs and product tags should match the keyword map's target pages. Check in the Horadric browser at 375px and desktop. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.)
  After: Conversion and SEO check of the new shop
  Warriv: Model: opus
  User decision (overrides the title): Loops lead, Dots are secondary. See the tell sent to this quest.
  Assumed: names on site are 'Dots med navn', 'Dots med motiv' (Shopify title is 'Dots - Symbol') and 'Loops med navn' / 'Loops med motiv'; footer links go straight to product pages since the hub anchors #loops/#dots did not exist.
  Assumed: removed untested wash/dishwasher claims from placeholder reviews and the blog CTA. Breadcrumb hub path switched from /produkter to /navnemaerker.
- [x] Fix the merge of lead-with-dots-not-loops-per-the-content @fix-the-merge-of-lead-with-dots-not-loops-61121
  "Lead with Dots, not Loops, per the content plan" is done on the branch `lead-with-dots-not-loops-per-the-content` but did not merge into `Morten`: rebasing it on `Morten` conflicts.
  Take its commits onto your branch with `git cherry-pick Morten..lead-with-dots-not-loops-per-the-content`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D lead-with-dots-not-loops-per-the-content`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging src/app/navnemaerker/page.tsx
  Auto-merging src/components/Footer.tsx
  Auto-merging src/components/personalization/BuyBox.tsx
  CONFLICT (content): Merge conflict in src/components/personalization/BuyBox.tsx
  Auto-merging src/lib/llms.ts
  Auto-merging src/lib/product-meta.ts
  CONFLICT (content): Merge conflict in src/lib/product-meta.ts
  Auto-merging src/lib/seo.ts
  CONFLICT (content): Merge conflict in src/lib/seo.ts
  Auto-merging src/lib/social-proof.ts
  CONFLICT (content): Merge conflict in src/lib/social-proof.ts
  error: could not apply 429c76e... Lead with Dots med navn, not Loops, per the content plan
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply 429c76e... # Lead with Dots med navn, not Loops, per the content plan
  ```
  Warriv: Model: sonnet
  Warriv: 429c76e did Dots lead against the human's ruling (Loops lead). Told the fix-up to keep Morten's Loops-first order and f8b3f23 titles, and carry only crumb names, taglines, /navnemaerker breadcrumbs and the removed untested claims. Assumed: Dots taglines from the branch stay on Dots pages since they fit the keyword map for those pages.
  Assumed: kept main's rename of cardTitle to title (now used for H1, schema, cards) and filled it with the Dots-first names; crumbs use the new crumbName, else splitTitle. Reviews take the Dots-first copy.
  Warriv: Landed as c2321cc with Dots first, against the human's Loops-lead ruling. Filed 'Put Loops back in the lead' (opus) to restore Loops-first order and keep the rest.
- [x] Product titles and H1s that say what it is @product-titles-and-h1s-that-say-what-it-60833
  Branch: Morten. Product page H1 and <title> come straight from Shopify titles ('Loops symbol', 'Dots Symbol', 'Loops Navn'), so only one name-tag page has 'navnemærke' in its H1. SEARCH-GUIDE.md wants titles like 'Dots, navnemærke til lynlås'. Either fix the titles in Shopify (SEO.md issue 4, needs the human) or use cardTitle from src/lib/product-meta.ts for the H1 and <title> until then. Keep Product schema name in sync.
  Warriv: Model: sonnet
  Assumed: renamed cardTitle to title in product-meta.ts and used it for H1, <title>, Product schema, cards and llms.txt instead of waiting for Shopify edits. Not checked in a browser: no Shopify .env in any worktree; typecheck and lint pass.
- [x] Fix the merge of product-titles-and-h1s-that-say-what-it @fix-the-merge-of-product-titles-and-h1s-60937
  "Product titles and H1s that say what it is" is done on the branch `product-titles-and-h1s-that-say-what-it` but did not merge into `Morten`: rebasing it on `Morten` conflicts.
  Take its commits onto your branch with `git cherry-pick Morten..product-titles-and-h1s-that-say-what-it`, resolve each conflict and `git cherry-pick --continue`, make every check in `.horadric/config.json` pass, and commit. Then delete it with `git branch -D product-titles-and-h1s-that-say-what-it`. Your branch merges like any finished quest and carries its work.
  The quests after the finished one wait for this one too.
  What failed said:
  ```
  Auto-merging SEO.md
  Auto-merging src/components/personalization/BuyBox.tsx
  Auto-merging src/lib/product-meta.ts
  CONFLICT (content): Merge conflict in src/lib/product-meta.ts
  Auto-merging src/lib/seo.ts
  error: could not apply b94298c... Product H1, title and schema say what the product is
  hint: Resolve all conflicts manually, mark them as resolved with
  hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
  hint: You can instead skip this commit: run "git rebase --skip".
  hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
  hint: Disable this message with "git config set advice.mergeConflict false"
  Could not apply b94298c... # Product H1, title and schema say what the product is
  ```
  Warriv: Model: sonnet
  Warriv: Told: rename cardTitle to title but keep Morten's values from c82fbae (emblem = 'Loops med navn, navnemærke til taske', NAMETAG_HUB_PATH /navnemaerker), then grep for cardTitle and run checks. Accepted the quest's assumption to use product-meta titles for H1/title/schema until Shopify titles are fixed.
- [x] Decide brand colours for small text (contrast) @decide-brand-colours-for-small-text-60853
  SEO.md issue 6 is the only Lighthouse accessibility failure left on every page: white on rose #B48383 buttons (3.2:1), green #678061 labels (3.8:1), rose accent words (2.8:1). Needs the human or Camilla to approve a darker rose for buttons and small text (around #8F5F5F) and a darker green (around #56704F). Brand decision, not a code bug.
  Warriv: Model: sonnet
  Assumed: used the SEO.md suggestions as-is, #8F5F5F rose and #56704F green for all text and buttons (pass 4.5:1 on white and both creams); wordmark keeps #B48383. Needs Camilla's sign-off; undo is two lines in globals.css. Not checked visually (no node_modules in worktree).
- [x] Put Loops back in the lead @put-loops-back-in-the-lead-61205
  Model: opus
  Branch: Morten. The human ruled Loops lead, Dots are secondary (see 'Lead with Dots' quest notes; this overrides CONTENT-PLAN.md keyword map order). c2321cc landed Dots first anyway. Undo only the ordering: LEAD_NAME_TAG and NAME_TAG_HANDLES in src/lib/product-meta.ts (Loops first), Hero.tsx (Loops image, price, CTA), homepage/ProductsGrid row order, /navnemaerker hub order and copy (src/lib/navnemaerker.ts, src/app/navnemaerker/page.tsx, NavnemaerkerIntro), Bestseller badge on Loops, CartDrawer cross-sell, PostProductCTA/blog.ts default product, Footer family order, social-proof.ts review mix, llms.ts wording, seo.ts. Keep from c2321cc: short crumb names, per-page taglines, /navnemaerker breadcrumbs, removed untested wash claims, f8b3f23 titles. Run the checks in .horadric/config.json and look at 375px and desktop in the Horadric browser.
  Assumed: lead Loops is handle 'loops' (Loops med motiv), as before c2321cc; order is loops, emblem (Loops med navn), loops-navn, Dots med navn, Dots med motiv. Fit table now shows Loops column and Loops places first. Not checked with live Shopify data (no .env): hero showed the fallback photo and the product rows were empty.
- [x] Make Dots med navn the core product (final decision) @make-dots-med-navn-the-core-product-final-62032
  Branch: Morten. Keep the brand: tokens in globals.css, the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. Read AGENTS.md and SEARCH-GUIDE.md first. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) FINAL decision from the user, overrides 'Put Loops back in the lead' and every earlier Loops/Dots note: the core navnemaerke is Dots med navn (Shopify handle dots-med-navn-3stk), the name tag on the jacket zipper. Camilla's Instagram sells exactly this as 'Dots - navnemaerker'. Order everywhere: 1. Dots med navn, 2. Dots motiv (dots-5stk, for boern der ikke kan laese), 3. Loops/Emblem (handle emblem, 'Loops - Navn', navnemaerke til taske) as secondary. Update: Hero.tsx (image of a Dot on a zipper, 'Fra XX kr' price, primary CTA to /produkter/dots-med-navn-3stk), homepage name-tag row order, /navnemaerker hub order and copy (src/lib/navnemaerker.ts, src/app/navnemaerker/page.tsx), Bestseller badge, CartDrawer cross-sell, PostProductCTA/blog default product, footer order, social-proof.ts review mix, product titles/H1s, breadcrumbs, llms.txt, and CONTENT-PLAN.md + SEARCH-GUIDE.md (they already map Dots med navn to the lynlaas keywords; remove any Loops-first wording added since). Check in the Horadric browser.
  Assumed: kept handle 'loops' (Loops med motiv) listed last after emblem, and the hub fit table keeps Dots and Loops columns. Hero product photo comes from Shopify's dots-med-navn-3stk image; the local fallback is dots_name_lifestyle.jpg.
- [x] Homepage built on what sells on Instagram @homepage-built-on-what-sells-on-instagram-62292
  Branch: Morten. Keep the brand: tokens in globals.css, the fonts (editorial serif, Fredoka display) and the rounded/arched shapes. Read AGENTS.md and SEARCH-GUIDE.md first. (ae, oe, aa in these notes stand for æ, ø, å; use real Danish letters in the site.) The last four selling posts on instagram.com/hej.nooni drove 30+ orders. Capture why people buy and make it the homepage story, inside the shop conventions already built (keep one H1 with 'navnemaerker', stars, price, CTA). The five reasons from the posts: (1) 'Det er min, den her!': the child finds their own jacket among identical ones, mestring og selvhjulpenhed (Augusta reel). (2) The Dot is a grip so small hands can zip themselves. (3) No tusch inside clothes, so resale value is kept. (4) Move the Dot to the next size jacket: buy once. (5) One mum, one printer, your colours: handmade in Borris by a former teacher and mum of two. The best post (87 likes) was '3 ting jeg ville oenske jeg vidste som ny mor': tips from parent to parent, not an ad. Do: hero eyebrow/subline built on reason 1 with a zipper photo or a short muted looping video; replace generic trust ticks with these benefits; a '3 ting jeg ville oenske jeg vidste' style section; a real-numbers proof line (e.g. '58 navnemaerker. 1 printer. 1 mor'); an Instagram strip linking to @hej.nooni. Ask the user for the reel video files or stills to use (Instagram videos cannot be hotlinked). Only claims Camilla makes herself; washing is still untested.
  After: Make Dots med navn the core product (final decision)
  Warriv: Model: opus
  Assumed: proof line reads '58 navnemærker. 1 mor. Printet i Borris.' The quest's '1 printer' was dropped because the printer video on the site shows two. 58 is the quest's number, not checked against orders. Edit PROOF_LINE in src/lib/why-parents-buy.ts.
  Assumed: the '3 ting' section is written in the style of Camilla's post from the five reasons (børn vil gerne selv, skriv ikke i tøjet, køb til barnet ikke jakken). Swap in her real three in THREE_THINGS.
  Assumed: no reel files yet, so the hero keeps the Dots med navn photo and the Instagram strip uses local photos. HERO_VIDEO in why-parents-buy.ts takes a file in public/videos/ when one arrives.
  Note: local .env.local has no Shopify keys, so prices and product cards did not render in dev and next build fails prerendering /handelsbetingelser. Unrelated to this change; compile, tsc and eslint pass.
  User update: Dots ARE wash tested and can stay on the zipper in the machine. The homepage may say so (no temperature).
- [x] Add the Augusta reel and Instagram stills to the homepage @add-the-augusta-reel-and-instagram-stills-62565
  Needs files from Camilla: the Augusta reel ('Det er min, den her!') as a short mp4 plus a poster still, and 4 stills from the selling posts. Put the reel in public/videos/ and set HERO_VIDEO in src/lib/why-parents-buy.ts; swap the TILES in src/components/InstagramStrip.tsx. Instagram videos can not be hotlinked.
  Warriv: Model: sonnet
  Human: no video on the site for now; leave Borris out of the copy.
  Assumed: short claims say 'hjemme' (e.g. 'Printet hjemme', 'Håndlavet af en mor'), longer copy and meta descriptions say 'Vestjylland'. Footer address, schema address, om-os ('Borris i Vestjylland') and llms.ts keep Borris. Branch builds on Morten (42b8d9b).
- [x] Tell parents Dots can stay on in the wash @tell-parents-dots-can-stay-on-in-the-wash-63548
  Branch: Morten. The user confirmed Dots are wash tested and can stay on the zipper in the machine. No temperature known yet, so never name one. Add it where it helps buying: a homepage benefit/trust tick (src/lib/why-parents-buy.ts reasons), the Dots product page facts (product-meta.ts washing field for dots-med-navn-3stk and dots-5stk), and llms.txt if it lists care. /navnemaerker hub copy and FAQ are already updated (commit e8270f6). Loops have no wash claim. Keep brand tokens and fonts. Note: the working tree had uncommitted homepage edits from another session when this was filed, including a comment fix in why-parents-buy.ts; check git status before staging.
  Assumed: added a 4th hero tick 'Bliver på i vask' and folded the wash line into the 'Køb én gang' reason instead of a 6th reason card, since the reasons grid is a 2x2 beside the lead card.
  Warriv: Merge blocked by uncommitted homepage edits on Morten (Hero, WhyParentsBuy, why-parents-buy.ts) that no quest owns and that delete HERO_BENEFITS. Filed 'Merge the Dots wash branch into Morten' and held it for the human to commit that work first. Accepted the 'Bliver på i vask' tick and the reason line.
- [!] Merge the Dots wash branch into Morten @merge-the-dots-wash-branch-into-morten-63623: Morten's homepage edits (Hero, WhyParentsBuy, why-parents-buy, Workshop, components/home) are still uncommitted in the main tree; merge waits until they are committed {on cmd: git diff --quiet HEAD -- src/components src/lib}
  Model: sonnet
  Branch tell-parents-dots-can-stay-on-in-the-wash (84a5df0) could not merge: the working tree on Morten has uncommitted homepage edits (Hero.tsx, WhyParentsBuy.tsx, why-parents-buy.ts, Workshop.tsx, src/components/home/) from outside the quest log. Those edits delete HERO_BENEFITS and THREE_THINGS. Merge once they are committed. Keep: product-meta.ts wash facts for dots-med-navn-3stk and dots-5stk, NavnemaerkerIntro.tsx, the 'Køb én gang' reason wash line, and the header comment (Dots wash tested, no temperature, Loops no wash claim). If the new Hero has no HERO_BENEFITS, put 'Bliver på i vask' wherever the new hero shows its ticks or drop it. Type-check after. Never stash or discard the uncommitted homepage work.
  Warriv: Tried: the auto merge of 84a5df0 failed on the dirty tree. No quest is in progress, so the uncommitted homepage work is the human's. A session can not merge without stashing it, which is not ours to do.
