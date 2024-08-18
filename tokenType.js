const TokenType = Object.freeze({
  // Single-character tokens.
  LEFT_BRACKET: "LEFT_BRACKET", // [
  RIGHT_BRACKET: "RIGHT_BRACKET", // ]
  LEFT_BRACE: "LEFT_BRACE", // {
  RIGHT_BRACE: "RIGHT_BRACE", // }
  COLON: "COLON",
  COMMA: "COMMA",

  // LITERALS
  STRING: "STRING", // "string"
  NUMBER: "NUMBER", // 123
  TRUE: "TRUE", // true
  FALSE: "FALSE", // false
  NULL: "NULL", // null

  // End of file.
  EOF: "EOF",
});

module.exports = TokenType;
