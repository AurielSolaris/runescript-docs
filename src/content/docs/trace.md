---
title: "Output with trace"
description: "To print one string built from several values, join them with + or use an interpolated string such as $\"{name} is {age}\" ([chapter…"
summary: ""
section: Guide
order: 7
source: "docs/guide/07-trace.md"
---
`trace` is the built-in way to print, a name kept from ActionScript. It
takes any number of arguments of any type except `void`. It prints them
separated by single spaces, followed by a newline, to standard output.

```actionscript
package main;

public void main() {
    trace("Hello");                 // Hello
    trace("x =", 42);               // x = 42
    trace(1, -2, true, "three");    // 1 -2 true three
    trace();                        // (empty line)
}
```

| Value | Printed as |
|---|---|
| `int`, `sint`, `uint` | decimal, e.g. `-42` |
| `float`, `float32`, `float64` | as ActionScript prints numbers: `64`, `0.5`, `1e+21`, `NaN` ([chapter 13](/docs/floats-and-conversions)) |
| `bool` | `true` / `false` |
| `string` | the text itself, with no quotes |
| `char` | the character itself, e.g. `é` |
| an error | its name and message, e.g. `RangeError: too big` ([chapter 14](/docs/errors)) |

To print one string built from several values, join them with `+` or use
an interpolated string such as `$"{name} is {age}"`
([chapter 16](/docs/text-and-arrays)). Arrays can't be traced; join them
with `string.join` first.

`trace` is a reserved built-in. You can't declare a function or variable
named `trace`.

