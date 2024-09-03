// 1. Define a higher-order function to group operations
const createJsonType = (type, value) => {
  const getType = () => type;
  const toJsonString = () => {
    switch (type) {
      case "string":
        return `"${value}"`;
      case "number":
        return value.toString();
      case "array":
        const jsonElements = this.elements.map((element) =>
          element.toJsonString(),
        );
        return `[${jsonElements.join(", ")}]`;
      case "object":
        const jsonPairs = Object.entries(this.pairs).map(
          ([key, value]) => `"${key}": ${value.toJsonString()}`,
        );
        return `{${jsonPairs.join(", ")}}`;
      case "boolean":
        return value.toString();
      case "null":
        return "null";
      default:
        throw new Error("Unsupported type");
    }
  };
  return { getType, toJsonString };
};

// 2. Create instances for different types
const myJsonString = createJsonType("string", "Hello, world!");
const myJsonNumber = createJsonType("number", 42);
const myJsonBoolean = createJsonType("boolean", true);
const myJsonNull = createJsonType("null", null);

// 3. Use the operations
console.log(myJsonString.getType()); // Outputs: "string"
console.log(myJsonString.toJsonString()); // Outputs: "\"Hello, world!\""
console.log(myJsonNumber.toJsonString()); // Outputs: "42"
console.log(myJsonBoolean.toJsonString()); // Outputs: "true"
console.log(myJsonNull.toJsonString()); // Outputs: "null"
