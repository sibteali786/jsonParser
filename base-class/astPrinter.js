const JsonElement = require("./jsonElement");
const JsonNumber = require("./JsonNumber");
const JsonString = require("./JsonString");
const JsonObject = require("./JsonObject");
const JsonArray = require("./JsonArray");
const JsonBoolean = require("./JsonBoolean");
const JsonNull = require("./JsonNull");

class AstPrinter {
  print(json = new JsonElement()) {
    return json.accept(this);
  }

  visitJsonString(jsonString) {
    return `"${jsonString.value}"`;
  }

  visitJsonObject(jsonObject) {
    const jsonPairs = Object.entries(jsonObject.pairs).map(
      ([key, value]) =>
        new JsonString(key).accept(this) + " " + value.accept(this),
    );

    return `(object ${jsonPairs.join(" ")})`;
  }
  visitJsonArray(jsonArray) {
    const jsonElements = jsonArray.elements.map((element) =>
      element.accept(this),
    );

    return this.parenthesize("array", ...jsonElements);
  }
  visitJsonNumber(jsonNumber) {
    return jsonNumber.value.toString();
  }

  visitJsonBoolean(jsonBoolean) {
    return jsonBoolean.value.toString();
  }

  visitJsonNull() {
    return "null";
  }
  parenthesize(name, ...elements) {
    let builder = `(${name}`;

    elements.forEach((element) => {
      builder += " ";
      builder += element;
    });

    builder += ")";
    return builder;
  }
}

// Assuming JsonObject, JsonArray, JsonString, JsonNumber, JsonBoolean, and JsonNull are defined and imported

function main() {
  // Create a sample JSON structure
  const jsonObject = new JsonObject({
    name: new JsonString("John Doe"),
    age: new JsonNumber(30),
    married: new JsonBoolean(true),
    children: new JsonArray([new JsonString("Jane"), new JsonString("Joe")]),
    address: new JsonObject({
      street: new JsonString("123 Main St"),
      city: new JsonString("Springfield"),
    }),
    isNull: new JsonNull(),
  });

  // Create an instance of AstPrinter
  const printer = new AstPrinter();

  // Print the AST of the JSON structure
  const result = printer.print(jsonObject);

  // Output the result
  console.log(result);
}

// Run the main function
main();
