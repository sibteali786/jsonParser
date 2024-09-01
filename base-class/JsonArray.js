const JsonElement = require("./jsonElement");
class JsonArray extends JsonElement {
  constructor(elements) {
    super();
    this.elements = elements || [];
  }
  accept(visitor) {
    return visitor.visitJsonArray(this);
  }

  getType() {
    return "array";
  }

  toJsonString() {
    const jsonElements = this.elements.map((element) => element.toJsonString());
    return `[${jsonElements.join(", ")}]`;
  }
}
module.exports = JsonArray;
