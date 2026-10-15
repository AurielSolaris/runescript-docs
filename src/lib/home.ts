// The home page's text in each language (see src/components/Home.astro).
// Strings marked "html" may contain <code>; <bdi> keeps code-like text in
// order inside right-to-left sentences.
import type { Locale } from "./i18n";

export interface HomeCopy {
  /** <title>, and the meta description. */
  title: string;
  description: string;
  status: string; // "{version}" is replaced
  statusNote: string;
  heading: string;
  lede: string; // html
  getStarted: string;
  readGuide: string;
  facts: [string, string][];
  tabsLabel: string;
  outputOf: string; // "{file}" is replaced
  featuresTitle: string;
  featuresLede: string;
  features: { title: string; body: string }[];
  diagBadge: string;
  diagTitle: string;
  diagBody: string; // html
  diagChecks: string[]; // html
  diagMore: string;
  diagLabel: string;
  as3Title: string;
  as3Lede: string; // html
  tableLabel: string;
  tableCaption: string;
  tableHead: string[];
  tableRows: string[][]; // html
  as3More: string;
  statusTitle: string;
  statusLede: string;
  worksNow: string;
  planned: string;
  works: string[]; // html
  plannedItems: string[];
  roadmap: string;
  startTitle: string;
  startLede: string;
  steps: string[];
  stepLabels: string[]; // "{file}" is replaced
  startGuide: string;
  browseExamples: string;
}

const en: HomeCopy = {
  title: "",
  description: "",
  status: "v{version} in progress",
  statusNote: "Early development",
  heading: "A strict, statically typed language with ActionScript roots",
  lede: `RuneScript keeps ActionScript's <code>package</code>, <code>trace</code>, <code>int</code>/<code>uint</code>,
    <code>try</code>/<code>catch</code> and access modifiers, moves to a C-family syntax, and checks every type
    before your program runs. It runs as a standalone CLI implemented in Go, and compiles to a JavaScript module for
    the web with the same strict typing.`,
  getStarted: "Get started",
  readGuide: "Read the guide",
  facts: [
    ["Implemented in", "Go 1.25+"],
    ["Typing", "Static, explicit"],
    ["Runs as", "CLI or JavaScript"],
  ],
  tabsLabel: "Example programs",
  outputOf: "Output of {file}",
  featuresTitle: "Familiar shape, stricter rules",
  featuresLede: "If you've written ActionScript, Java, C# or TypeScript, RuneScript reads the way you expect. It just refuses to guess.",
  features: [
    {
      title: "Types first, C-family syntax",
      body: "Write public int add(int a, int b). Every function starts with an access modifier, types come before names, and semicolons are required.",
    },
    {
      title: "Strict by default",
      body: "Nothing is implicitly any. Signed and unsigned integers never mix silently, and conditions must be bool.",
    },
    {
      title: "No silent overflow",
      body: "Integer arithmetic is exact. Overflow and division by zero stop the program with a located runtime error instead of wrapping.",
    },
    {
      title: "Errors that point at the problem",
      body: "Every diagnostic has a stable code, a line and column, the source line with a caret, and help text that says how to fix it.",
    },
    {
      title: "Functions as values",
      body: "Function types like int(int, int), lambdas, callbacks, nested functions, prototypes, and functions that return functions.",
    },
    {
      title: "Docs that compile",
      body: "Every program in the guide is compiled by the test suite, and every example's output is checked. If the docs drift, the build fails.",
    },
  ],
  diagBadge: "Rejected at compile time",
  diagTitle: "Mistakes surface before the program runs",
  diagBody: `Assigning a signed value to a <code>uint</code> is a compile-time error, not a silent wraparound. The checker tells
    you exactly where, and what to do about it.`,
  diagChecks: [
    "Stable error codes, such as <code>ASX-TYPE-004</code>",
    "<code>line:col</code> positions, with the source line and a caret",
    "Help text with a concrete fix",
  ],
  diagMore: "Browse every error code",
  diagLabel: "Compiler diagnostics",
  as3Title: "Coming from ActionScript 3",
  as3Lede: "RuneScript is inspired by AS3 but isn't source-compatible with it. Declarations put the type first, and there's no <code>function</code> or <code>var</code>.",
  tableLabel: "Table: how AS3 and RuneScript treat integers",
  tableCaption: "How AS3 and RuneScript treat integers",
  tableHead: ["Code", "ActionScript 3", "RuneScript"],
  tableRows: [
    ["<code>var u:uint = -1;</code>", "Becomes 4294967295", "Compile error <code>ASX-TYPE-007</code>"],
    ["<code>uint</code> ← <code>int</code> variable", "Converted silently", "Compile error <code>ASX-TYPE-004</code>"],
    ["<code>int + uint</code>", "Converted silently", "Compile error <code>ASX-TYPE-011</code>"],
    ["<code>int.MAX_VALUE + 1</code>", "Wraps to a negative number", "Runtime error <code>ASX-RUN-002</code>"],
    ["<code>7 / 2</code>", "<code>3.5</code>", "<code>3</code> (integer division)"],
  ],
  as3More: "Full comparison",
  statusTitle: "Where it stands",
  statusLede: "RuneScript is small on purpose. A feature counts as done only when tests show it working.",
  worksNow: "Works now",
  planned: "Planned",
  works: [
    "Packages and access-modified functions",
    "int / sint, uint, float / float32 / float64, bool, string, void",
    "if, while, for, break, continue, return",
    "Function types, lambdas, callbacks",
    'use "std:string" (Go\'s strings package)',
    'Multi-file programs: use "pkg" and use "./file"',
    'Checked conversions: (int) 64.3, (float) "64.7"',
    "throw, try / catch / finally, catchable runtime errors",
    "Located compile-time and runtime errors",
    "Compiles to JavaScript (runescript build)",
  ],
  plannedItems: ["Classes and structs", "Arrays", "String concatenation", "std:math", "Native graphics package"],
  roadmap: "See the roadmap",
  startTitle: "Run your first program",
  startLede: "You need Go 1.25 or newer. Build the CLI, then run any example.",
  steps: ["Get the source", "Build the CLI", "Run a program"],
  stepLabels: ["Clone the repository", "Build", "Run {file}"],
  startGuide: "Read the guide",
  browseExamples: "Browse examples",
};

