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
  selector: 'app-decorator',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './decorator.html',
  styleUrl: './decorator.css'
})
export class DecoratorComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `// Component interface
interface Coffee {
    String getDescription();
    double getCost();
}

// Concrete component
class SimpleCoffee implements Coffee {
    public String getDescription() { return "Simple coffee"; }
    public double getCost() { return 2.0; }
}

// Base decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
    public String getDescription() { return coffee.getDescription(); }
    public double getCost() { return coffee.getCost(); }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Milk"; }
    public double getCost() { return coffee.getCost() + 0.5; }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) { super(coffee); }
    public String getDescription() { return coffee.getDescription() + ", Sugar"; }
    public double getCost() { return coffee.getCost() + 0.3; }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Coffee coffee = new SimpleCoffee();
        coffee = new MilkDecorator(coffee);
        coffee = new SugarDecorator(coffee);
        System.out.println(coffee.getDescription() +
                           " -> $" + coffee.getCost());
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Component interface
interface Coffee {
    fun getDescription(): String
    fun getCost(): Double
}

// Concrete component
class SimpleCoffee : Coffee {
    override fun getDescription() = "Simple coffee"
    override fun getCost() = 2.0
}

// Base decorator
open class CoffeeDecorator(protected val coffee: Coffee) : Coffee {
    override fun getDescription() = coffee.getDescription()
    override fun getCost() = coffee.getCost()
}

// Concrete decorators
class MilkDecorator(coffee: Coffee) : CoffeeDecorator(coffee) {
    override fun getDescription() = coffee.getDescription() + ", Milk"
    override fun getCost() = coffee.getCost() + 0.5
}

class SugarDecorator(coffee: Coffee) : CoffeeDecorator(coffee) {
    override fun getDescription() = coffee.getDescription() + ", Sugar"
    override fun getCost() = coffee.getCost() + 0.3
}

// Usage
fun main() {
    var coffee: Coffee = SimpleCoffee()
    coffee = MilkDecorator(coffee)
    coffee = SugarDecorator(coffee)
    println("\${coffee.getDescription()} -> \$\${coffee.getCost()}")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Component interface
interface Coffee {
  getDescription(): string;
  getCost(): number;
}

// Concrete component
class SimpleCoffee implements Coffee {
  getDescription() { return "Simple coffee"; }
  getCost() { return 2.0; }
}

// Base decorator
abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  getDescription() { return this.coffee.getDescription(); }
  getCost() { return this.coffee.getCost(); }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  getDescription() { return this.coffee.getDescription() + ", Milk"; }
  getCost() { return this.coffee.getCost() + 0.5; }
}

class SugarDecorator extends CoffeeDecorator {
  getDescription() { return this.coffee.getDescription() + ", Sugar"; }
  getCost() { return this.coffee.getCost() + 0.3; }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.getDescription() + " -> $" + coffee.getCost());`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Component interface
class Coffee(ABC):
    @abstractmethod
    def get_description(self) -> str: pass
    @abstractmethod
    def get_cost(self) -> float: pass

# Concrete component
class SimpleCoffee(Coffee):
    def get_description(self) -> str:
        return "Simple coffee"
    def get_cost(self) -> float:
        return 2.0

# Base decorator
class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee
    def get_description(self) -> str:
        return self._coffee.get_description()
    def get_cost(self) -> float:
        return self._coffee.get_cost()

# Concrete decorators
class MilkDecorator(CoffeeDecorator):
    def get_description(self) -> str:
        return self._coffee.get_description() + ", Milk"
    def get_cost(self) -> float:
        return self._coffee.get_cost() + 0.5

class SugarDecorator(CoffeeDecorator):
    def get_description(self) -> str:
        return self._coffee.get_description() + ", Sugar"
    def get_cost(self) -> float:
        return self._coffee.get_cost() + 0.3

# Usage
coffee: Coffee = SimpleCoffee()
coffee = MilkDecorator(coffee)
coffee = SugarDecorator(coffee)
print(f"{coffee.get_description()} -> \${coffee.get_cost()}")`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;

// Component interface
public interface ICoffee
{
    string GetDescription();
    double GetCost();
}

// Concrete component
public class SimpleCoffee : ICoffee
{
    public string GetDescription() => "Simple coffee";
    public double GetCost() => 2.0;
}

// Base decorator
public abstract class CoffeeDecorator : ICoffee
{
    protected ICoffee Coffee;
    public CoffeeDecorator(ICoffee coffee) => Coffee = coffee;
    public virtual string GetDescription() => Coffee.GetDescription();
    public virtual double GetCost() => Coffee.GetCost();
}

// Concrete decorators
public class MilkDecorator : CoffeeDecorator
{
    public MilkDecorator(ICoffee coffee) : base(coffee) { }
    public override string GetDescription() =>
        Coffee.GetDescription() + ", Milk";
    public override double GetCost() => Coffee.GetCost() + 0.5;
}

public class SugarDecorator : CoffeeDecorator
{
    public SugarDecorator(ICoffee coffee) : base(coffee) { }
    public override string GetDescription() =>
        Coffee.GetDescription() + ", Sugar";
    public override double GetCost() => Coffee.GetCost() + 0.3;
}

// Usage
class Program
{
    static void Main()
    {
        ICoffee coffee = new SimpleCoffee();
        coffee = new MilkDecorator(coffee);
        coffee = new SugarDecorator(coffee);
        Console.WriteLine($"{coffee.GetDescription()} -> $\${coffee.GetCost()}");
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
