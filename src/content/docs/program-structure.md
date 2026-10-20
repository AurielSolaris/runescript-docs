---
title: "Program structure"
description: "Program structure in RuneScript: Packages, comments, main. Package names are dotted identifiers."
summary: "Packages, comments, main."
section: Guide
order: 2
source: "docs/guide/02-program-structure.md"
---
## Packages

Every file starts with a package declaration. It's a single statement ending
in `;`, not a block:

```actionscript
package games.puzzle.solver;

protected int main() { return 0; }
```

Package names are dotted identifiers. A program can span several files
(see [Packages and files](/docs/packages-and-files)).

## Using packages: `use`

`use` declarations come right after the `package` line, before any
function. Standard library packages are written `"std:<name>"`:

```actionscript
package main;

use "std:string";

protected int main() {
    trace(string.toUpper("hello"));   // HELLO
    return 0;
}
```

The functions are then called through the package's qualifier (the last
part of its name). See [Standard library: std:string](/docs/std-string).

`use` also loads other RuneScript packages (`use "games.engine";`) and
files (`use "./lib/helpers.rsc";`), so a program can span several files.
See [Packages and files](/docs/packages-and-files). Go packages
(`use "go:<package>";`) are planned and give `ASX-USE-003` today.

## Comments

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

Block comments don't nest.

## Statements and blocks

- Every statement ends with `;`.
- Braces `{ }` mark the body of a function, `if`, `else`, `while`, or `for`.
  In v0.1 these braces are **required**, even around a single statement.

## The entry point: `main`

Running a program calls its top-level `main` function, which is always
declared exactly like this:

```actionscript
package main;

protected int main() {
    // do stuff
    return 0;
}
```

- The `int` it returns becomes the process exit status: `0` means success.
- It is `protected`, takes no parameters, and returns `int`. Anything
  else, such as `public int main()` or `protected void main()`, is the
  error `ASX-ENTRY-002`, whose help says what to change.
- A program has exactly one `main`, in any of its files.
- Command-line arguments come from `process.args()` in `std:process`
  ([chapter 20](/docs/files-and-input)).

No class is needed. Programs are made of top-level functions, which can
appear in any order. Functions can also be nested inside other functions.

## Names

Identifiers are made of ASCII letters, digits, and `_`, and can't start
with a digit. They are case-sensitive. Keywords such as `if`, `int`, `use`,
and `return` can't be used as names. Words reserved for future features
(`class`, `array`, and `matrix`) can't be used either.

