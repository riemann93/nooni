/**
 * Content for the /navnemaerker hub: which products are name tags,
 * where each one fits, the short guide and the FAQ.
 *
 * Kept out of the page so /llms.txt, /llms-full.txt and the FAQPage
 * JSON-LD say exactly what the page says.
 *
 * Only write what Camilla can stand behind (SEARCH-GUIDE.md: "Never
 * claim what we haven't tested"). Facts here come from the Shopify
 * product descriptions and the product photos. Washing is untested, so
 * the page says so. When the wash test is done, update WASHING and the
 * FAQ answer, and link the blog post.
 */

export const HUB_PATH = "/navnemaerker";

export interface NameTag {
  /** Shopify handle. Missing handles are skipped, so a renamed product never breaks the page. */
  handle: string;
  /** What it is, in parent words. Shown above the Shopify title on the card. */
  tagline: string;
}

/**
 * The name-tag family, in the order the grid shows them. Dots first:
 * they are the strongest fit for what parents search ("navnemærke til
 * lynlås", overtøj, flyverdragt).
 *
 * Handle "emblem" is the product titled "Loops - Navn" (SEO.md issue 4).
 * "loops-navn" is listed too so the page keeps working if the handle is
 * fixed in Shopify. A future Emblem product goes here as well.
 */
export const NAME_TAGS: NameTag[] = [
  { handle: "dots-med-navn-3stk", tagline: "Navn · lynlås" },
  { handle: "dots-5stk", tagline: "Symbol · lynlås" },
  { handle: "emblem", tagline: "Navn · taske" },
  { handle: "loops-navn", tagline: "Navn · taske" },
  { handle: "loops", tagline: "Symbol · taske" },
];

export const HUB_INTRO =
  "Navnemærker til lynlås, hue og taske, så dit barns ting ikke bliver forbyttet i institutionen. Med navn eller et symbol, som børn kan genkende, før de kan læse. 3D-printet af Camilla i Borris.";

/** "What fits where" rows. `dots` and `loops` say whether that product family fits. */
export interface FitRow {
  place: string;
  dots: boolean;
  loops: boolean;
  note: string;
}

export const FIT_ROWS: FitRow[] = [
  {
    place: "Lynlås på jakke og flyverdragt",
    dots: true,
    loops: false,
    note: "Dots bindes i lynlåsens trækker og bliver et bedre greb for små hænder.",
  },
  {
    place: "Hue og vanter",
    dots: true,
    loops: false,
    note: "Dots kan sættes fast i strikhuer, vanter og handsker.",
  },
  {
    place: "Skoletaske og rygsæk",
    dots: true,
    loops: true,
    note: "Dots på lynlåsen eller en Loop i stroppen. Begge ses tydeligt i garderoben.",
  },
  {
    place: "Pusletaske og penalhus",
    dots: false,
    loops: true,
    note: "Loops er en lille nøglering, der hænger i en strop eller et øje.",
  },
  {
    place: "Nøglebundt",
    dots: false,
    loops: true,
    note: "Loops sidder på nøgleringen, også til de voksne.",
  },
  {
    place: "Inde i tøjet (bodyer, strømper, skiftetøj)",
    dots: false,
    loops: false,
    note: "Her skal du bruge strygemærker eller klistermærker. Dem laver vi ikke.",
  },
];

/**
 * The short guide: what to mark for vuggestue and børnehave, how they
 * mount, washing. One entry per H3.
 */
