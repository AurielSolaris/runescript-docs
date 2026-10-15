---
title: "בקרת זרימה"
description: "if, while, for, break, continue. תנאים חייבים להיות bool. כתבו if (n != 0), ולא if (n). גופים תמיד נכתבים בסוגריים מסולסלים."
summary: "if, while, for, break, continue."
order: 5
page: "control-flow"
source: "localization/heb/docs/guide/05-control-flow.md"
---
> זהו תרגום של [המקור באנגלית](/docs/control-flow). אם יש הבדל, הגרסה האנגלית היא הקובעת. התרגום נעשה בעזרת בינה מלאכותית ונבדק בידי המחבר.


תנאים חייבים להיות `bool`. כתבו `if (n != 0)`, ולא `if (n)`. גופים תמיד נכתבים
בסוגריים מסולסלים.

## if / else if / else


```actionscript
package main;

public string classify(int n) {
    if (n < 0) {
        return "negative";
    } else if (n == 0) {
        return "zero";
    } else {
        return "positive";
    }
}

public void main() {
    trace(classify(-5), classify(0), classify(9));   // negative zero positive
}
```


## while


```actionscript
package main;

public void main() {
    int n = 3;
    while (n > 0) {
        trace(n);
        n--;
    }
    trace("liftoff");
}
```


## for

`for (init; condition; step) { … }`


```actionscript
package main;

public void sayHi(string message, int times) {
    for (int i = 0; i < times; i++) {
        trace(message);
    }
}

public void main() {
    sayHi("Hello world", 3);
}
```


כל אחד משלושת החלקים הוא רשות. בלי תנאי, הלולאה רצה עד `break` או `return`:


```actionscript
package main;

public void main() {
    int tries = 0;
    for (;;) {
        tries++;
        if (tries == 3) {
            break;
        }
    }
    trace("stopped after", tries);
}
```


חלק האתחול יכול להצהיר על משתנה (שקיים רק בתוך הלולאה), להשים ערך במשתנה קיים, או
לקרוא לפונקציה. הצעד יכול להיות השמה, `++`/`--`, או קריאה.

## break ו-continue

`break` יוצאת מהלולאה הפנימית ביותר. `continue` מדלגת לאיטרציה הבאה. בלולאת `for`,
גם אחרי `continue` הצעד מתבצע.


```actionscript
package main;

public void main() {
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            continue;       // skip even numbers
        }
        if (i > 7) {
            break;          // stop at 9
        }
        trace(i);           // 1 3 5 7
    }
}
```


`break` או `continue` מחוץ ללולאה הם שגיאה (`ASX-FLOW-001`).

## החזרת ערך בכל מסלול

פונקציה שמחזירה ערך חייבת להחזיר בכל מסלול. המהדר מקבל גוף שמסתיים ב-`return` (או
ב-`throw`, ראו [שגיאות](/heb/docs/errors)), או בשרשרת `if`/`else` שכל ענף בה מחזיר:


```actionscript
package main;

public int sign(int n) {
    if (n < 0) {
        return -1;
    } else if (n == 0) {
        return 0;
    } else {
        return 1;
    }
}

public void main() {
    trace(sign(-8), sign(0), sign(8));
}
```


המהדר אינו מתייחס ללולאה כמבטיחה החזרה. הוסיפו `return` אחרון אחרי הלולאה:


```actionscript
package main;

public int firstSquareAbove(int limit) {
    for (int i = 0; i < 1000; i++) {
        if (i * i > limit) {
            return i;
        }
    }
    return -1;
}

public void main() {
    trace(firstSquareAbove(50));   // 8
}
```


