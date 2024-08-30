class JsonObject extends JsonElement {
  constructor(pairs) {
    super();
    this.pairs = pairs || {};
  }

  getType() {
    return "object";
  }

  toJsonString() {
    const jsonPairs = Object.entries(this.pairs).map(
      ([key, value]) => `"${key}": ${value.toJsonString()}`,
    );
    return `{${jsonPairs.join(", ")}}`;
  }
}
