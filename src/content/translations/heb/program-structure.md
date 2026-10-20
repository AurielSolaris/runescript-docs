---
title: "מבנה התוכנית"
description: "חבילות, הערות, main. כל קובץ מתחיל בהצהרת חבילה. זוהי הוראה אחת שמסתיימת ב-;, ולא בלוק:"
summary: "חבילות, הערות, main."
order: 2
page: "program-structure"
source: "localization/heb/docs/guide/02-program-structure.md"
---
> זהו תרגום של [המקור באנגלית](/docs/program-structure). אם יש הבדל, הגרסה האנגלית היא הקובעת. התרגום נעשה בעזרת בינה מלאכותית ונבדק בידי המחבר.


## חבילות

כל קובץ מתחיל בהצהרת חבילה. זוהי הוראה אחת שמסתיימת ב-`;`, ולא בלוק:


```actionscript
package games.puzzle.solver;

protected int main() { return 0; }
```


שמות חבילות הם מזהים המופרדים בנקודות. תוכנית יכולה להתפרש על פני כמה קבצים
(ראו [חבילות וקבצים](/heb/docs/packages-and-files)).

## שימוש בחבילות: `use`

הצהרות `use` באות מיד אחרי שורת ה-`package`, לפני כל פונקציה. חבילות של הספרייה
הסטנדרטית נכתבות בצורה `"std:<name>"`:


```actionscript
package main;

use "std:string";

protected int main() {
    trace(string.toUpper("hello"));   // HELLO
    return 0;
}
```


את הפונקציות קוראים אחר כך דרך המזהה של החבילה (החלק האחרון בשמה). ראו
[הספרייה הסטנדרטית: std:string](/heb/docs/std-string).

`use` טוען גם חבילות RuneScript אחרות (`use "games.engine";`) וקבצים
(`use "./lib/helpers.rsc";`), כך שתוכנית יכולה להתפרש על פני כמה קבצים. ראו
[חבילות וקבצים](/heb/docs/packages-and-files). חבילות Go (`use "go:<package>";`)
מתוכננות, וכיום הן מניבות `ASX-USE-003`.

## הערות


```actionscript
package main;

// A line comment runs to the end of the line.

/* A block comment
   can span several lines. */

protected int main() {
    trace("comments are ignored"); // trailing comments too
    return 0;
}
```


אי אפשר לקנן הערות בלוק זו בתוך זו.

## הוראות ובלוקים

- כל הוראה מסתיימת ב-`;`.
- סוגריים מסולסלים `{ }` מסמנים את הגוף של פונקציה, `if`, `else`, `while` או `for`.
  בגרסה 0.1 הסוגריים האלה **חובה**, גם סביב הוראה אחת.

## נקודת הכניסה: `main`

הרצת תוכנית קוראת לפונקציה `main` שברמה העליונה, שתמיד מוצהרת בדיוק כך:


```actionscript
package main;

protected int main() {
    // do stuff
    return 0;
}
```


- ה-`int` שהיא מחזירה הופך לקוד היציאה של התהליך: `0` פירושו הצלחה.
- היא `protected`, אינה מקבלת פרמטרים ומחזירה `int`. כל צורה אחרת, כמו
  `public int main()` או `protected void main()`, היא השגיאה `ASX-ENTRY-002`, והעזרה
  שלה אומרת מה לשנות.
- לתוכנית יש בדיוק `main` אחת, באחד מהקבצים שלה.
- ארגומנטים משורת הפקודה מגיעים מ-`process.args()` שב-`std:process`
  ([פרק 20](/heb/docs/files-and-input)).

אין צורך במחלקה. תוכניות בנויות מפונקציות ברמה העליונה, שיכולות להופיע בכל סדר.
אפשר גם לקנן פונקציות בתוך פונקציות אחרות.

## שמות

מזהים מורכבים מאותיות ASCII, ספרות ו-`_`, ואינם יכולים להתחיל בספרה. יש הבחנה בין
אותיות גדולות לקטנות. אי אפשר להשתמש כשמות במילות מפתח כמו `if`, `int`, `use`
ו-`return`. גם מילים השמורות לתכונות עתידיות (`class`, `array` ו-`matrix`) אינן מותרות.

