// Languages of the site. English is the original; the guide, the docs index,
// and the home page are translated (src/content/translations, synced from the
// language repo's localization/ folder). The specification, the roadmap, and
// the examples are English only, so translated pages link to the English ones.
//
// The URL prefix is the language repo's folder name (/bn, /heb); <html lang>
// uses the standard language tag ("he" for Hebrew).
import { getCollection } from "astro:content";

export const locales = ["en", "bn", "heb"] as const;
export type Locale = (typeof locales)[number];

export const localeInfo: Record<Locale, { lang: string; dir: "ltr" | "rtl"; prefix: string; name: string; og: string }> = {
  en: { lang: "en", dir: "ltr", prefix: "", name: "English", og: "en_US" },
  bn: { lang: "bn", dir: "ltr", prefix: "/bn", name: "বাংলা", og: "bn_BD" },
  heb: { lang: "he", dir: "rtl", prefix: "/heb", name: "עברית", og: "he_IL" },
};

/** The locale a path belongs to ("/heb/docs/trace" is Hebrew). */
export function localeOf(path: string): Locale {
  // Pages build as name.html, so the home page of /heb is /heb.html while building.
  const first = path.split("/")[1]?.replace(/\.html$/, "");
  return (locales as readonly string[]).includes(first) && first !== "en" ? (first as Locale) : "en";
}

/** The path without its locale prefix ("/heb/docs/trace" → "/docs/trace"). */
export function unlocalized(path: string): string {
  const { prefix } = localeInfo[localeOf(path)];
  return path.replace(/\.html$/, "").slice(prefix.length) || "/";
}

/** Pages that exist in every language: "/", "/docs", and each translated guide chapter. */
export async function translatedSlugs(): Promise<Map<Locale, Set<string>>> {
  const map = new Map<Locale, Set<string>>();
  for (const entry of await getCollection("translations")) {
    const [lang] = entry.id.split("/");
    const set = map.get(lang as Locale) ?? new Set<string>();
    set.add(entry.data.page);
    map.set(lang as Locale, set);
  }
  return map;
}

/** The same page in each language, where it exists. */
export async function alternates(path: string): Promise<Partial<Record<Locale, string>>> {
  const base = unlocalized(path);
  const slugs = await translatedSlugs();
  const out: Partial<Record<Locale, string>> = { en: base };
  for (const l of locales) {
    if (l === "en") continue;
    const p = localeInfo[l].prefix;
    const have = slugs.get(l);
    if (base === "/") out[l] = p;
    else if (base === "/docs" && have?.has("")) out[l] = `${p}/docs`;
    else {
      const m = base.match(/^\/docs\/([\w-]+)$/);
      if (m && have?.has(m[1])) out[l] = `${p}/docs/${m[1]}`;
    }
  }
  return out;
}

/** A docs link in this language: translated chapters stay in the language, the rest are English. */
export function docHref(locale: Locale, slug: string, translated: Set<string>): string {
  const p = localeInfo[locale].prefix;
  if (locale !== "en" && translated.has(slug)) return slug ? `${p}/docs/${slug}` : `${p}/docs`;
  return slug ? `/docs/${slug}` : "/docs";
}

const en = {
  skip: "Skip to content",
  home: "RuneScript home",
  mainNav: "Main",
  docs: "Docs",
  examples: "Examples",
  spec: "Specification",
  specLong: "Language specification",
  roadmap: "Roadmap",
  github: "RuneScript on GitHub",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  theme: "Theme",
  light: "Light",
  dark: "Dark",
  system: "Match system",
  language: "Language",
  inEnglish: "",
  // Footer
  footerTagline: "A strict, statically typed language with ActionScript roots. Implemented in Go.",
  footerMeta: "early development",
  learn: "Learn",
  reference: "Reference",
  project: "Project",
  gettingStarted: "Getting started",
  guide: "Guide",
  comingFromAs3: "Coming from ActionScript 3",
  diagnostics: "Diagnostics",
  sourceCode: "Source code",
  reportIssue: "Report an issue",
  // Docs
  menu: "Menu",
  documentation: "Documentation",
  docsTitle: "Documentation",
  breadcrumb: "Breadcrumb",
  filterPages: "Filter pages",
  overview: "Overview",
  sections: { Guide: "Guide", Reference: "Reference", Project: "Project" } as Record<string, string>,
  more: "More",
  previous: "Previous",
  next: "Next",
  pager: "Previous and next pages",
  suggestChange: "Suggest a change to this page",
  onThisPage: "On this page",
  // Client-side strings (src/lib/alpine.ts reads them from <html data-*>)
  copyCode: "Copy code",
  copied: "Copied",
  linkToSection: "Link to section:",
};

