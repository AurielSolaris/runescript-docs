---
title: "טיפוסים ומשתנים"
description: "int, uint, bool, string, השמה. כתבו קודם את הטיפוס, אחריו את השם, ואחריו ערך התחלתי:"
summary: "int, uint, bool, string, השמה."
order: 3
page: "types-and-variables"
source: "localization/heb/docs/guide/03-types-and-variables.md"
---
> זהו תרגום של [המקור באנגלית](/docs/types-and-variables). אם יש הבדל, הגרסה האנגלית היא הקובעת. התרגום נעשה בעזרת בינה מלאכותית ונבדק בידי המחבר.


## הצהרה על משתנים

כתבו קודם את הטיפוס, אחריו את השם, ואחריו ערך התחלתי:


```actionscript
package main;

public void main() {
    int count = 10;
    uint total = 250;
    bool ready = true;
    string name = "Ada";
    trace(name, count, total, ready);   // Ada 10 250 true
}
```


כל משתנה **חייב** לקבל ערך התחלתי כשהוא מוצהר. בגרסה 0.1 אין ערכי ברירת מחדל
מובלעים.

## הטיפוסים הבסיסיים

| טיפוס | מה הוא מכיל | טווח |
|---|---|---|
| `int` | מספרים שלמים עם סימן | −2147483648 … 2147483647 |
| `sint` | **בדיוק אותו טיפוס כמו `int`.** השתמשו בו כשרוצים לומר במפורש "עם סימן". | כמו `int` |
| `uint` | מספרים שלמים בלי סימן | 0 … 4294967295 |
| `int8` … `int64`, `uint8` … `uint64` | מספרים שלמים ברוחב מדויק ([פרק 18](/heb/docs/numbers)) | למשל `uint8` הוא 0 … 255 |
| `float`, `float32`, `float64` | מספרים עשרוניים (נקודה צפה) ([פרק 13](/heb/docs/floats-and-conversions)) | |
| `bool` | `true` או `false` | |
| `string` | טקסט, למשל `"hello\n"` | |
| `char` | תו אחד, למשל `'a'` ([פרק 16](/heb/docs/text-and-arrays)) | כל נקודת קוד של Unicode |
| `Array<T>` | רשימה של ערכי `T`, למשל `["a", "b"]` ([פרק 16](/heb/docs/text-and-arrays)) | |
| `struct` | שדות בעלי שם בערך אחד, למשל `Point{x: 1, y: 2}` ([פרק 19](/heb/docs/structs)) | |
| `Error` וסוגיו | שגיאות ([פרק 14](/heb/docs/errors)) | |
| `void` | אין ערך; משמש רק כטיפוס ההחזרה של פונקציה | |

אפשר לערבב בחופשיות בין `int` ל-`sint`:


```actionscript
package main;

public void main() {
    sint a = -5;
    int b = a;      // fine: same type
    sint c = b;     // fine
    trace(a, b, c);
}
```


תווי בריחה במחרוזות: `\n` (שורה חדשה), `\t` (טאב), `\r`, `\0`, `\\`, `\"`, `\'`, ו-`\u{...}`
לכל תו של Unicode, למשל `\u{E9}` (é) או `\u{1F600}`. מחרוזות
מחוברות עם `+`, ו-`$"total: {n}"` בונה מחרוזת מערכים ([פרק 16](/heb/docs/text-and-arrays)).

## השמה


```actionscript
package main;

public void main() {
    int x = 1;
    x = 10;     // 10
    x += 5;     // 15
    x -= 3;     // 12
    x *= 2;     // 24
    x /= 5;     // 4
    x %= 3;     // 1
    x++;        // 2
    x--;        // 1
    trace(x);
}
```


- השמה היא הוראה. אי אפשר לכתוב `a = b = 0;` או `if (x = 1)`.
- `++` ו-`--` הן הוראות שבאות אחרי משתנה (`i++;`). אי אפשר להשתמש בהן בתוך ביטוי
  גדול יותר.
- פרמטרים של פונקציה הם לקריאה בלבד. כדי לשנות אחד, העתיקו אותו קודם למשתנה מקומי.

## טווח הכרה (scope)

משתנה קיים מרגע ההצהרה עליו ועד סוף הבלוק שמכיל אותו. משתנה שהוצהר בכותרת של
`for` קיים רק בתוך הלולאה הזו.


```actionscript
package main;

public void main() {
    if (true) {
        int inner = 1;
        trace(inner);
    }
    // 'inner' is not visible here

    for (int i = 0; i < 2; i++) {
        trace(i);
    }
    for (int i = 0; i < 2; i++) {   // fine: the first 'i' is gone
        trace(i);
    }
}
```


גרסה 0.1 אינה מתירה **הסתרה (shadowing)**. משתנה חדש אינו יכול להשתמש שוב בשם של
משתנה, פרמטר או פונקציה הנראים במקום:


```actionscript
package main;

public void main() {
    int x = 1;
    if (true) {
        int x = 2; // error: ASX-NAME-002
    }
}
```


## עם סימן ובלי סימן לעולם אינם מתערבבים בשקט

RuneScript אינה הופכת בשקט מספר שלם עם סימן למספר בלי סימן. המהדר בודק את
*הטיפוס* של הערך, ולא את הערך עצמו. משתנה עם סימן יכול להכיל מספר שלילי, ולכן
שמירתו ב-`uint` היא שגיאה גם אם במקרה הערך חיובי:


```actionscript
package main;

public int main() {
    sint signedValue = -10;
    uint unsignedValue = signedValue; // error: ASX-TYPE-004
    return 0;
}
```

```text
main.rsc:5:26: error ASX-TYPE-004: Cannot assign signed integer 'sint' to unsigned integer 'uint'.
        uint unsignedValue = signedValue;
                             ^^^^^^^^^^^
  help: Use an explicit checked conversion, (uint) x, or change the destination type.
```


ליטרלים מספריים גמישים יותר. ליטרל מקבל את הטיפוס של מה שמקבל אותו, כל עוד הערך
נכנס בו:


```actionscript
package main;

public void main() {
    uint a = 42;            // fine: 42 fits in uint
    uint b = 6 * 7;         // fine: constants are computed at compile time
    int c = -2147483648;    // fine: the smallest int
    trace(a, b, c);
}
```

```actionscript
package main;

public void main() {
    uint u = -1;            // error: ASX-TYPE-007
}
```

```actionscript
package main;

public void main() {
    int big = 3000000000;   // error: ASX-TYPE-006
}
```


גם הכיוון ההפוך (`uint` אל `int`) נדחה, וכך גם ערבוב של `int` ו-`uint` בפעולה אחת.
כדי להמיר, כתבו את ההמרה במפורש: `(uint) signedValue` בודקת את הערך בזמן הריצה
וזורקת שגיאה אם הוא שלילי. ראו [מספרים עשרוניים והמרות](/heb/docs/floats-and-conversions),
שם מוסברים גם `float`, `float32` ו-`float64`.

