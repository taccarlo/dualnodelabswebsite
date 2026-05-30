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
  selector: 'app-iterator',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './iterator.html',
  styleUrl: './iterator.css'
})
export class IteratorComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `import java.util.ArrayList;
import java.util.List;

// Iterator interface
interface Iterator<T> {
    boolean hasNext();
    T next();
}

// Aggregate interface
interface Container<T> {
    Iterator<T> createIterator();
}

// Concrete aggregate
class BookCollection implements Container<String> {
    private List<String> books = new ArrayList<>();

    public void addBook(String book) { books.add(book); }

    public Iterator<String> createIterator() {
        return new BookIterator();
    }

    private class BookIterator implements Iterator<String> {
        private int index = 0;

        public boolean hasNext() {
            return index < books.size();
        }

        public String next() {
            return books.get(index++);
        }
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        BookCollection collection = new BookCollection();
        collection.addBook("Design Patterns");
        collection.addBook("Clean Code");
        collection.addBook("Refactoring");

        Iterator<String> it = collection.createIterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Iterator interface
interface Iterator<T> {
    fun hasNext(): Boolean
    fun next(): T
}

// Aggregate interface
interface Container<T> {
    fun createIterator(): Iterator<T>
}

// Concrete aggregate
class BookCollection : Container<String> {
    private val books = mutableListOf<String>()

    fun addBook(book: String) { books.add(book) }

    override fun createIterator(): Iterator<String> = BookIterator()

    private inner class BookIterator : Iterator<String> {
        private var index = 0

        override fun hasNext(): Boolean = index < books.size

        override fun next(): String = books[index++]
    }
}

// Usage
fun main() {
    val collection = BookCollection()
    collection.addBook("Design Patterns")
    collection.addBook("Clean Code")
    collection.addBook("Refactoring")

    val it = collection.createIterator()
    while (it.hasNext()) {
        println(it.next())
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Iterator interface
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}

// Aggregate interface
interface Container<T> {
  createIterator(): Iterator<T>;
}

// Concrete aggregate
class BookCollection implements Container<string> {
  private books: string[] = [];

  addBook(book: string): void {
    this.books.push(book);
  }

  createIterator(): Iterator<string> {
    return new BookIterator(this.books);
  }
}

// Concrete iterator
class BookIterator implements Iterator<string> {
  private index = 0;

  constructor(private books: string[]) {}

  hasNext(): boolean {
    return this.index < this.books.length;
  }

  next(): string {
    return this.books[this.index++];
  }
}

// Usage
const collection = new BookCollection();
collection.addBook("Design Patterns");
collection.addBook("Clean Code");
collection.addBook("Refactoring");

const it = collection.createIterator();
while (it.hasNext()) {
  console.log(it.next());
}`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Iterator interface
class Iterator(ABC):
    @abstractmethod
    def has_next(self) -> bool:
        pass
    @abstractmethod
    def next(self):
        pass

# Aggregate interface
class Container(ABC):
    @abstractmethod
    def create_iterator(self) -> Iterator:
        pass

# Concrete aggregate
class BookCollection(Container):
    def __init__(self):
        self._books = []

    def add_book(self, book: str):
        self._books.append(book)

    def create_iterator(self) -> Iterator:
        return BookIterator(self._books)

# Concrete iterator
class BookIterator(Iterator):
    def __init__(self, books):
        self._books = books
        self._index = 0

    def has_next(self) -> bool:
        return self._index < len(self._books)

    def next(self):
        book = self._books[self._index]
        self._index += 1
        return book

# Usage
collection = BookCollection()
collection.add_book("Design Patterns")
collection.add_book("Clean Code")
collection.add_book("Refactoring")

it = collection.create_iterator()
while it.has_next():
    print(it.next())`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;
using System.Collections.Generic;

// Iterator interface
public interface IIterator<T>
{
    bool HasNext();
    T Next();
}

// Aggregate interface
public interface IContainer<T>
{
    IIterator<T> CreateIterator();
}

// Concrete aggregate
public class BookCollection : IContainer<string>
{
    private List<string> _books = new();

    public void AddBook(string book) => _books.Add(book);

    public IIterator<string> CreateIterator() => new BookIterator(_books);
}

// Concrete iterator
public class BookIterator : IIterator<string>
{
    private List<string> _books;
    private int _index = 0;

    public BookIterator(List<string> books) => _books = books;

    public bool HasNext() => _index < _books.Count;

    public string Next() => _books[_index++];
}

// Usage
class Program
{
    static void Main()
    {
        var collection = new BookCollection();
        collection.AddBook("Design Patterns");
        collection.AddBook("Clean Code");
        collection.AddBook("Refactoring");

        var it = collection.CreateIterator();
        while (it.HasNext())
            Console.WriteLine(it.Next());
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
