// Base class for all expressions
class Expr {
  accept(visitor) {
    throw new Error("This method should be overridden in subclasses.");
  }
}

// Class for binary expressions, e.g., 1 + 2
class Binary extends Expr {
  constructor(left, operator, right) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  accept(visitor) {
    return visitor.visitBinary(this);
  }
}

// Class for literal values, e.g., numbers like 1 or strings like "hello"
class Literal extends Expr {
  constructor(value) {
    super();
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitLiteral(this);
  }
}

// Class for grouping expressions with parentheses, e.g., (1 + 2)
class Grouping extends Expr {
  constructor(expression) {
    super();
    this.expression = expression;
  }

  accept(visitor) {
    return visitor.visitGrouping(this);
  }
}

// Class for unary expressions, e.g., -1
class Unary extends Expr {
  constructor(operator, right) {
    super();
    this.operator = operator;
    this.right = right;
  }

  accept(visitor) {
    return visitor.visitUnary(this);
  }
}

class RpnVisitor {
  visitBinary(expr) {
    return `${expr.left.accept(this)} ${expr.right.accept(this)} ${expr.operator}`;
  }

  visitLiteral(expr) {
    return `${expr.value}`;
  }

  visitGrouping(expr) {
    return expr.expression.accept(this);
  }

  visitUnary(expr) {
    return `${expr.right.accept(this)} ${expr.operator}`;
  }
}

// Example expression: (1 + 2) * (4 - 3)
// You can use this structure to build and test the RPN visitor
const expression = new Binary(
  new Grouping(new Binary(new Literal(1), "+", new Literal(2))),
  "*",
  new Grouping(new Binary(new Literal(4), "-", new Literal(3))),
);

const rpnVisitor = new RpnVisitor();
console.log(expression.accept(rpnVisitor)); // Implement RpnVisitor methods to get this working
