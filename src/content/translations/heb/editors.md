---
title: "עורכים"
description: "‏VS Code, ‏Vim, ‏Neovim ו-Emacs, ושרת השפה runescript lsp. ‏RuneScript עובדת ב-Visual Studio Code, ‏Vim, ‏Neovim ו-Emacs."
summary: "‏VS Code, ‏Vim, ‏Neovim ו-Emacs, ושרת השפה runescript lsp."
order: 23
page: "editors"
source: "localization/heb/docs/guide/23-editors.md"
---
> זהו תרגום של [המקור באנגלית](/docs/editors). אם יש הבדל, הגרסה האנגלית היא הקובעת. התרגום נעשה בעזרת בינה מלאכותית ונבדק בידי המחבר.


‏RuneScript עובדת ב-Visual Studio Code, ‏Vim, ‏Neovim ו-Emacs. לכל אחד מהם יש חבילה
ב-[`editors/`](https://github.com/AurielSolaris/runescript/blob/main/editors/README.md) שמדגישה את RuneScript, וכולן משתמשות באותו שרת שפה,
‏`runescript lsp`, שבנוי לתוך הפקודה `runescript`. שרת השפה נותן לכם:

- **שגיאות תוך כדי הקלדה.** השגיאות והאזהרות של המהדר מופיעות מתחת לקוד עוד לפני השמירה, עם
  הקודים והעזרה שלהן, בדיוק כמו ש-`runescript check` מדווחת עליהן.
- **ריחוף.** הצביעו על שם כדי לראות את הטיפוס שלו, על קריאה כדי לראות את חתימת הפונקציה (גם של
  פונקציות הספרייה הסטנדרטית), או על struct כדי לראות את השדות שלו.
- **מעבר להגדרה** של משתנים, פרמטרים, פונקציות (גם בקבצים ובחבילות אחרים), מבני struct, שדות,
  והקבצים ש-`use` טוענת.
- **השלמה** של מילות מפתח, שמות שבטווח, פונקציות, חברי חבילה אחרי `csv.` או `geom.`, מתודות של
  מערכים, שדות של struct, וחבילות `std:` בתוך `use "…"`.
- **מתאר** של מבני ה-struct והפונקציות בקובץ.

## התקנה

קודם התקינו את RuneScript ‏([פרק 1](/heb/docs/getting-started)) ובדקו ש-`runescript version` עובדת
בטרמינל. אחר כך:

**‏Visual Studio Code.** בנו והתקינו את ההרחבה מ-[`editors/vscode`](https://github.com/AurielSolaris/runescript/blob/main/editors/vscode/README.md):


```sh
cd editors/vscode
npm install
npx vsce package
code --install-extension runescript-0.6.0.vsix
```


אם `runescript` אינה ב-`PATH` שלכם, הגדירו את **RuneScript › Server: Path** בהגדרות.

**‏Vim ו-Neovim.** הוסיפו את [`editors/vim`](https://github.com/AurielSolaris/runescript/blob/main/editors/vim/README.md) לנתיב זמן הריצה
שלכם. ב-Neovim 0.11 ואילך, שורה אחת מפעילה את שרת השפה:


```lua
vim.lsp.enable('runescript')
```


ב-Vim, חברו את vim-lsp, ‏coc.nvim או ALE לפקודה `runescript lsp`; קובץ ה-README של התוסף מראה
כל אחד מהם.

**‏Emacs.** טענו את [`editors/emacs/runescript-mode.el`](https://github.com/AurielSolaris/runescript/blob/main/editors/emacs/README.md), ואז
הפעילו את שרת השפה עם Eglot:


```elisp
(require 'runescript-mode)
(add-hook 'runescript-mode-hook #'eglot-ensure)
```


**כל עורך אחר** עם לקוח של שרת שפה: הריצו את `runescript lsp`, שמדברת דרך הקלט והפלט
הסטנדרטיים, עבור קבצי `.rsc` ו-`.rsm`.

## איך הקוד שלכם נבדק

שרת השפה בודק את התוכנית שלכם כמו ש-`runescript run` הייתה בודקת, עם התאמות לקוד שעדיין
נכתב:

- **נתיבי use** נפתרים ביחס לתיקיית סביבת העבודה שמכילה את הקובץ, כמו ש-`runescript run` פותרת
  אותם ביחס לתיקיית העבודה. פתחו את התיקייה שממנה אתם מריצים את התוכניות שלכם.
- **שינויים שלא נשמרו נחשבים.** קבצים שפתוחים בעורך נקראים מהעורך, כך ששינוי שם של פונקציה
  בקובץ אחד מראה את השגיאות שהוא גורם בקבצים שמשתמשים בה, עוד לפני ששמרתם אחד מהם.
- **קובץ בלי `main` הוא בסדר**, כי קובץ אחר יכול להשתמש בו. מודול (`.rsm`) שנמצא בתיקיית
  החבילה שלו נבדק יחד עם שאר החבילה.
- **אזהרות** מופיעות כשאין בתוכנית שגיאות, כמו בשורת הפקודה.

