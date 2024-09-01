const JsonElement = require("./jsonElement");
class JsonBoolean extends JsonElement {
  constructor(value) {
    super();
    this.value = value;
  }
  accept(visitor) {
    return visitor.visitJsonBoolean(this);
  }

  getType() {
    return "boolean";
  }

  toJsonString() {
    return this.value.toString();
  }
}
module.exports = JsonBoolean;
