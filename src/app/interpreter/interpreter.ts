import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-interpreter',
  imports: [IdePanelComponent],
  templateUrl: './interpreter.html',
  styleUrl: './interpreter.css'
})
export class InterpreterComponent {
  version = packageJson.version;

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `interface Expression {
    int interpret();
}

class NumberExpression implements Expression {
    private int number;

    NumberExpression(int number) { this.number = number; }

    public int interpret() { return number; }
}

class AddExpression implements Expression {
    private Expression left, right;

    AddExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

class SubtractExpression implements Expression {
    private Expression left, right;

    SubtractExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public int interpret() {
        return left.interpret() - right.interpret();
    }
}

public static void main(String[] args) {
    // (5 + 3) - 2
    Expression expr = new SubtractExpression(
        new AddExpression(
            new NumberExpression(5),
            new NumberExpression(3)
        ),
        new NumberExpression(2)
    );
    System.out.println("Result: " + expr.interpret());
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Expression {
    fun interpret(): Int
}

class NumberExpression(private val number: Int) : Expression {
    override fun interpret() = number
}

class AddExpression(
    private val left: Expression,
    private val right: Expression
) : Expression {
    override fun interpret() = left.interpret() + right.interpret()
}

class SubtractExpression(
    private val left: Expression,
    private val right: Expression
) : Expression {
    override fun interpret() = left.interpret() - right.interpret()
}

fun main() {
    // (5 + 3) - 2
    val expr = SubtractExpression(
        AddExpression(NumberExpression(5), NumberExpression(3)),
        NumberExpression(2)
    )
    println("Result: " + expr.interpret())
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Expression {
    interpret(): number;
}

class NumberExpression implements Expression {
    constructor(private number: number) {}
    interpret(): number { return this.number; }
}

class AddExpression implements Expression {
    constructor(
        private left: Expression,
        private right: Expression
    ) {}
    interpret(): number {
        return this.left.interpret() + this.right.interpret();
    }
}

class SubtractExpression implements Expression {
    constructor(
        private left: Expression,
        private right: Expression
    ) {}
    interpret(): number {
        return this.left.interpret() - this.right.interpret();
    }
}

// (5 + 3) - 2
const expr: Expression = new SubtractExpression(
    new AddExpression(
        new NumberExpression(5),
        new NumberExpression(3)
    ),
    new NumberExpression(2)
);
console.log("Result:", expr.interpret());`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Expression(ABC):
    @abstractmethod
    def interpret(self): pass

class NumberExpression(Expression):
    def __init__(self, number): self.number = number
    def interpret(self): return self.number

class AddExpression(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right
    def interpret(self):
        return self.left.interpret() + self.right.interpret()

class SubtractExpression(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right
    def interpret(self):
        return self.left.interpret() - self.right.interpret()

# (5 + 3) - 2
expr = SubtractExpression(
    AddExpression(NumberExpression(5), NumberExpression(3)),
    NumberExpression(2)
)
print(f"Result: {expr.interpret()}")`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IExpression
{
    int Interpret();
}

public class NumberExpression : IExpression
{
    private int _number;
    public NumberExpression(int number) => _number = number;
    public int Interpret() => _number;
}

public class AddExpression : IExpression
{
    private IExpression _left, _right;
    public AddExpression(IExpression left, IExpression right) =>
        (_left, _right) = (left, right);
    public int Interpret() =>
        _left.Interpret() + _right.Interpret();
}

public class SubtractExpression : IExpression
{
    private IExpression _left, _right;
    public SubtractExpression(IExpression left, IExpression right) =>
        (_left, _right) = (left, right);
    public int Interpret() =>
        _left.Interpret() - _right.Interpret();
}

static void Main()
{
    // (5 + 3) - 2
    IExpression expr = new SubtractExpression(
        new AddExpression(
            new NumberExpression(5),
            new NumberExpression(3)
        ),
        new NumberExpression(2)
    );
    Console.WriteLine($"Result: {expr.Interpret()}");
}`
    }
  };
}