const bn: HomeCopy = {
  title: "RuneScript: ActionScript-এর শিকড় থেকে আসা একটি স্ট্যাটিক্যালি টাইপড ভাষা",
  description:
    "RuneScript হলো ActionScript থেকে অনুপ্রাণিত, Go-তে তৈরি একটি কঠোর, স্ট্যাটিক্যালি টাইপড, সাধারণ-উদ্দেশ্যের প্রোগ্রামিং ভাষা: অবস্থানসহ এরর, নিঃশব্দ ওভারফ্লো নেই, যাচাই করা রূপান্তর, আর একই নিয়মের JavaScript টার্গেট।",
  status: "v{version} তৈরি হচ্ছে",
  statusNote: "প্রাথমিক পর্যায়ে",
  heading: "ActionScript-এর শিকড় থেকে আসা একটি কঠোর, স্ট্যাটিক্যালি টাইপড ভাষা",
  lede: `RuneScript ActionScript-এর <code>package</code>, <code>trace</code>, <code>int</code>/<code>uint</code>,
    <code>try</code>/<code>catch</code> ও অ্যাক্সেস মডিফায়ার ধরে রাখে, সিনট্যাক্স নিয়ে আসে C-পরিবারের ধাঁচে, আর
    প্রোগ্রাম চলার আগেই প্রতিটি টাইপ যাচাই করে। এটি Go-তে তৈরি একটি স্বতন্ত্র CLI হিসেবে চলে, এবং একই কঠোর
    টাইপিং বজায় রেখে ওয়েবের জন্য একটি JavaScript মডিউলে কম্পাইল হয়।`,
  getStarted: "শুরু করুন",
  readGuide: "গাইড পড়ুন",
  facts: [
    ["যে ভাষায় তৈরি", "Go 1.25+"],
    ["টাইপিং", "স্ট্যাটিক, স্পষ্ট"],
    ["যেভাবে চলে", "CLI বা JavaScript"],
  ],
  tabsLabel: "উদাহরণ প্রোগ্রাম",
  outputOf: "{file}-এর আউটপুট",
  featuresTitle: "চেনা গড়ন, আরও কঠোর নিয়ম",
  featuresLede: "ActionScript, Java, C# বা TypeScript লিখে থাকলে RuneScript ঠিক আপনার প্রত্যাশামতো পড়া যায়। শুধু এটি অনুমান করতে রাজি নয়।",
  features: [
    {
      title: "আগে টাইপ, C-পরিবারের সিনট্যাক্স",
      body: "লিখুন public int add(int a, int b)। প্রতিটি ফাংশন শুরু হয় একটি অ্যাক্সেস মডিফায়ার দিয়ে, টাইপ বসে নামের আগে, আর সেমিকোলন বাধ্যতামূলক।",
    },
    {
      title: "শুরু থেকেই কঠোর",
      body: "কোনো কিছুই নিজে থেকে any নয়। সাইনড ও আনসাইনড পূর্ণসংখ্যা কখনো নিঃশব্দে মেশে না, আর শর্তকে অবশ্যই bool হতে হবে।",
    },
    {
      title: "নিঃশব্দ ওভারফ্লো নেই",
      body: "পূর্ণসংখ্যার হিসাব নির্ভুল। ওভারফ্লো আর শূন্য দিয়ে ভাগ ঘুরে না গিয়ে, অবস্থানসহ একটি রানটাইম এরর দিয়ে প্রোগ্রাম থামিয়ে দেয়।",
    },
    {
      title: "যে এরর সমস্যাটি দেখিয়ে দেয়",
      body: "প্রতিটি ডায়াগনস্টিকে আছে একটি স্থায়ী কোড, লাইন ও কলাম, ক্যারেট-চিহ্নসহ সোর্সের লাইনটি, আর কীভাবে ঠিক করবেন তা বলে দেওয়া সাহায্য-বার্তা।",
    },
    {
      title: "মান হিসেবে ফাংশন",
      body: "int(int, int)-এর মতো ফাংশন টাইপ, ল্যাম্বডা, কলব্যাক, নেস্টেড ফাংশন, প্রোটোটাইপ, এবং যে ফাংশন ফাংশন ফেরত দেয়।",
    },
    {
      title: "যে ডকস কম্পাইল হয়",
      body: "গাইডের প্রতিটি প্রোগ্রাম টেস্ট-সংগ্রহ কম্পাইল করে, আর প্রতিটি উদাহরণের আউটপুট যাচাই করা হয়। ডকস কোড থেকে সরে গেলে বিল্ড ব্যর্থ হয়।",
    },
  ],
  diagBadge: "কম্পাইলের সময় প্রত্যাখ্যাত",
  diagTitle: "প্রোগ্রাম চলার আগেই ভুল ধরা পড়ে",
  diagBody: `একটি সাইনড মান <code>uint</code>-এ অ্যাসাইন করা কম্পাইলের সময়ের এরর, নিঃশব্দে ঘুরে যাওয়া নয়। চেকার ঠিক
    কোথায় সমস্যা, আর কী করতে হবে, তা জানিয়ে দেয়।`,
  diagChecks: [
    "স্থায়ী এরর কোড, যেমন <code>ASX-TYPE-004</code>",
    "<code>line:col</code> অবস্থান, সোর্সের লাইন ও একটি ক্যারেট-চিহ্নসহ",
    "নির্দিষ্ট সমাধানসহ সাহায্য-বার্তা",
  ],
  diagMore: "সব এরর কোড দেখুন",
  diagLabel: "কম্পাইলারের ডায়াগনস্টিক",
  as3Title: "ActionScript 3 থেকে আসছেন?",
  as3Lede: "RuneScript AS3 থেকে অনুপ্রাণিত, কিন্তু সোর্স-স্তরে এর সঙ্গে সামঞ্জস্যপূর্ণ নয়। ঘোষণায় টাইপ আগে আসে, আর কোনো <code>function</code> বা <code>var</code> নেই।",
  tableLabel: "সারণি: AS3 ও RuneScript পূর্ণসংখ্যাকে কীভাবে সামলায়",
  tableCaption: "AS3 ও RuneScript পূর্ণসংখ্যাকে কীভাবে সামলায়",
  tableHead: ["কোড", "ActionScript 3", "RuneScript"],
  tableRows: [
    ["<code>var u:uint = -1;</code>", "হয়ে যায় 4294967295", "কম্পাইল এরর <code>ASX-TYPE-007</code>"],
    ["<code>uint</code> ← <code>int</code> ভেরিয়েবল", "নিঃশব্দে রূপান্তরিত হয়", "কম্পাইল এরর <code>ASX-TYPE-004</code>"],
    ["<code>int + uint</code>", "নিঃশব্দে রূপান্তরিত হয়", "কম্পাইল এরর <code>ASX-TYPE-011</code>"],
    ["<code>int.MAX_VALUE + 1</code>", "ঘুরে একটি ঋণাত্মক সংখ্যা হয়ে যায়", "রানটাইম এরর <code>ASX-RUN-002</code>"],
    ["<code>7 / 2</code>", "<code>3.5</code>", "<code>3</code> (পূর্ণসংখ্যার ভাগ)"],
  ],
  as3More: "পুরো তুলনা",
  statusTitle: "এখন কোথায় দাঁড়িয়ে",
  statusLede: "RuneScript ইচ্ছে করেই ছোট। কোনো বৈশিষ্ট্য তখনই সম্পূর্ণ ধরা হয়, যখন টেস্ট দেখায় যে সেটি কাজ করে।",
  worksNow: "এখন কাজ করে",
  planned: "পরিকল্পিত",
  works: [
    "প্যাকেজ, আর অ্যাক্সেস মডিফায়ারসহ ফাংশন",
    "int / sint, uint, float / float32 / float64, bool, string, void",
    "if, while, for, break, continue, return",
    "ফাংশন টাইপ, ল্যাম্বডা, কলব্যাক",
    'use "std:string" (Go-র strings প্যাকেজ)',
    'একাধিক ফাইলের প্রোগ্রাম: use "pkg" ও use "./file"',
    'যাচাই করা রূপান্তর: (int) 64.3, (float) "64.7"',
    "throw, try / catch / finally, ধরা যায় এমন রানটাইম এরর",
    "অবস্থানসহ কম্পাইল-টাইম ও রানটাইম এরর",
    "JavaScript-এ কম্পাইল (runescript build)",
  ],
  plannedItems: ["ক্লাস ও স্ট্রাক্ট", "অ্যারে", "স্ট্রিং জোড়া লাগানো", "std:math", "নেটিভ গ্রাফিক্স প্যাকেজ"],
  roadmap: "রোডম্যাপ দেখুন (ইংরেজিতে)",
  startTitle: "আপনার প্রথম প্রোগ্রাম চালান",
  startLede: "আপনার Go 1.25 বা নতুনতর লাগবে। CLI তৈরি করুন, তারপর যেকোনো উদাহরণ চালান।",
  steps: ["সোর্স নিন", "CLI তৈরি করুন", "একটি প্রোগ্রাম চালান"],
  stepLabels: ["রিপোজিটরি ক্লোন করুন", "বিল্ড", "{file} চালান"],
  startGuide: "গাইড পড়ুন",
  browseExamples: "উদাহরণ দেখুন (ইংরেজিতে)",
};

