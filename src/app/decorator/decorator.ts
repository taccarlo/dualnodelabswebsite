import { Component, inject, HostListener } from '@angular/core';
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
  codeFlex = '4 1 0';
  infoFlex = '6 1 0';
  isDragging = false;
  private startX = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) { if (!this.isDragging) return; this.doResize(e.clientX); }
  @HostListener('document:mouseup')
  onMouseUp() { this.isDragging = false; }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault(); this.isDragging = true;
    this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }

  private doResize(clientX: number) {
    const dp = (document.querySelector('.dp-page') as HTMLElement);
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width * 100;
    const clamped = Math.max(20, Math.min(70, pct));
    this.codeFlex = `${clamped} 1 0`;
    this.infoFlex = `${100 - clamped} 1 0`;
  }

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `interface Coffee {
    double cost();
    String description();
}

class SimpleCoffee implements Coffee {
    public double cost() { return 2.0; }
    public String description() { return "Simple Coffee"; }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;

    CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    public double cost() { return coffee.cost(); }
    public String description() { return coffee.description(); }
}

class Milk extends CoffeeDecorator {
    Milk(Coffee coffee) { super(coffee); }
    public double cost() { return coffee.cost() + 0.5; }
    public String description() {
        return coffee.description() + " + Milk";
    }
}

class Sugar extends CoffeeDecorator {
    Sugar(Coffee coffee) { super(coffee); }
    public double cost() { return coffee.cost() + 0.3; }
    public String description() {
        return coffee.description() + " + Sugar";
    }
}

public static void main(String[] args) {
    Coffee coffee = new SimpleCoffee();
    coffee = new Milk(coffee);
    coffee = new Sugar(coffee);
    System.out.println(coffee.description()
        + " $" + coffee.cost());
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Coffee {
    fun cost(): Double
    fun description(): String
}

class SimpleCoffee : Coffee {
    override fun cost() = 2.0
    override fun description() = "Simple Coffee"
}

open class CoffeeDecorator(
    protected val coffee: Coffee
) : Coffee {
    override fun cost() = coffee.cost()
    override fun description() = coffee.description()
}

class Milk(coffee: Coffee) : CoffeeDecorator(coffee) {
    override fun cost() = coffee.cost() + 0.5
    override fun description() = coffee.description() + " + Milk"
}

class Sugar(coffee: Coffee) : CoffeeDecorator(coffee) {
    override fun cost() = coffee.cost() + 0.3
    override fun description() = coffee.description() + " + Sugar"
}

fun main() {
    val coffee = Sugar(Milk(SimpleCoffee()))
    println("\${coffee.description()} \${coffee.cost()}")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Coffee {
    cost(): number;
    description(): string;
}

class SimpleCoffee implements Coffee {
    cost() { return 2.0; }
    description() { return "Simple Coffee"; }
}

abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}

    cost() { return this.coffee.cost(); }
    description() { return this.coffee.description(); }
}

class Milk extends CoffeeDecorator {
    cost() { return this.coffee.cost() + 0.5; }
    description() { return this.coffee.description() + " + Milk"; }
}

class Sugar extends CoffeeDecorator {
    cost() { return this.coffee.cost() + 0.3; }
    description() { return this.coffee.description() + " + Sugar"; }
}

let coffee: Coffee = new SimpleCoffee();
coffee = new Milk(coffee);
coffee = new Sugar(coffee);
console.log(coffee.description(), "$" + coffee.cost());`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Coffee(ABC):
    @abstractmethod
    def cost(self): pass
    @abstractmethod
    def description(self): pass

class SimpleCoffee(Coffee):
    def cost(self): return 2.0
    def description(self): return "Simple Coffee"

class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self.coffee = coffee
    def cost(self): return self.coffee.cost()
    def description(self): return self.coffee.description()

class Milk(CoffeeDecorator):
    def cost(self): return self.coffee.cost() + 0.5
    def description(self): return self.coffee.description() + " + Milk"

class Sugar(CoffeeDecorator):
    def cost(self): return self.coffee.cost() + 0.3
    def description(self): return self.coffee.description() + " + Sugar"

coffee = SimpleCoffee()
coffee = Milk(coffee)
coffee = Sugar(coffee)
print(f"{coffee.description()} \${coffee.cost()}")`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface ICoffee
{
    double Cost();
    string Description();
}

public class SimpleCoffee : ICoffee
{
    public double Cost() => 2.0;
    public string Description() => "Simple Coffee";
}

public abstract class CoffeeDecorator : ICoffee
{
    protected ICoffee _coffee;
    public CoffeeDecorator(ICoffee coffee) => _coffee = coffee;
    public virtual double Cost() => _coffee.Cost();
    public virtual string Description() => _coffee.Description();
}

public class Milk : CoffeeDecorator
{
    public Milk(ICoffee coffee) : base(coffee) {}
    public override double Cost() => _coffee.Cost() + 0.5;
    public override string Description() =>
        _coffee.Description() + " + Milk";
}

public class Sugar : CoffeeDecorator
{
    public Sugar(ICoffee coffee) : base(coffee) {}
    public override double Cost() => _coffee.Cost() + 0.3;
    public override string Description() =>
        _coffee.Description() + " + Sugar";
}

static void Main()
{
    ICoffee coffee = new SimpleCoffee();
    coffee = new Milk(coffee);
    coffee = new Sugar(coffee);
        Console.WriteLine(_coffee.Description() + " $" + _coffee.Cost());
}`
    }
  };

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    const html = Prism.highlight(sample.code, Prism.languages[sample.lang], sample.lang);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(lang: string): string { return this.codeSamples[lang]?.code || ''; }

  copyCode() {
    const code = this.getCode(this.activeLang);
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true; setTimeout(() => this.copied = false, 2000);
    });
  }

  get currentLang() { return this.translateService.currentLang(); }
  toggleLanguage() { this.translateService.toggleLanguage(); }
}
