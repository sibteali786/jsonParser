const JsonElement = require("./jsonElement");
class JsonObject extends JsonElement {
  constructor(pairs) {
    super();
    this.pairs = pairs || {};
  }
  accept(visitor) {
    return visitor.visitJsonObject(this);
  }

  getType() {
    return "object";
  }

  toJsonString() {
    const jsonPairs = Object.entries(this.pairs).map(
      ([key, value]) => `"${key}": ${value.toJsonString()}`,
    );
    return `{${jsonPairs.join(", ")}}`;
  }
}
module.exports = JsonObject;
