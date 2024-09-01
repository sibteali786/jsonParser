const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const classes = [
  {
    className: "JsonObject",
    fields: "pairs",
    methods: ["getType", "toJsonString"],
  },
  {
    className: "JsonArray",
    fields: "elements",
    methods: ["getType", "toJsonString", "addElement"],
  },
  {
    className: "JsonString",
    fields: "value",
    methods: ["getType", "toJsonString"],
  },
  {
    className: "JsonNumber",
    fields: "value",
    methods: ["getType", "toJsonString"],
  },
  {
    className: "JsonBoolean",
    fields: "value",
    methods: ["getType", "toJsonString"],
  },
  {
    className: "JsonNull",
    fields: "",
    methods: ["getType", "toJsonString"],
  },
];

const script = (classes) => {
  const dir = "./base-class";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  classes.forEach(async (element) => {
    const className = element.className;
    const fields = element.fields;
    const methods = element.methods;
    let code = defineType(className, fields, methods);

    // Format the generated code with Prettier
    // Format the generated code with Prettier
    try {
      code = await prettier.format(code, { parser: "babel" });
    } catch (err) {
      console.error(`Prettier failed for ${className}.js:`, err);
    }

    // Write the formatted code to a file
    fs.writeFileSync(path.join(dir, `${className}.js`), code);
    console.log(`${className}.js has been generated and formatted.`);
  });
};

function defineType(name, fields, methods) {
  let typeMapping = {
    JsonObject: "object",
    JsonArray: "array",
    JsonString: "string",
    JsonNumber: "number",
    JsonBoolean: "boolean",
    JsonNull: "null",
  };

  let code = `const JsonElement = require("./jsonElement");\n`;

  code += `class ${name} extends JsonElement {
    constructor(${name === "JsonNull" ? "" : fields}) {
      super();
      ${name === "JsonObject" ? `this.${fields} = ${fields} || {};` : name === "JsonArray" ? `this.${fields} = ${fields} || [];` : name !== "JsonNull" ? `this.${fields} = ${fields};` : ""}
    }\n`;
  // handling accept method of visitor interface
  code += `accept(visitor){
  	return visitor.visit${name}(this);
  }\n`;
  methods.forEach((method) => {
    if (method === "getType") {
      code += `\n  getType() {
        return "${typeMapping[name]}";
      }\n`;
    }

    if (method === "toJsonString") {
      code += `\n  toJsonString() {\n`;

      if (typeMapping[name] === "object") {
        code += `    const jsonPairs = Object.entries(this.pairs).map(([key, value]) => \`"\${key}": \${value.toJsonString()}\`);
        return \`{\${jsonPairs.join(", ")}}\`;\n`;
      }

      if (typeMapping[name] === "array") {
        code += `    const jsonElements = this.elements.map(element => element.toJsonString());
        return \`[\${jsonElements.join(", ")}]\`;\n`;
      }

      if (typeMapping[name] === "string") {
        code += `    return \`"\${this.value}"\`;\n`;
      }

      if (typeMapping[name] === "number") {
        code += `    return this.value.toString();\n`;
      }

      if (typeMapping[name] === "boolean") {
        code += `    return this.value.toString();\n`;
      }

      if (typeMapping[name] === "null") {
        code += `    return "null";\n`;
      }

      code += `  }\n`;
    }
  });

  code += `}\n`;

  code += `module.exports = ${name}`;
  return code;
}

script(classes);
