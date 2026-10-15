---
title: "פונקציות"
description: "פרמטרים, ערכי החזרה, רקורסיה. כאשר <access> הוא public, private או protected. הוא חובה, וכך גם טיפוס ההחזרה (void כשאין תוצאה). אין מילת מפתח function."
summary: "פרמטרים, ערכי החזרה, רקורסיה."
order: 6
page: "functions"
source: "localization/heb/docs/guide/06-functions.md"
---
> זהו תרגום של [המקור באנגלית](/docs/functions). אם יש הבדל, הגרסה האנגלית היא הקובעת. התרגום נעשה בעזרת בינה מלאכותית ונבדק בידי המחבר.


## הצהרה על פונקציה

לכל הצהרה על פונקציה יש הצורה


```text
<access> <return type> <name>(<parameters>) { <body> }
```


כאשר `<access>` הוא `public`, `private` או `protected`. הוא **חובה**, וכך גם טיפוס
ההחזרה (`void` כשאין תוצאה). אין מילת מפתח `function`.


```actionscript
package main;

public int add(int a, int b) {
    return a + b;
}

private void greet(string name) {
    trace("hello", name);
}

public void main() {
    greet("rune");
    trace(add(2, 3));
}
```


| גישה | משמעות |
|---|---|
| `public` | ניתן להשתמש מכל מקום |
| `private` | ניתן להשתמש רק באותו קובץ |
| `protected` | ניתן להשתמש רק באותה חבילה |

> הכללים האלה נאכפים כשלתוכנית יש כמה קבצים; ראו
> [חבילות וקבצים](/heb/docs/packages-and-files).

`return;` יוצאת מוקדם מפונקציית `void`.

## קריאה לפונקציה

הארגומנטים נבדקים מול טיפוסי הפרמטרים לפי אותם כללים כמו בהשמה. למשל, אי אפשר להעביר
משתנה `int` לפרמטר `uint`. אפשר לקרוא לפונקציות ברמה העליונה לפני ההגדרה שלהן:


```actionscript
package main;

public void main() {
    trace(square(12));     // defined below: fine
}

public int square(int n) {
    return n * n;
}
```


קריאה שאין צורך בתוצאה שלה יכולה לשמש כהוראה:


```actionscript
package main;

public int logAndCount(string message) {
    trace(message);
    return 1;
}

public void main() {
    logAndCount("result ignored");
}
```


## פרמטרים הם עותקים, ולקריאה בלבד

ארגומנטים מועברים לפי ערך. בתוך הפונקציה אי אפשר להשים ערך חדש בפרמטרים
(`ASX-NAME-006`). העתיקו את הערך למשתנה מקומי אם צריך לשנות אותו:


```actionscript
package main;

public uint gcd(uint a, uint b) {
    uint x = a;
    uint y = b;
    while (y != 0) {
        uint t = x % y;
        x = y;
        y = t;
    }
    return x;
}

public void main() {
    trace(gcd(84, 36));   // 12
}
```


## רקורסיה


```actionscript
package main;

public int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

public void main() {
    trace(factorial(10));   // 3628800
}
```


קריאות יכולות להיות מקוננות עד עומק של 10,000. עומק גדול יותר עוצר את התוכנית עם
`ASX-RUN-001` במקום לקרוס.

## אבות-טיפוס (הצהרות מוקדמות)

**אב-טיפוס** מצהיר על החתימה של פונקציה בלי הגוף שלה. הוא מסתיים ב-`;`, ושמות
הפרמטרים הם רשות. ההגדרה חייבת לבוא אחר כך באותו טווח, עם בדיוק אותם טיפוסים:


```actionscript
package main;

public int twice(int);          // prototype

public void main() {
    trace(twice(21));           // 42
}

public int twice(int x) {       // definition
    return x * 2;
}
```


פונקציות ברמה העליונה נראות ממילא מכל מקום, ולכן שם אבות-טיפוס הם רשות. בתוך פונקציה
הם הדרך שבה שתי פונקציות מקוננות קוראות זו לזו (ראו בהמשך). הצהרה על אב-טיפוס פעמיים,
או אחרי ההגדרה, היא שגיאה (`ASX-NAME-002`). הגדרה עם טיפוסים שונים היא
`ASX-TYPE-015`. אב-טיפוס שאף פעם לא מוגדר הוא `ASX-NAME-010`.

## פונקציות מקוננות

אפשר להצהיר על פונקציות בתוך פונקציות אחרות, עם משנה גישה כמו כל פונקציה אחרת.
פונקציה מקוננת נראית מרגע ההצהרה עליה ועד סוף הבלוק שמכיל אותה, וגם בתוך הגוף שלה
עצמה (כך שהיא יכולה להיות רקורסיבית):


```actionscript
package main;

public void main() {
    private int fib(int n) {
        if (n < 2) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }
    trace(fib(15));   // 610
}
```


כדי ששתי פונקציות מקוננות יקראו זו לזו, הצהירו קודם על אחת מהן באב-טיפוס:


```actionscript
package main;

public void main() {
    private bool isEven(int n);

    private bool isOdd(int n) {
        if (n == 0) {
            return false;
        }
        return isEven(n - 1);
    }

    private bool isEven(int n) {
        if (n == 0) {
            return true;
        }
        return isOdd(n - 1);
    }

    trace(isEven(10), isOdd(7));   // true true
}
```


