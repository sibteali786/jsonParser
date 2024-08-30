class JsonBoolean extends JsonElement {
  constructor(value) {
    super();
    this.value = value;
  }

  getType() {
    return "boolean";
  }

  toJsonString() {
    return this.value.toString();
  }
}