export type Strings = typeof en;

export const ui: Record<Locale, Strings> = {
  en,
  bn: {
    skip: "মূল লেখায় যান",
    home: "RuneScript-এর প্রথম পাতা",
    mainNav: "প্রধান",
    docs: "ডকস",
    examples: "উদাহরণ",
    spec: "স্পেসিফিকেশন",
    specLong: "ভাষার স্পেসিফিকেশন",
    roadmap: "রোডম্যাপ",
    github: "GitHub-এ RuneScript",
    openMenu: "মেনু খুলুন",
    closeMenu: "মেনু বন্ধ করুন",
    theme: "থিম",
    light: "হালকা",
    dark: "গাঢ়",
    system: "সিস্টেমের মতো",
    language: "ভাষা",
    inEnglish: "(ইংরেজিতে)",
    footerTagline: "ActionScript-এর শিকড় থেকে আসা একটি কঠোর, স্ট্যাটিক্যালি টাইপড ভাষা। Go-তে তৈরি।",
    footerMeta: "প্রাথমিক পর্যায়ে",
    learn: "শিখুন",
    reference: "রেফারেন্স",
    project: "প্রকল্প",
    gettingStarted: "শুরু করা",
    guide: "গাইড",
    comingFromAs3: "ActionScript 3 থেকে আসছেন?",
    diagnostics: "ডায়াগনস্টিক তালিকা",
    sourceCode: "সোর্স কোড",
    reportIssue: "সমস্যা জানান",
    menu: "মেনু",
    documentation: "ডকুমেন্টেশন",
    docsTitle: "ডকুমেন্টেশন",
    breadcrumb: "পাতার পথ",
    filterPages: "পাতা খুঁজুন",
    overview: "সূচিপত্র",
    sections: { Guide: "গাইড", Reference: "রেফারেন্স", Project: "প্রকল্প" },
    more: "আরও",
    previous: "আগের",
    next: "পরের",
    pager: "আগের ও পরের পাতা",
    suggestChange: "এই অনুবাদে সংশোধনের প্রস্তাব দিন",
    onThisPage: "এই পাতায়",
    copyCode: "কোড কপি করুন",
    copied: "কপি হয়েছে",
    linkToSection: "এই অংশের লিংক:",
  },
  heb: {
    skip: "דילוג לתוכן",
    home: "דף הבית של RuneScript",
    mainNav: "ראשי",
    docs: "תיעוד",
    examples: "דוגמאות",
    spec: "מפרט",
    specLong: "מפרט השפה",
    roadmap: "מפת דרכים",
    github: "RuneScript ב-GitHub",
    openMenu: "פתיחת התפריט",
    closeMenu: "סגירת התפריט",
    theme: "ערכת נושא",
    light: "בהירה",
    dark: "כהה",
    system: "לפי המערכת",
    language: "שפה",
    inEnglish: "(באנגלית)",
    footerTagline: "שפה קפדנית עם טיפוסים סטטיים ושורשים ב-ActionScript. ממומשת ב-Go.",
    footerMeta: "בשלבי פיתוח ראשונים",
    learn: "לימוד",
    reference: "עיון",
    project: "הפרויקט",
    gettingStarted: "מתחילים",
    guide: "המדריך",
    comingFromAs3: "למי שמגיע מ-ActionScript 3",
    diagnostics: "מדריך הודעות האבחון",
    sourceCode: "קוד המקור",
    reportIssue: "דיווח על בעיה",
    menu: "תפריט",
    documentation: "תיעוד",
    docsTitle: "תיעוד",
    breadcrumb: "נתיב ניווט",
    filterPages: "סינון דפים",
    overview: "תוכן העניינים",
    sections: { Guide: "המדריך", Reference: "עיון", Project: "הפרויקט" },
    more: "עוד",
    previous: "הקודם",
    next: "הבא",
    pager: "הדף הקודם והדף הבא",
    suggestChange: "הצעת תיקון לתרגום הזה",
    onThisPage: "בדף הזה",
    copyCode: "העתקת הקוד",
    copied: "הועתק",
    linkToSection: "קישור לסעיף:",
  },
};
