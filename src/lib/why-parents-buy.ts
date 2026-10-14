/**
 * Why parents buy: the homepage story, taken from the Instagram posts
 * on @hej.nooni that actually sold Dots (the last four selling posts
 * drove 30+ orders). One place for the copy, so Camilla can check it
 * in one file.
 *
 * Rules for this file:
 *   - Only claims Camilla makes herself in her posts. Washing is still
 *     untested, so nothing here says the tags survive the machine.
 *   - Copy is parent to parent, in Camilla's voice where it says "jeg".
 *     The best post was tips, not an ad, and the page should read the
 *     same way.
 *
 * TO CHECK WITH CAMILLA (see the quest notes):
 *   - PROOF_LINE: "58 navnemærker" is the number given in the quest,
 *     not checked against Shopify orders. The quest suggested
 *     "1 printer", but the printer video shows two, so it is left out.
 *   - THREE_THINGS is written in the style of her "3 ting jeg ville
 *     ønske jeg vidste som ny mor" post from the five reasons below.
 *     Swap in her own three when she has them.
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

/** The three reasons short enough for the hero's benefit ticks. */
export const HERO_BENEFITS = ["Ingen tusch i tøjet", "Flyttes med til næste jakke", "Håndlavet af en mor"];

export interface Tip {
  title: string;
  body: string;
}

/** Parent-to-parent tips, in Camilla's voice. See TO CHECK above. */
export const THREE_THINGS: Tip[] = [
  {
    title: "Børn vil gerne selv",
    body: "Et barn, der kan finde sin egen jakke og lyne den selv, går stolt ud ad døren. Giv dem noget at tage fat i, og lad dem prøve.",
  },
  {
    title: "Skriv ikke i tøjet",
    body: "Tusch i nakken af en flyverdragt bliver der. Hæng navnet udenpå i stedet, så tøjet kan gå videre til den næste.",
  },
  {
    title: "Køb til barnet, ikke til jakken",
    body: "Børn vokser ud af tøjet hvert år. Et mærke, der kan flyttes, følger med fra størrelse til størrelse.",
  },
];

/** Real numbers, short. See TO CHECK above. */
export const PROOF_LINE = ["58 navnemærker", "1 mor", "Printet hjemme"];

