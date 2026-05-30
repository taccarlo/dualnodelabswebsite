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
  selector: 'app-adapter',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './adapter.html',
  styleUrl: './adapter.css'
})
export class AdapterComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'C#';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `// Target interface
interface USBTypeC {
    void charge();
}

// Adaptee (incompatible)
class MicroUSB {
    public void chargeOld() {
        System.out.println("Charging with Micro USB");
    }
}

// Adapter
class MicroUSBAdapter implements USBTypeC {
    private MicroUSB microUsb;

    public MicroUSBAdapter(MicroUSB microUsb) {
        this.microUsb = microUsb;
    }

    public void charge() {
        microUsb.chargeOld();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        MicroUSB oldCable = new MicroUSB();
        USBTypeC adapter = new MicroUSBAdapter(oldCable);
        adapter.charge();
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Target interface
interface USBTypeC {
    fun charge()
}

// Adaptee (incompatible)
class MicroUSB {
    fun chargeOld() {
        println("Charging with Micro USB")
    }
}

// Adapter
class MicroUSBAdapter(private val microUsb: MicroUSB) : USBTypeC {
    override fun charge() {
        microUsb.chargeOld()
    }
}

// Usage
fun main() {
    val oldCable = MicroUSB()
    val adapter: USBTypeC = MicroUSBAdapter(oldCable)
    adapter.charge()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Target interface
interface USBTypeC {
  charge(): void;
}

// Adaptee (incompatible)
class MicroUSB {
  chargeOld(): void {
    console.log("Charging with Micro USB");
  }
}

// Adapter
class MicroUSBAdapter implements USBTypeC {
  constructor(private microUsb: MicroUSB) {}

  charge(): void {
    this.microUsb.chargeOld();
  }
}

// Usage
const oldCable = new MicroUSB();
const adapter: USBTypeC = new MicroUSBAdapter(oldCable);
adapter.charge();`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Target interface
class USBTypeC(ABC):
    @abstractmethod
    def charge(self):
        pass

# Adaptee (incompatible)
class MicroUSB:
    def charge_old(self):
        print("Charging with Micro USB")

# Adapter
class MicroUSBAdapter(USBTypeC):
    def __init__(self, micro_usb: MicroUSB):
        self.micro_usb = micro_usb

    def charge(self):
        self.micro_usb.charge_old()

# Usage
old_cable = MicroUSB()
adapter: USBTypeC = MicroUSBAdapter(old_cable)
adapter.charge()`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;

// Target interface
public interface IUSBTypeC
{
    void Charge();
}

// Adaptee (incompatible)
public class MicroUSB
{
    public void ChargeOld()
    {
        Console.WriteLine("Charging with Micro USB");
    }
}

// Adapter
public class MicroUSBAdapter : IUSBTypeC
{
    private MicroUSB _microUsb;

    public MicroUSBAdapter(MicroUSB microUsb)
    {
        _microUsb = microUsb;
    }

    public void Charge()
    {
        _microUsb.ChargeOld();
    }
}

// Usage
class Program
{
    static void Main()
    {
        var oldCable = new MicroUSB();
        IUSBTypeC adapter = new MicroUSBAdapter(oldCable);
        adapter.Charge();
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
