class ErrorHandler {
  static hadError = false;

  static error(line, message) {
    this.report(line, "", message);
  }

  static report(line, where, message) {
    console.error(`[line ${line}] Error${where}: ${message}`);
    this.hadError = true;
  }
}

module.exports = ErrorHandler;