export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export const GUIDE: GuideSection[] = [
  {
    heading: "Hvad skal mærkes til vuggestue og børnehave?",
    paragraphs: [
      "Alt, der hænger i garderoben, og alt, der kan ligne de andre børns. Det er især overtøjet: tolv ens flyverdragter på en række er der, hvor tingene bliver forbyttet.",
      "Spørg altid institutionen, om de har deres egen liste. De fleste vil gerne have, at det hele er mærket.",
    ],
    list: [
      "Flyverdragt, regntøj og jakke: et navnemærke på lynlåsen",
      "Hue, vanter og halsedisse",
      "Taske eller rygsæk",
      "Skiftetøj, bodyer og strømper: stryge- eller klistermærker",
    ],
  },
  {
    heading: "Navn eller symbol?",
    paragraphs: [
      "Til de mindste giver et symbol mest mening. Et barn i vuggestuen kan ikke læse sit navn, men kender hurtigt sin egen blomst, pote eller sky. Navnet er til de voksne, til pædagogerne og til børn, der er begyndt at kende bogstaverne.",
      "Mange vælger symbol til overtøjet og navn til tasken.",
    ],
  },
  {
    heading: "Sådan sætter du dem på",
    paragraphs: [
      "Dots sidder på en snor. Før snoren gennem hullet i lynlåsens trækker og træk den stramt om sig selv. Så sidder mærket fast og hænger lige der, hvor barnet tager fat for at lyne.",
      "Loops er en lille nøglering. Den hænger du i en strop, et øje på tasken eller på nøglebundtet.",
    ],
  },
  {
    heading: "Vask",
    paragraphs: [
      "Dots og Loops er 3D-printet i plast. Vi har ikke lavet en vasketest, vi kan stå inde for, så vi lover ikke noget om vaskemaskinen endnu. Tag mærket af, inden tøjet skal vaskes. Vasketesten er på vej, og resultatet kommer her.",
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQ shown on the page and sent as FAQPage JSON-LD. Plain text only. */
export const FAQ: FaqItem[] = [
  {
    question: "Hvad er Noonis navnemærker?",
    answer:
      "Små personlige mærker, der hænger udenpå tingene i stedet for at sidde inde i tøjet. Dots sættes på lynlåsen, huen eller vanterne. Loops er en lille nøglering til tasken eller nøglebundtet. Du vælger navn eller symbol og selv farverne.",
  },
  {
    question: "Hvor sætter man Dots?",
    answer:
      "På lynlåsen på jakken, flyverdragten, regntøjet eller tasken. Snoren føres gennem hullet i lynlåsens trækker og trækkes stramt. Dots kan også sættes fast i strikhuer, vanter og handsker.",
  },
  {
    question: "Hvad hvis mit barn ikke kan læse endnu?",
    answer:
      "Så vælg Dots eller Loops med symbol, for eksempel en blomst, en pote, et hjerte, en sky eller kirsebær. Børn genkender deres eget symbol længe før de kan læse deres navn.",
  },
  {
    question: "Hvor mange bogstaver kan der være på et navnemærke?",
    answer:
      "Op til 12 tegn. Det rækker til de fleste fornavne, et efternavn eller initialer.",
  },
  {
    question: "Kan navnemærkerne komme i vaskemaskinen?",
    answer:
      "Det har vi ikke testet grundigt nok til at love det. Tag mærket af, inden tøjet skal vaskes. Vi er ved at lave en vasketest og skriver resultatet her.",
  },
  {
    question: "Hjælper Dots mit barn med at lyne selv?",
    answer:
      "Ja, det er en af grundene til, at de findes. Mærket fungerer som en forlænger på lynlåsen, så små hænder får et bedre greb. Camilla er uddannet lærer og går meget op i, at børn kan og tør selv.",
  },
  {
    question: "Laver I strygemærker eller klistermærker?",
    answer:
      "Nej. Til tøj indvendigt, som bodyer, strømper og skiftetøj, skal du bruge strygemærker eller klistermærker fra en anden butik. Noonis navnemærker er til det, der hænger udenpå: overtøj, huer, vanter og tasker.",
  },
  {
    question: "Hvordan bliver navnemærkerne lavet?",
    answer:
      "Camilla designer dem selv og 3D-printer hvert mærke hjemme i Borris i Vestjylland, i de farver og med det navn eller symbol, du vælger.",
  },
];
