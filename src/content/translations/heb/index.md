---
title: "המדריך ל-RuneScript (גרסה 0.3)"
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

1. [מתחילים](/heb/docs/getting-started): בניית ה-CLI והרצת תוכנית
2. [מבנה התוכנית](/heb/docs/program-structure): חבילות, הערות, `main`
3. [טיפוסים ומשתנים](/heb/docs/types-and-variables): `int`, `uint`, `bool`, `string`, השמה
4. [אופרטורים](/heb/docs/operators): חשבון, השוואה, לוגיקה
5. [בקרת זרימה](/heb/docs/control-flow): `if`, `while`, `for`, `break`, `continue`
6. [פונקציות](/heb/docs/functions): פרמטרים, ערכי החזרה, רקורסיה
7. [פלט עם `trace`](/heb/docs/trace)
8. [מדריך הודעות האבחון](/heb/docs/diagnostics): כל קודי השגיאה
9. [למי שמגיע מ-ActionScript 3](/heb/docs/coming-from-actionscript)
10. [הספרייה הסטנדרטית: `std:string`](/heb/docs/std-string): ה-`strings` של Go, ב-RuneScript
11. [הידור ל-JavaScript](/heb/docs/javascript): `runescript build`, ואיך הקפדת הטיפוסים נשמרת
12. [חבילות וקבצים](/heb/docs/packages-and-files): `use`, תוכניות מרובות קבצים, נראות
13. [מספרים עשרוניים והמרות](/heb/docs/floats-and-conversions): `float`, `float32`, `float64`, `(int) x`
14. [שגיאות](/heb/docs/errors): `throw`, `try`, `catch`, `finally`, ותפיסת שגיאות זמן ריצה

לכללים המדויקים, ראו את [מפרט השפה](/docs/spec) (באנגלית).
למה שמתוכנן בהמשך, ראו את [מפת הדרכים](/docs/roadmap) (באנגלית).

> **עדיין לא זמין:** מחלקות, מבנים (structs), מערכים, `char`, ושרשור מחרוזות.
> מילות המפתח שלהם שמורות, ושימוש בהן מניב שגיאה ברורה של "עדיין לא מומש".

