class Token {
  constructor(type, lexeme, literal, line) {
    this.type = type; // e.g., TokenType.NUMBER
    this.lexeme = lexeme; // The raw text of the token (e.g., "123")
    this.literal = literal; // The parsed value (e.g., 123)
    this.line = line; // Line number where the token was found
  }

  toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}

module.exports = Token;