const heb: HomeCopy = {
  title: "RuneScript: שפה עם טיפוסים סטטיים ושורשים ב-ActionScript",
  description:
    "RuneScript היא שפת תכנות קפדנית לשימוש כללי, עם טיפוסים סטטיים, בהשראת ActionScript וממומשת ב-Go: שגיאות עם מיקום מדויק, בלי גלישה שקטה, המרות בדוקות, ויעד JavaScript עם אותם כללים.",
  status: "גרסה {version} בפיתוח",
  statusNote: "בשלבי פיתוח ראשונים",
  heading: "שפה קפדנית עם טיפוסים סטטיים ושורשים ב-ActionScript",
  lede: `RuneScript שומרת על <code>package</code>, <code>trace</code>, <code>int</code>/<code>uint</code>,
    <code>try</code>/<code>catch</code> ומשני הגישה של ActionScript, עוברת לתחביר ממשפחת C, ובודקת כל טיפוס עוד
    לפני שהתוכנית רצה. היא רצה ככלי שורת פקודה עצמאי שממומש ב-Go, ואפשר להדר אותה למודול JavaScript לרשת, עם
    אותה הקפדה על טיפוסים.`,
  getStarted: "מתחילים",
  readGuide: "לקריאת המדריך",
  facts: [
    ["ממומשת ב-", "Go 1.25+"],
    ["טיפוסים", "סטטיים ומפורשים"],
    ["רצה כ-", "CLI או JavaScript"],
  ],
  tabsLabel: "תוכניות לדוגמה",
  outputOf: "הפלט של {file}",
  featuresTitle: "צורה מוכרת, כללים קפדניים יותר",
  featuresLede: "אם כתבתם ב-ActionScript, ב-Java, ב-C# או ב-TypeScript, קוד RuneScript ייקרא כמו שאתם מצפים. היא פשוט מסרבת לנחש.",
  features: [
    {
      title: "קודם הטיפוס, תחביר ממשפחת C",
      body: "כותבים <bdi>public int add(int a, int b)</bdi>. כל פונקציה מתחילה במשנה גישה, הטיפוסים באים לפני השמות, ונקודה-פסיק היא חובה.",
    },
    {
      title: "קפדנית כברירת מחדל",
      body: "שום דבר אינו <bdi>any</bdi> במרומז. מספרים שלמים עם סימן ובלי סימן לעולם אינם מתערבבים בשקט, ותנאים חייבים להיות <bdi>bool</bdi>.",
    },
    {
      title: "בלי גלישה שקטה",
      body: "החשבון במספרים שלמים מדויק. גלישה וחלוקה באפס עוצרות את התוכנית עם שגיאת זמן ריצה שמצביעה על המקום, במקום להתגלגל.",
    },
    {
      title: "שגיאות שמצביעות על הבעיה",
      body: "לכל הודעת אבחון יש קוד קבוע, שורה ועמודה, שורת הקוד עם סמן מתחת לבעיה, וטקסט עזרה שמסביר איך לתקן.",
    },
    {
      title: "פונקציות כערכים",
      body: "טיפוסי פונקציה כמו <bdi>int(int, int)</bdi>, ביטויי למבדה, callbacks, פונקציות מקוננות, אבות-טיפוס, ופונקציות שמחזירות פונקציות.",
    },
    {
      title: "תיעוד שמתקמפל",
      body: "חבילת הבדיקות מקמפלת כל תוכנית במדריך, והפלט של כל דוגמה נבדק. אם התיעוד מתרחק מהקוד, הבנייה נכשלת.",
    },
  ],
  diagBadge: "נדחה בזמן ההידור",
  diagTitle: "טעויות מתגלות לפני שהתוכנית רצה",
  diagBody: `השמה של ערך עם סימן ל-<code>uint</code> היא שגיאת הידור, לא גלגול שקט. הבודק אומר בדיוק איפה, ומה
    לעשות.`,
  diagChecks: [
    "קודי שגיאה קבועים, כמו <code>ASX-TYPE-004</code>",
    "מיקומי <code>line:col</code>, עם שורת הקוד וסמן",
    "טקסט עזרה עם תיקון מוחשי",
  ],
  diagMore: "לכל קודי השגיאה",
  diagLabel: "הודעות האבחון של המהדר",
  as3Title: "למי שמגיע מ-ActionScript 3",
  as3Lede: "RuneScript שואבת השראה מ-AS3 אבל אינה תואמת לה ברמת קוד המקור. בהצהרות הטיפוס בא קודם, ואין <code>function</code> או <code>var</code>.",
  tableLabel: "טבלה: איך AS3 ו-RuneScript מתייחסות למספרים שלמים",
  tableCaption: "איך AS3 ו-RuneScript מתייחסות למספרים שלמים",
  tableHead: ["קוד", "ActionScript 3", "RuneScript"],
  tableRows: [
    ["<code>var u:uint = -1;</code>", "הופך ל-4294967295", "שגיאת הידור <code>ASX-TYPE-007</code>"],
    // Right to left, the arrow points the other way: the int value flows into the uint.
    ["<code>uint</code> → משתנה <code>int</code>", "מומר בשקט", "שגיאת הידור <code>ASX-TYPE-004</code>"],
    ["<code>int + uint</code>", "מומר בשקט", "שגיאת הידור <code>ASX-TYPE-011</code>"],
    ["<code>int.MAX_VALUE + 1</code>", "מתגלגל למספר שלילי", "שגיאת זמן ריצה <code>ASX-RUN-002</code>"],
    ["<code>7 / 2</code>", "<code>3.5</code>", "<code>3</code> (חילוק של מספרים שלמים)"],
  ],
  as3More: "להשוואה המלאה",
  statusTitle: "איפה הדברים עומדים",
  statusLede: "RuneScript קטנה בכוונה. תכונה נחשבת גמורה רק כשהבדיקות מראות שהיא עובדת.",
  worksNow: "עובד עכשיו",
  planned: "מתוכנן",
  works: [
    "חבילות, ופונקציות עם משני גישה",
    "<bdi>int / sint, uint, float / float32 / float64, bool, string, void</bdi>",
    "<bdi>if, while, for, break, continue, return</bdi>",
    "טיפוסי פונקציה, ביטויי למבדה, callbacks",
    '<bdi>use "std:string"</bdi> (החבילה strings של Go)',
    'תוכניות מרובות קבצים: <bdi>use "pkg"</bdi> ו-<bdi>use "./file"</bdi>',
    'המרות בדוקות: <bdi>(int) 64.3</bdi>, <bdi>(float) "64.7"</bdi>',
    "<bdi>throw, try / catch / finally</bdi>, שגיאות זמן ריצה שאפשר לתפוס",
    "שגיאות הידור ושגיאות זמן ריצה עם מיקום מדויק",
    "הידור ל-JavaScript (<bdi>runescript build</bdi>)",
  ],
  plannedItems: ["מחלקות ומבנים", "מערכים", "שרשור מחרוזות", "std:math", "חבילת גרפיקה מקורית"],
  roadmap: "למפת הדרכים (באנגלית)",
  startTitle: "הריצו את התוכנית הראשונה שלכם",
  startLede: "צריך Go 1.25 ומעלה. בונים את ה-CLI, ואז מריצים כל דוגמה.",
  steps: ["משיגים את קוד המקור", "בונים את ה-CLI", "מריצים תוכנית"],
  stepLabels: ["שכפול המאגר", "בנייה", "הרצת {file}"],
  startGuide: "לקריאת המדריך",
  browseExamples: "לדוגמאות (באנגלית)",
};

export const home: Record<Locale, HomeCopy> = { en, bn, heb };
