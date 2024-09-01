const JsonElement = require("./jsonElement");
class JsonString extends JsonElement {
  constructor(value) {
    super();
    this.value = value;
  }
  accept(visitor) {
    return visitor.visitJsonString(this);
  }

  getType() {
    return "string";
  }

  toJsonString() {
    return `"${this.value}"`;
  }
}
module.exports = JsonString;
