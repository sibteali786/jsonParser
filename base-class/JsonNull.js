class JsonNull extends JsonElement {
  constructor() {
    super();
  }

  getType() {
    return "null";
  }

  toJsonString() {
    return "null";
  }
}
