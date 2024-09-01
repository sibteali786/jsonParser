const JsonElement = require("./jsonElement");
class JsonNumber extends JsonElement {
  constructor(value) {
    super();
    this.value = value;
  }
  accept(visitor) {
    return visitor.visitJsonNumber(this);
  }

  getType() {
    return "number";
  }

  toJsonString() {
    return this.value.toString();
  }
}
module.exports = JsonNumber;
