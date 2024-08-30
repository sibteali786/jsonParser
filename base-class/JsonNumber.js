class JsonNumber extends JsonElement {
  constructor(value) {
    super();
    this.value = value;
  }

  getType() {
    return "number";
  }

  toJsonString() {
    return this.value.toString();
  }
}
