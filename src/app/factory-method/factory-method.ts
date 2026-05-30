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
  selector: 'app-factory-method',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './factory-method.html',
  styleUrl: './factory-method.css'
})
export class FactoryMethodComponent {
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
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.doResize(e.clientX);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDragging = true;
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.startX = cx;
  }

  private doResize(clientX: number) {
    const dp = (document.querySelector('.dp-page') as HTMLElement);
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width * 100;
    const clamped = Math.max(30, Math.min(80, pct));
    this.codeFlex = `${clamped} 1 0`;
    this.infoFlex = `${100 - clamped} 1 0`;
  }

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `interface Document {
    void open();
    void close();
}

class PdfDocument implements Document {
    public void open() {
        System.out.println("Opening PDF...");
    }
    public void close() {
        System.out.println("Closing PDF...");
    }
}

class WordDocument implements Document {
    public void open() {
        System.out.println("Opening Word...");
    }
    public void close() {
        System.out.println("Closing Word...");
    }
}

abstract class DocumentFactory {
    public abstract Document createDocument();

    public void process() {
        Document doc = createDocument();
        doc.open();
        // do work
        doc.close();
    }
}

class PdfFactory extends DocumentFactory {
    public Document createDocument() {
        return new PdfDocument();
    }
}

class WordFactory extends DocumentFactory {
    public Document createDocument() {
        return new WordDocument();
    }
}

public static void main(String[] args) {
    DocumentFactory factory = new PdfFactory();
    factory.process();
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Document {
    fun open()
    fun close()
}

class PdfDocument : Document {
    override fun open() = println("Opening PDF...")
    override fun close() = println("Closing PDF...")
}

class WordDocument : Document {
    override fun open() = println("Opening Word...")
    override fun close() = println("Closing Word...")
}

abstract class DocumentFactory {
    abstract fun createDocument(): Document

    fun process() {
        val doc = createDocument()
        doc.open()
        // do work
        doc.close()
    }
}

class PdfFactory : DocumentFactory() {
    override fun createDocument() = PdfDocument()
}

class WordFactory : DocumentFactory() {
    override fun createDocument() = WordDocument()
}

fun main() {
    val factory = PdfFactory()
    factory.process()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Document {
    open(): void;
    close(): void;
}

class PdfDocument implements Document {
    open() { console.log("Opening PDF..."); }
    close() { console.log("Closing PDF..."); }
}

class WordDocument implements Document {
    open() { console.log("Opening Word..."); }
    close() { console.log("Closing Word..."); }
}

abstract class DocumentFactory {
    abstract createDocument(): Document;

    process(): void {
        const doc = this.createDocument();
        doc.open();
        // do work
        doc.close();
    }
}

class PdfFactory extends DocumentFactory {
    createDocument(): Document {
        return new PdfDocument();
    }
}

class WordFactory extends DocumentFactory {
    createDocument(): Document {
        return new WordDocument();
    }
}

const factory = new PdfFactory();
factory.process();`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Document(ABC):
    @abstractmethod
    def open(self): pass
    @abstractmethod
    def close(self): pass

class PdfDocument(Document):
    def open(self): print("Opening PDF...")
    def close(self): print("Closing PDF...")

class WordDocument(Document):
    def open(self): print("Opening Word...")
    def close(self): print("Closing Word...")

class DocumentFactory(ABC):
    @abstractmethod
    def create_document(self) -> Document: pass

    def process(self):
        doc = self.create_document()
        doc.open()
        # do work
        doc.close()

class PdfFactory(DocumentFactory):
    def create_document(self) -> Document:
        return PdfDocument()

class WordFactory(DocumentFactory):
    def create_document(self) -> Document:
        return WordDocument()

factory = PdfFactory()
factory.process()`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IDocument
{
    void Open();
    void Close();
}

public class PdfDocument : IDocument
{
    public void Open() => Console.WriteLine("Opening PDF...");
    public void Close() => Console.WriteLine("Closing PDF...");
}

public class WordDocument : IDocument
{
    public void Open() => Console.WriteLine("Opening Word...");
    public void Close() => Console.WriteLine("Closing Word...");
}

public abstract class DocumentFactory
{
    public abstract IDocument CreateDocument();

    public void Process()
    {
        var doc = CreateDocument();
        doc.Open();
        // do work
        doc.Close();
    }
}

public class PdfFactory : DocumentFactory
{
    public override IDocument CreateDocument() => new PdfDocument();
}

public class WordFactory : DocumentFactory
{
    public override IDocument CreateDocument() => new WordDocument();
}

static void Main()
{
    DocumentFactory factory = new PdfFactory();
    factory.Process();
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
