const JsonElement = require("./jsonElement");
class JsonNull extends JsonElement {
  constructor() {
    super();
  }
  accept(visitor) {
    return visitor.visitJsonNull(this);
  }

  getType() {
    return "null";
  }

  toJsonString() {
    return "null";
  }
}
module.exports = JsonNull;
