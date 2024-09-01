class JsonElement {
  constructor() {
    if (new.target === JsonElement) {
      throw new TypeError("Cannot construct JSONElement instances directly");
    }
  }

  static JsonVisitor = class {
    visitJsonObject(jsonObject) {}
    visitJsonArray(jsonArray) {}
    visitJsonString(jsonString) {}
    visitJsonNumber(jsonNumber) {}
    visitJsonBoolean(jsonBoolean) {}
    visitJsonNull(jsonNull) {}
  };

  // Method to identify the type of the JSON element.
  getType() {
    throw new Error("getType() must be implemented in subclasses");
  }

  // Optionally, a method to accept a visitor (if implementing the Visitor pattern).
  accept(visitor) {
    throw new Error("accept(visitor) must be implemented in subclasses");
  }

  // Optionally, a method to convert the element back to its JSON string representation.
  toJSONString() {
    throw new Error("toJSONString() must be implemented in subclasses");
  }
}

module.exports = JsonElement;
