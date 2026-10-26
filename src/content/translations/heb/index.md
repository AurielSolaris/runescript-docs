---
title: "המדריך ל-RuneScript (גרסה 0.6)"
description: "סיור מעשי בתכונות של RuneScript שקיימות היום. כל תוכנית שלמה בדפים האלה מתקמפלת בחבילת הבדיקות (tests/docs_test.go)."
summary: ""
order: 0
page: ""
source: "localization/heb/docs/guide/README.md"
---
> זהו תרגום של [המקור באנגלית](/docs). אם יש הבדל, הגרסה האנגלית היא הקובעת. התרגום נעשה בעזרת בינה מלאכותית ונבדק בידי המחבר.


סיור מעשי בתכונות של RuneScript שקיימות **היום**. כל תוכנית שלמה בדפים האלה
מתקמפלת בחבילת הבדיקות (`tests/docs_test.go`). אם אחת מהן מפסיקה להתקמפל,
הבנייה נכשלת.

1. [מתחילים](/heb/docs/getting-started): בניית ה-CLI, הרצת תוכנית ו-`run --watch`
2. [מבנה התוכנית](/heb/docs/program-structure): חבילות, הערות, `main`
3. [טיפוסים ומשתנים](/heb/docs/types-and-variables): `int`, `uint`, `bool`, `string`, השמה
4. [אופרטורים](/heb/docs/operators): חשבון, השוואה, לוגיקה
5. [בקרת זרימה](/heb/docs/control-flow): `if`, `while`, `for`, `break`, `continue`
6. [פונקציות](/heb/docs/functions): פרמטרים, ערכי החזרה, רקורסיה
7. [פלט עם `trace`](/heb/docs/trace)
8. [מדריך הודעות האבחון](/heb/docs/diagnostics): כל קודי השגיאה והאזהרה, `-Werror`, `--allow`
9. [למי שמגיע מ-ActionScript 3](/heb/docs/coming-from-actionscript)
10. [הספרייה הסטנדרטית: `std:string`](/heb/docs/std-string): ה-`strings` של Go, ב-RuneScript
11. [הידור ל-JavaScript](/heb/docs/javascript): `runescript build`, איך הקפדת הטיפוסים נשמרת, קריאה ל-JavaScript עם `extern`, וטעינה מחדש חיה עם `runescript dev`
12. [חבילות וקבצים](/heb/docs/packages-and-files): `use`, תוכניות מרובות קבצים, נראות
13. [מספרים עשרוניים והמרות](/heb/docs/floats-and-conversions): `float`, `float32`, `float64`, `(int) x`
14. [שגיאות](/heb/docs/errors): `throw`, `try`, `catch`, `finally`, ותפיסת שגיאות זמן ריצה
15. [דפי רשת עם `rune:dom`](/heb/docs/web-pages): רכיבים, תבניות HTML ו-SVG בדוקות, runes, אירועים, `$if`, `renderApp`
16. [טקסט ורשימות](/heb/docs/text-and-arrays): חיבור מחרוזות עם `+`, מחרוזות משובצות `$"…"`, `char` ו-`Array<T>`
17. [בלי `null`, בלי `any`, בלי גנריות](/heb/docs/no-null-any-generics): למה, ואיך להשתמש ב-`false` במקום שבו שפות אחרות משתמשות ב-`null`
18. [מספרים לעומק](/heb/docs/numbers): `int8` … `uint64`, ליטרלים הקסדצימליים ובינאריים, פעולות על סיביות, `std:math`
19. [מבנים](/heb/docs/structs): הצהרה, בנייה והעתקה של טיפוסי ערך
20. [קבצים, קלט ופלט](/heb/docs/files-and-input): `std:io`, `std:process`, `std:fs`, `std:path`, ומפרש Brainfuck
21. [JSON](/heb/docs/json): ‏`std:json`: פענוח JSON, קריאה בפונקציות בדוקות, בנייה וכתיבה
22. [CSV, מטריצות וגרסאות](/heb/docs/csv-matrix-semver): ‏`std:csv`, ‏`std:matrix` ו-`std:semver`
23. [עורכים](/heb/docs/editors): ‏VS Code, ‏Vim, ‏Neovim ו-Emacs, ושרת השפה `runescript lsp`

לכללים המדויקים, ראו את [מפרט השפה](/docs/spec) (באנגלית).
למה שמתוכנן בהמשך, ראו את [מפת הדרכים](/docs/roadmap) (באנגלית).

> **עדיין לא זמין:** מחלקות. מילת המפתח שלהן שמורה, ושימוש בה מניב שגיאה ברורה של
> "עדיין לא מומש". גם אובייקטים, מערכים, מבנים ו-callbacks עדיין לא יכולים לחצות את
> הגבול עם JavaScript.

