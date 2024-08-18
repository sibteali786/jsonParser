const Token = require("./token");
const TokenType = require("./tokenType");
const ErrorHandler = require("./errorHandler");
class Scanner {
  constructor(source) {
    this.source = source; // The source code as a string
    this.tokens = []; // List to hold the tokens

    // for better tracking stuff

    this.start = 0; // Start of the current lexeme
    this.current = 0; // Current position in the source code
    this.line = 1; // Line number for error reporting
  }
  scanTokens() {
    while (!this.isAtEnd()) {
      // We are at the beginning of the next lexeme.
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
    return this.tokens;
  }

  scanToken() {
    const c = this.advance();
    switch (c) {
      case "{":
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case "[":
        this.addToken(TokenType.LEFT_BRACKET);
        break;
      case "]":
        this.addToken(TokenType.RIGHT_BRACKET);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      case ":":
        this.addToken(TokenType.COLON);
        break;

      // Handle string literals
      case '"':
        this.string();
        break;
      // handling whitespace
      case "\n":
        this.line++;
        break;
      case " ":
      case "\t":
      case "\r":
        break;
      // Handle numbers
      default:
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlpha(c)) {
          this.identifier(); // For `true`, `false`, `null`
        } else {
          ErrorHandler.error(this.line, "Unexpected character."); // Use ErrorHandler.error directly
        }
        break;
    }
  }
  addToken(type) {
    this.addTokenWithLiteral(type, null);
  }

  addTokenWithLiteral(type, literal) {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line));
  }
  string() {
    let value = "";
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === "\n") this.line++;
      if (this.peek() === "\\") {
        this.advance();
        switch (this.peek()) {
          case '"':
          case "\\":
          case "b":
          case "f":
          case "n":
          case "r":
          case "t":
            value += this.convertEscapeSequence(this.peek());
            this.advance();
            break;
          case "u":
            value += this.unicodeEscape();
            break;
          default:
            ErrorHandler.error(this.line, "Invalid escape character.");
            return;
        }
      } else {
        value += this.advance();
      }
    }

    if (this.isAtEnd()) {
      ErrorHandler.error(this.line, "Unterminated string.");
      return;
    }

    // The closing "
    this.advance();
    // adding the token
    this.addToken(TokenType.STRING, value);
  }
  convertEscapeSequence(char) {
    switch (char) {
      case '"':
        return '"';
      case "\\":
        return "\\";
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "n":
        return "\n";
      case "r":
        return "\r";
      case "t":
        return "\t";
      default:
        return "";
    }
  }
  unicodeEscape() {
    let hex = "";
    for (let i = 0; i < 4; i++) {
      if (this.isHexDigit(this.peek())) {
        hex += this.advance();
      } else {
        ErrorHandler.error(this.line, "Invalid Unicode escape sequence.");
        return "";
      }
    }
    return String.fromCharCode(parseInt(hex, 16));
  }

  isHexDigit(c) {
    return (
      (c >= "0" && c <= "9") || (c >= "a" && c <= "f") || (c >= "A" && c <= "F")
    );
  }
  number() {
    while (this.isDigit(this.peek())) this.advance();

    // Look for a fractional part
    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      // Consume the "."
      this.advance();

      while (this.isDigit(this.peek())) this.advance();
    }

    const value = parseFloat(this.source.substring(this.start, this.current));
    this.addToken(TokenType.NUMBER, value);
  }

  identifier() {
    while (this.isAlphaNumeric(this.peek())) this.advance();

    const text = this.source.substring(this.start, this.current);

    // Match against the reserved words in JSON (true, false, null)
    let type;
    switch (text) {
      case "true":
        type = TokenType.TRUE;
        break;
      case "false":
        type = TokenType.FALSE;
        break;
      case "null":
        type = TokenType.NULL;
        break;
      default:
        ErrorHandler.error(this.line, "Unexpected identifier.");
        return;
    }

    this.addToken(type);
  }

  advance() {
    return this.source[this.current++];
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }
  peek() {
    if (this.isAtEnd()) return "\0";
    return this.source[this.current];
  }

  peekNext() {
    if (this.current + 1 >= this.source.length) return "\0";
    return this.source[this.current + 1];
  }

  isDigit(c) {
    return c >= "0" && c <= "9";
  }

  isAlpha(c) {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
  }

  isAlphaNumeric(c) {
    return this.isAlpha(c) || this.isDigit(c);
  }
}

module.exports = Scanner;
