const fs = require("fs");
const readline = require("readline");
const Scanner = require("./scanner");
const ErrorHandler = require("./errorHandler");

class JsonParser {
  static main(args) {
    if (args.length > 1) {
      console.log("Usage: json-parser [script]");
      process.exit(64);
    } else if (args.length === 1) {
      this.runFile(args[0]);
    } else {
      this.runPrompt();
    }
  }

  static runFile(filePath) {
    const data = fs.readFileSync(filePath, "utf8");
    this.run(data);
    if (ErrorHandler.hadError) {
      process.exit(65);
    }
  }

  static runPrompt() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", (line) => {
      this.run(line);
      ErrorHandler.hadError = false;
      rl.prompt();
    });

    rl.on("close", () => {
      console.log("Goodbye!");
      process.exit(0);
    });
  }

  static run(source) {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();

    tokens.forEach((token) => {
      console.log(token);
    });
  }
}

// Simulating command-line arguments (if any)
const args = process.argv.slice(2);
JsonParser.main(args);

module.exports = JsonParser;
