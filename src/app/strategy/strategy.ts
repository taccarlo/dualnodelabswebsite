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

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `// Strategy interface
interface PaymentStrategy {
    void pay(int amount);
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    public CreditCardPayment(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card " + cardNumber);
    }
}

class PayPalPayment implements PaymentStrategy {
    private String email;
    public PayPalPayment(String email) {
        this.email = email;
    }
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using PayPal (" + email + ")");
    }
}

// Context
class ShoppingCart {
    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void checkout(int amount) {
        strategy.pay(amount);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.setStrategy(new CreditCardPayment("1234-5678"));
        cart.checkout(100);
        cart.setStrategy(new PayPalPayment("user@example.com"));
        cart.checkout(200);
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Strategy interface
interface PaymentStrategy {
    fun pay(amount: Int)
}

// Concrete strategies
class CreditCardPayment(private val cardNumber: String) : PaymentStrategy {
    override fun pay(amount: Int) {
        println("Paid $amount using Credit Card $cardNumber")
    }
}

class PayPalPayment(private val email: String) : PaymentStrategy {
    override fun pay(amount: Int) {
        println("Paid $amount using PayPal ($email)")
    }
}

// Context
class ShoppingCart {
    var strategy: PaymentStrategy? = null

    fun checkout(amount: Int) {
        strategy?.pay(amount)
    }
}

// Usage
fun main() {
    val cart = ShoppingCart()
    cart.strategy = CreditCardPayment("1234-5678")
    cart.checkout(100)
    cart.strategy = PayPalPayment("user@example.com")
    cart.checkout(200)
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Strategy interface
interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}
  pay(amount: number): void {
    console.log(\`Paid \${amount} using Credit Card \${this.cardNumber}\`);
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}
  pay(amount: number): void {
    console.log(\`Paid \${amount} using PayPal (\${this.email})\`);
  }
}

// Context
class ShoppingCart {
  private strategy?: PaymentStrategy;

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  checkout(amount: number): void {
    this.strategy?.pay(amount);
  }
}

// Usage
const cart = new ShoppingCart();
cart.setStrategy(new CreditCardPayment("1234-5678"));
cart.checkout(100);
cart.setStrategy(new PayPalPayment("user@example.com"));
cart.checkout(200);`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Strategy interface
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: int):
        pass

# Concrete strategies
class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number: str):
        self.card_number = card_number
    def pay(self, amount: int):
        print(f"Paid {amount} using Credit Card {self.card_number}")

class PayPalPayment(PaymentStrategy):
    def __init__(self, email: str):
        self.email = email
    def pay(self, amount: int):
        print(f"Paid {amount} using PayPal ({self.email})")

# Context
class ShoppingCart:
    def __init__(self):
        self._strategy = None
    def set_strategy(self, strategy: PaymentStrategy):
        self._strategy = strategy
    def checkout(self, amount: int):
        self._strategy.pay(amount)

# Usage
cart = ShoppingCart()
cart.set_strategy(CreditCardPayment("1234-5678"))
cart.checkout(100)
cart.set_strategy(PayPalPayment("user@example.com"))
cart.checkout(200)`
    },
    'C#': {
      lang: 'csharp',
      code: `// Strategy interface
public interface IPaymentStrategy
{
    void Pay(int amount);
}

// Concrete strategies
public class CreditCardPayment : IPaymentStrategy
{
    private string _cardNumber;
    public CreditCardPayment(string cardNumber) => _cardNumber = cardNumber;

    public void Pay(int amount) =>
        Console.WriteLine($"Paid {amount} using Credit Card {_cardNumber}");
}

public class PayPalPayment : IPaymentStrategy
{
    private string _email;
    public PayPalPayment(string email) => _email = email;

    public void Pay(int amount) =>
        Console.WriteLine($"Paid {amount} using PayPal ({_email})");
}

// Context
public class ShoppingCart
{
    private IPaymentStrategy _strategy;

    public void SetStrategy(IPaymentStrategy strategy) => _strategy = strategy;

    public void Checkout(int amount) => _strategy?.Pay(amount);
}

// Usage
class Program
{
    static void Main()
    {
        var cart = new ShoppingCart();
        cart.SetStrategy(new CreditCardPayment("1234-5678"));
        cart.Checkout(100);
        cart.SetStrategy(new PayPalPayment("user@example.com"));
        cart.Checkout(200);
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
