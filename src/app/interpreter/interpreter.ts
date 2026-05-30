import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-csharp';

@Component({
  selector: 'app-interpreter',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './interpreter.html',
  styleUrl: './interpreter.css'
})
export class InterpreterComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'C#';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `import java.util.Map;

// Expression interface
interface Expression {
    int interpret(Map<String, Integer> context);
}

// Terminal expression
class NumberExpression implements Expression {
    private int number;
    public NumberExpression(int number) { this.number = number; }
    public int interpret(Map<String, Integer> context) { return number; }
}

// Non-terminal expressions
class AddExpression implements Expression {
    private Expression left, right;
    public AddExpression(Expression left, Expression right) {
        this.left = left; this.right = right;
    }
    public int interpret(Map<String, Integer> context) {
        return left.interpret(context) + right.interpret(context);
    }
}

class SubtractExpression implements Expression {
    private Expression left, right;
    public SubtractExpression(Expression left, Expression right) {
        this.left = left; this.right = right;
    }
    public int interpret(Map<String, Integer> context) {
        return left.interpret(context) - right.interpret(context);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        // (10 + 5) - 3
        Expression expr = new SubtractExpression(
            new AddExpression(new NumberExpression(10), new NumberExpression(5)),
            new NumberExpression(3)
        );
        System.out.println("Result: " + expr.interpret(null));
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Expression interface
interface Expression {
    fun interpret(context: Map<String, Int>): Int
}

// Terminal expression
class NumberExpression(private val number: Int) : Expression {
    override fun interpret(context: Map<String, Int>) = number
}

// Non-terminal expressions
class AddExpression(
    private val left: Expression,
    private val right: Expression
) : Expression {
    override fun interpret(context: Map<String, Int>) =
        left.interpret(context) + right.interpret(context)
}

class SubtractExpression(
    private val left: Expression,
    private val right: Expression
) : Expression {
    override fun interpret(context: Map<String, Int>) =
        left.interpret(context) - right.interpret(context)
}

// Usage
fun main() {
    // (10 + 5) - 3
    val expr = SubtractExpression(
        AddExpression(NumberExpression(10), NumberExpression(5)),
        NumberExpression(3)
    )
    println("Result: " + expr.interpret(emptyMap()))
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Expression interface
interface Expression {
  interpret(context: Record<string, number>): number;
}

// Terminal expression
class NumberExpression implements Expression {
  constructor(private number: number) {}
  interpret(context: Record<string, number>): number {
    return this.number;
  }
}

// Non-terminal expressions
class AddExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Record<string, number>): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

class SubtractExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Record<string, number>): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }
}

// Usage
// (10 + 5) - 3
const expr = new SubtractExpression(
  new AddExpression(new NumberExpression(10), new NumberExpression(5)),
  new NumberExpression(3)
);
console.log("Result:", expr.interpret({}));`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Expression interface
class Expression(ABC):
    @abstractmethod
    def interpret(self, context: dict) -> int:
        pass

# Terminal expression
class NumberExpression(Expression):
    def __init__(self, number: int):
        self.number = number
    def interpret(self, context: dict) -> int:
        return self.number

# Non-terminal expressions
class AddExpression(Expression):
    def __init__(self, left: Expression, right: Expression):
        self.left = left
        self.right = right
    def interpret(self, context: dict) -> int:
        return self.left.interpret(context) + self.right.interpret(context)

class SubtractExpression(Expression):
    def __init__(self, left: Expression, right: Expression):
        self.left = left
        self.right = right
    def interpret(self, context: dict) -> int:
        return self.left.interpret(context) - self.right.interpret(context)

# Usage: (10 + 5) - 3
expr = SubtractExpression(
    AddExpression(NumberExpression(10), NumberExpression(5)),
    NumberExpression(3)
)
print("Result:", expr.interpret({}))`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;
using System.Collections.Generic;

// Expression interface
public interface IExpression
{
    int Interpret(Dictionary<string, int> context);
}

// Terminal expression
public class NumberExpression : IExpression
{
    private int _number;
    public NumberExpression(int number) => _number = number;
    public int Interpret(Dictionary<string, int> context) => _number;
}

// Non-terminal expressions
public class AddExpression : IExpression
{
    private IExpression _left, _right;
    public AddExpression(IExpression left, IExpression right)
    {
        _left = left; _right = right;
    }
    public int Interpret(Dictionary<string, int> context) =>
        _left.Interpret(context) + _right.Interpret(context);
}

public class SubtractExpression : IExpression
{
    private IExpression _left, _right;
    public SubtractExpression(IExpression left, IExpression right)
    {
        _left = left; _right = right;
    }
    public int Interpret(Dictionary<string, int> context) =>
        _left.Interpret(context) - _right.Interpret(context);
}

// Usage
class Program
{
    static void Main()
    {
        // (10 + 5) - 3
        IExpression expr = new SubtractExpression(
            new AddExpression(new NumberExpression(10), new NumberExpression(5)),
            new NumberExpression(3)
        );
        Console.WriteLine("Result: " + expr.Interpret(null));
    }
}`
    }
  };

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    const html = Prism.highlight(sample.code, Prism.languages[sample.lang], sample.lang);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(lang: string): string {
    return this.codeSamples[lang]?.code || '';
  }

  copyCode() {
    const code = this.getCode(this.activeLang);
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