## גבולות של פונקציות

כל גוף של פונקציה, כולל פונקציות מקוננות וביטויי למבדה, הוא **גבול**. קוד בתוכו יכול
להשתמש ב:

- הפרמטרים והמשתנים המקומיים שלו עצמו;
- פונקציות: פונקציות ברמה העליונה, ופונקציות מקוננות הנראות במקום שבו הוא מוצהר
  (כולל הוא עצמו).

הוא **אינו** יכול להשתמש במשתנים המקומיים או בפרמטרים של הפונקציה שהוא מקונן בתוכה.
פונקציות ב-RuneScript אינן לוכדות משתנים (`ASX-NAME-009`):


```actionscript
package main;

public void main() {
    int count = 0;
    private void bump() {
        count++;      // error: ASX-NAME-009
    }
}
```


העבירו את הערך כפרמטר, והחזירו את התוצאה:


```actionscript
package main;

public void main() {
    private int bump(int count) {
        return count + 1;
    }
    int count = 0;
    count = bump(count);
    trace(count);   // 1
}
```


בגלל הגבול, פונקציה מקוננת יכולה להשתמש שוב בשם מהפונקציה העוטפת. בתוך הפונקציה
המקוננת, השם הזה מתייחס רק למשתנה שלה עצמה. גם `break` ו-`continue` אינם יכולים
לחצות גבול.

## טיפוסי פונקציה

טיפוס פונקציה נכתב בסגנון C: טיפוס ההחזרה, ואחריו טיפוסי הפרמטרים בסוגריים.

| טיפוס | משמעות |
|---|---|
| `int(int, int)` | מקבלת שני `int`, מחזירה `int` |
| `void(string)` | מקבלת `string`, לא מחזירה כלום |
| `bool()` | לא מקבלת כלום, מחזירה `bool` |
| `int(int)(string)` | מקבלת `string`, מחזירה פונקציה מטיפוס `int(int)` |

אפשר להשתמש בטיפוסי פונקציה עבור משתנים, פרמטרים וטיפוסי החזרה. שני טיפוסי פונקציה
זהים כשטיפוסי הפרמטרים וההחזרה שלהם זהים (`int` ו-`sint` נחשבים לאותו טיפוס).

## פונקציות כערכים (callbacks)

כתיבת שם של פונקציה בלי לקרוא לה נותנת ערך-פונקציה. אפשר לשמור אותו, להעביר אותו,
להחזיר אותו ולקרוא לו:


```actionscript
package main;

public int apply(int(int, int) op, int a, int b) {
    return op(a, b);
}

public int multiply(int a, int b) {
    return a * b;
}

public void main() {
    int(int, int) f = multiply;
    trace(f(6, 7));                   // 42
    trace(apply(multiply, 3, 4));     // 12
}
```


אי אפשר להדפיס ערכי-פונקציה ב-`trace` או להשוות אותם עם `==`. ה-`trace` המובנה אינו
ערך; עטפו אותו בביטוי למבדה במקום זאת.

## ביטויי למבדה

**למבדה** היא פונקציה אנונימית: פרמטרים עם טיפוסים בסוגריים, אחריהם `=>`, ואחריו
ביטוי או בלוק.


```actionscript
package main;

public void repeat(int times, void(int) body) {
    for (int i = 0; i < times; i++) {
        body(i);
    }
}

public void main() {
    int(int, int) add = (int a, int b) => a + b;
    trace(add(2, 3));                                 // 5

    repeat(2, (int i) => trace("tick", i));           // tick 0, tick 1

    int(int) abs = (int x) => {
        if (x < 0) {
            return -x;
        }
        return x;
    };
    trace(abs(-4));                                   // 4
}
```


- **טיפוס ההחזרה.** כשלמבדה מושמת, מועברת או מוחזרת במקום שבו מצופה טיפוס פונקציה,
  היא מקבלת את טיפוס ההחזרה של אותו טיפוס. אחרת, טיפוס ההחזרה נקבע לפי הגוף: הטיפוס
  של הביטוי, או הטיפוס של ה-`return` הראשון.
- על ביטויי למבדה חל אותו כלל גבול כמו על פונקציות מקוננות: הם אינם יכולים להשתמש
  במשתנים של הפונקציה העוטפת.
- ביטויי למבדה אינם מקבלים משנה גישה.

## החזרת פונקציות


```actionscript
package main;

public int(int) pick(string op) {
    private int double(int n) {
        return n * 2;
    }
    if (op == "double") {
        return double;
    }
    return (int n) => n * n;
}

public void main() {
    trace(pick("double")(5), pick("square")(5));   // 10 25
}
```


`pick("double")(5)` קוראת לפונקציה ש-`pick` מחזירה. קודם מחושב ערך-הפונקציה, ואחר
כך הארגומנטים.

## עדיין לא זמין

העמסה (שתי פונקציות באותו שם), ארגומנטים עם ברירת מחדל, פרמטרים במספר משתנה,
פונקציות גנריות, וסגורים (closures) שלוכדים משתנים.

