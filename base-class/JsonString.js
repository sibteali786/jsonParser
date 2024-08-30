class JsonString extends JsonElement {
  constructor(value) {
    super();
    this.value = value;
  }

  getType() {
    return "string";
  }

  toJsonString() {
    return `"${this.value}"`;
  }
}
