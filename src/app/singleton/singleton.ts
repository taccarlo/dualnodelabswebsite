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

@Component({
  selector: 'app-singleton',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './singleton.html',
  styleUrl: './singleton.css'
})
export class SingletonComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    public static void main(String[] args) {
        Singleton s = Singleton.getInstance();
        System.out.println("Hello World from Singleton!");
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `object Singleton {
    fun greet() {
        println("Hello World from Singleton!")
    }
}

fun main() {
    Singleton.greet()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class Singleton {
    private static instance: Singleton;

    private constructor() {}

    static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    greet(): void {
        console.log("Hello World from Singleton!");
    }
}

const s = Singleton.getInstance();
s.greet();`
    },
    Python: {
      lang: 'python',
      code: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def greet(self):
        print("Hello World from Singleton!")

s = Singleton()
s.greet()`
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
