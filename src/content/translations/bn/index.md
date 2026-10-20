---
title: "RuneScript গাইড (v0.6)"
description: "RuneScript-এর যেসব বৈশিষ্ট্য আজ আছে, তার একটি ব্যবহারিক পরিচয়। এই পাতাগুলোর প্রতিটি সম্পূর্ণ প্রোগ্রাম টেস্ট-সংগ্রহ (tests/docs_test.go) কম্পাইল করে…"
summary: ""
order: 0
page: ""
source: "localization/bn/docs/guide/README.md"
---
> এটি [ইংরেজি মূল লেখার](/docs) অনুবাদ। পার্থক্য থাকলে ইংরেজি সংস্করণটিই সঠিক। অনুবাদটি AI-এর সাহায্যে করা এবং লেখক যাচাই করেছেন।


RuneScript-এর যেসব বৈশিষ্ট্য **আজ** আছে, তার একটি ব্যবহারিক পরিচয়। এই পাতাগুলোর
প্রতিটি সম্পূর্ণ প্রোগ্রাম টেস্ট-সংগ্রহ (`tests/docs_test.go`) কম্পাইল করে দেখে।
কোনোটি কম্পাইল হওয়া বন্ধ হলে বিল্ড ব্যর্থ হয়।

1. [শুরু করা](/bn/docs/getting-started): CLI তৈরি করা, একটি প্রোগ্রাম চালানো, `run --watch`
2. [প্রোগ্রামের গঠন](/bn/docs/program-structure): প্যাকেজ, কমেন্ট, `main`
3. [টাইপ ও ভেরিয়েবল](/bn/docs/types-and-variables): `int`, `uint`, `bool`, `string`, অ্যাসাইনমেন্ট
4. [অপারেটর](/bn/docs/operators): গাণিতিক, তুলনা, লজিক
5. [কন্ট্রোল ফ্লো](/bn/docs/control-flow): `if`, `while`, `for`, `break`, `continue`
6. [ফাংশন](/bn/docs/functions): প্যারামিটার, রিটার্ন মান, রিকার্শন
7. [`trace` দিয়ে আউটপুট](/bn/docs/trace)
8. [ডায়াগনস্টিক তালিকা](/bn/docs/diagnostics): প্রতিটি এরর ও সতর্কবার্তার কোড, `-Werror`, `--allow`
9. [ActionScript 3 থেকে আসছেন?](/bn/docs/coming-from-actionscript)
10. [স্ট্যান্ডার্ড লাইব্রেরি: `std:string`](/bn/docs/std-string): RuneScript-এ Go-র `strings`
11. [JavaScript-এ কম্পাইল](/bn/docs/javascript): `runescript build`, কঠোর টাইপিং কীভাবে বজায় থাকে, `extern` দিয়ে JavaScript কল করা, এবং `runescript dev` দিয়ে লাইভ রিলোড
12. [প্যাকেজ ও ফাইল](/bn/docs/packages-and-files): `use`, একাধিক ফাইলের প্রোগ্রাম, দৃশ্যমানতা
13. [ফ্লোট ও রূপান্তর](/bn/docs/floats-and-conversions): `float`, `float32`, `float64`, `(int) x`
14. [এরর](/bn/docs/errors): `throw`, `try`, `catch`, `finally`, এবং রানটাইম এরর ধরা
15. [`rune:dom` দিয়ে ওয়েব পেজ](/bn/docs/web-pages): কম্পোনেন্ট, যাচাই করা HTML ও SVG টেমপ্লেট, রুন, ইভেন্ট, `$if`, `renderApp`
16. [লেখা ও তালিকা](/bn/docs/text-and-arrays): `+` দিয়ে স্ট্রিং জোড়া লাগানো, ইন্টারপোলেটেড স্ট্রিং `$"…"`, `char`, এবং `Array<T>`
17. [`null` নেই, `any` নেই, জেনেরিক নেই](/bn/docs/no-null-any-generics): কেন, আর অন্য ভাষায় যেখানে `null` লাগে সেখানে `false` কীভাবে ব্যবহার করবেন
18. [সংখ্যার গভীরে](/bn/docs/numbers): `int8` … `uint64`, হেক্স ও বাইনারি লিটারাল, বিট অপারেশন, `std:math`
19. [স্ট্রাক্ট](/bn/docs/structs): মান-টাইপ ঘোষণা, তৈরি ও কপি করা
20. [ফাইল, ইনপুট ও আউটপুট](/bn/docs/files-and-input): `std:io`, `std:process`, `std:fs`, `std:path`, এবং একটি Brainfuck ইন্টারপ্রেটার

সূক্ষ্ম নিয়মের জন্য দেখুন [ভাষার স্পেসিফিকেশন](/docs/spec) (ইংরেজিতে)।
সামনে কী আসছে তা জানতে দেখুন [রোডম্যাপ](/docs/roadmap) (ইংরেজিতে)।

> **এখনো নেই:** ক্লাস। এর কিওয়ার্ড সংরক্ষিত, আর ব্যবহার করলে স্পষ্ট "এখনো তৈরি হয়নি"
> এরর দেখায়। অবজেক্ট, অ্যারে, স্ট্রাক্ট ও কলব্যাকও এখনো JavaScript-এর সীমানা পার হতে
> পারে না।
