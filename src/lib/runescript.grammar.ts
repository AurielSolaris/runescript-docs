// TextMate grammar for RuneScript, used by Shiki for ```actionscript and ```runescript fences.
// Keyword lists follow LANGUAGE_SPEC.md §2.3.
//
// Patterns are written as regex literals (.source) so they need no string escaping.
// Shiki's JavaScript regex engine mishandles some escaped punctuation such as \( and \|,
// so those characters appear in classes ([(], [|]) instead.
import type { LanguageRegistration } from "shiki";

const re = (r: RegExp) => r.source;

export const runescript: LanguageRegistration = {
  name: "runescript",
  scopeName: "source.runescript",
  aliases: ["actionscript", "rune"],
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#numbers" },
    { include: "#declarations" },
    { include: "#keywords" },
    { include: "#calls" },
    { include: "#operators" },
  ],
  repository: {
    comments: {
      patterns: [
        { name: "comment.line.double-slash.runescript", match: re(/\/\/.*$/) },
        { name: "comment.block.runescript", begin: re(/\/[*]/), end: re(/[*]\//) },
      ],
    },
    strings: {
      name: "string.quoted.double.runescript",
      begin: '"',
      end: re(/"|$/),
      patterns: [{ name: "constant.character.escape.runescript", match: re(/[\\]./) }],
    },
    numbers: { name: "constant.numeric.runescript", match: re(/\b\d+(?:[.]\d+)?(?:[eE][-+]?\d+)?\b/) },
    declarations: {
      patterns: [
        {
          match: re(/\b(package)\s+([A-Za-z_][\w.]*)/),
          captures: { 1: { name: "keyword.other.package.runescript" }, 2: { name: "entity.name.namespace.runescript" } },
        },
        {
          // public int(int) name(  — the return type may itself be a function type
          match: re(/\b(public|protected|private)\s+([A-Za-z_]\w*(?:[(][^)]*[)])?)\s+([A-Za-z_]\w*)\s*(?=[(])/),
          captures: {
            1: { name: "storage.modifier.runescript" },
            2: { patterns: [{ include: "#keywords" }] },
            3: { name: "entity.name.function.runescript" },
          },
        },
      ],
    },
    keywords: {
      patterns: [
        { name: "keyword.control.runescript", match: re(/\b(return|if|else|while|for|break|continue|use|try|catch|finally|throw)\b/) },
        { name: "keyword.operator.new.runescript", match: re(/\bnew\b/) },
        { name: "storage.modifier.runescript", match: re(/\b(public|protected|private)\b/) },
        { name: "keyword.other.package.runescript", match: re(/\bpackage\b/) },
        { name: "storage.type.runescript", match: re(/\b(int|sint|uint|bool|string|void|float|float32|float64)\b/) },
        { name: "support.class.error.runescript", match: re(/\b(Error|RangeError|TypeError|ArgumentError)\b/) },
        { name: "constant.language.runescript", match: re(/\b(true|false|NaN|Infinity)\b/) },
        {
          name: "invalid.deprecated.reserved.runescript",
          match: re(/\b(class|struct|char|array|matrix|u?int(8|16|32|64))\b/),
        },
      ],
    },
    calls: {
      patterns: [
        { name: "support.function.builtin.runescript", match: re(/\b(trace|isNaN|isFinite)\b/) },
        { name: "entity.name.function.call.runescript", match: re(/\b[A-Za-z_]\w*(?=\s*[(])/) },
      ],
    },
    operators: {
      patterns: [
        { name: "storage.type.function.arrow.runescript", match: "=>" },
        { name: "keyword.operator.runescript", match: re(/[+]{2}|--|[-+*\/%]=?|==|!=|<=|>=|&&|[|]{2}|[<>!]/) },
        { name: "keyword.operator.assignment.runescript", match: "=" },
      ],
    },
  },
};
