import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-factory-method',
  imports: [IdePanelComponent],
  templateUrl: './factory-method.html',
  styleUrl: './factory-method.css'
})
export class FactoryMethodComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
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
}
