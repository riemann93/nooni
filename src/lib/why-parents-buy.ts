/**
 * Why parents buy: the homepage story, taken from the Instagram posts
 * on @hej.nooni that actually sold Dots (the last four selling posts
 * drove 30+ orders). One place for the copy, so Camilla can check it
 * in one file.
 *
 * Rules for this file:
 *   - Only claims Camilla makes herself in her posts. Dots are wash
 *     tested and can stay on in the machine (owner, 2026-10-14). Name
 *     no temperature until Camilla gives one.
 *   - Copy is parent to parent, in Camilla's voice where it says "jeg".
 *     The best post was tips, not an ad, and the page should read the
 *     same way.
 *
 * TO CHECK WITH CAMILLA (see the quest notes):
 *   - PROOF_LINE: "58 navnemærker" is the number given in the quest,
 *     not checked against Shopify orders. The quest suggested
 *     "1 printer", but the printer video shows two, so it is left out.
 */

export const INSTAGRAM_HANDLE = "hej.nooni";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export interface Reason {
  key: string;
  title: string;
  body: string;
}

/** The five reasons, in the order they matter to parents. */
export const REASONS: Reason[] = [
  {
    key: "min",
    title: "„Det er min, den her!“",
    body: "Ti ens flyverdragter i garderoben, og dit barn finder selv sin egen. Det er mestring, og det er en lille sejr hver morgen.",
  },
  {
    key: "greb",
    title: "Et greb til små hænder",
    body: "Dots sidder på lynlåsens trækker og giver noget at tage fat i, så barnet kan lyne selv.",
  },
  {
    key: "tusch",
    title: "Ingen tusch i tøjet",
    body: "Navnet hænger udenpå, ikke skrevet inde i tøjet. Så kan jakken sælges videre, når barnet er vokset fra den.",
  },
  {
    key: "flyt",
    title: "Køb én gang",
    body: "Når jakken bliver for lille, flytter du mærket over på den næste.",
  },
  {
    key: "mor",
    title: "Én mor, dine farver",
    body: "Hvert mærke er designet og printet til dit barn hjemme hos Camilla, uddannet lærer og mor til to.",
  },
];

/** Real numbers, short. See TO CHECK above. */
export const PROOF_LINE = ["58 navnemærker", "1 mor", "Printet hjemme"];

