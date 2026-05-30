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
  selector: 'app-strategy',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './strategy.html',
  styleUrl: './strategy.css'
})
export class StrategyComponent {
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
      code: `interface PaymentStrategy {
    void pay(double amount);
}

class CreditCardPayment implements PaymentStrategy {
    private String name;
    CreditCardPayment(String name) { this.name = name; }

    public void pay(double amount) {
        System.out.println(name
            + " paid $" + amount + " with Credit Card");
    }
}

class PayPalPayment implements PaymentStrategy {
    private String email;
    PayPalPayment(String email) { this.email = email; }

    public void pay(double amount) {
        System.out.println(email
            + " paid $" + amount + " with PayPal");
    }
}

class BitcoinPayment implements PaymentStrategy {
    private String wallet;
    BitcoinPayment(String wallet) { this.wallet = wallet; }

    public void pay(double amount) {
        System.out.println(wallet
            + " paid $" + amount + " with Bitcoin");
    }
}

class ShoppingCart {
    private PaymentStrategy strategy;

    void setPaymentStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    void checkout(double amount) {
        strategy.pay(amount);
    }
}

public static void main(String[] args) {
    ShoppingCart cart = new ShoppingCart();

    cart.setPaymentStrategy(
        new CreditCardPayment("Alice"));
    cart.checkout(100.0);

    cart.setPaymentStrategy(
        new PayPalPayment("alice@example.com"));
    cart.checkout(50.0);
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface PaymentStrategy {
    fun pay(amount: Double)
}

class CreditCardPayment(private val name: String) : PaymentStrategy {
    override fun pay(amount: Double) =
        println("$name paid $$amount with Credit Card")
}

class PayPalPayment(private val email: String) : PaymentStrategy {
    override fun pay(amount: Double) =
        println("$email paid $$amount with PayPal")
}

class BitcoinPayment(private val wallet: String) : PaymentStrategy {
    override fun pay(amount: Double) =
        println("$wallet paid $$amount with Bitcoin")
}

class ShoppingCart {
    private var strategy: PaymentStrategy? = null

    fun setPaymentStrategy(strategy: PaymentStrategy) {
        this.strategy = strategy
    }

    fun checkout(amount: Double) {
        strategy?.pay(amount)
    }
}

fun main() {
    val cart = ShoppingCart()
    cart.setPaymentStrategy(CreditCardPayment("Alice"))
    cart.checkout(100.0)
    cart.setPaymentStrategy(PayPalPayment("alice@example.com"))
    cart.checkout(50.0)
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
    constructor(private name: string) {}

    pay(amount: number): void {
        console.log(this.name, "paid $" + amount, "with Credit Card");
    }
}

class PayPalPayment implements PaymentStrategy {
    constructor(private email: string) {}

    pay(amount: number): void {
        console.log(this.email, "paid $" + amount, "with PayPal");
    }
}

class BitcoinPayment implements PaymentStrategy {
    constructor(private wallet: string) {}

    pay(amount: number): void {
        console.log(this.wallet, "paid $" + amount, "with Bitcoin");
    }
}

class ShoppingCart {
    private strategy?: PaymentStrategy;

    setPaymentStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    checkout(amount: number): void {
        this.strategy?.pay(amount);
    }
}

const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment("Alice"));
cart.checkout(100.0);
cart.setPaymentStrategy(new PayPalPayment("alice@example.com"));
cart.checkout(50.0);`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: float): pass

class CreditCardPayment(PaymentStrategy):
    def __init__(self, name): self.name = name
    def pay(self, amount):
        print(f"{self.name} paid \${amount} with Credit Card")

class PayPalPayment(PaymentStrategy):
    def __init__(self, email): self.email = email
    def pay(self, amount):
        print(f"{self.email} paid \${amount} with PayPal")

class BitcoinPayment(PaymentStrategy):
    def __init__(self, wallet): self.wallet = wallet
    def pay(self, amount):
        print(f"{self.wallet} paid \${amount} with Bitcoin")

class ShoppingCart:
    def set_payment_strategy(self, strategy: PaymentStrategy):
        self.strategy = strategy

    def checkout(self, amount: float):
        self.strategy.pay(amount)

cart = ShoppingCart()
cart.set_payment_strategy(CreditCardPayment("Alice"))
cart.checkout(100.0)
cart.set_payment_strategy(PayPalPayment("alice@example.com"))
cart.checkout(50.0)`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IPaymentStrategy
{
    void Pay(double amount);
}

public class CreditCardPayment : IPaymentStrategy
{
    private string _name;
    public CreditCardPayment(string name) => _name = name;
    public void Pay(double amount) =>
        Console.WriteLine(_name + " paid $" + amount + " with Credit Card");
}

public class PayPalPayment : IPaymentStrategy
{
    private string _email;
    public PayPalPayment(string email) => _email = email;
    public void Pay(double amount) =>
        Console.WriteLine(_email + " paid $" + amount + " with PayPal");
}

public class BitcoinPayment : IPaymentStrategy
{
    private string _wallet;
    public BitcoinPayment(string wallet) => _wallet = wallet;
    public void Pay(double amount) =>
        Console.WriteLine(_wallet + " paid $" + amount + " with Bitcoin");
}

public class ShoppingCart
{
    private IPaymentStrategy? _strategy;

    public void SetPaymentStrategy(IPaymentStrategy strategy) =>
        _strategy = strategy;

    public void Checkout(double amount) =>
        _strategy?.Pay(amount);
}

static void Main()
{
    var cart = new ShoppingCart();
    cart.SetPaymentStrategy(new CreditCardPayment("Alice"));
    cart.Checkout(100.0);
    cart.SetPaymentStrategy(new PayPalPayment("alice@example.com"));
    cart.Checkout(50.0);
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
