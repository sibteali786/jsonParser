class JsonArray extends JsonElement {
  constructor(elements) {
    super();
    this.elements = elements || [];
  }

  getType() {
    return "array";
  }

  toJsonString() {
    const jsonElements = this.elements.map((element) => element.toJsonString());
    return `[${jsonElements.join(", ")}]`;
  }
}
