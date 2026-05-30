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
      code: `interface Iterator<T> {
    boolean hasNext();
    T next();
}

interface IterableCollection<T> {
    Iterator<T> createIterator();
}

class BrowseHistory implements IterableCollection<String> {
    private String[] urls = new String[10];
    private int count = 0;

    void push(String url) {
        urls[count++] = url;
    }

    String pop() {
        return urls[--count];
    }

    public Iterator<String> createIterator() {
        return new HistoryIterator(this);
    }

    private class HistoryIterator implements Iterator<String> {
        private BrowseHistory history;
        private int index = 0;

        HistoryIterator(BrowseHistory history) {
            this.history = history;
        }

        public boolean hasNext() {
            return index < history.count;
        }

        public String next() {
            return history.urls[index++];
        }
    }
}

public static void main(String[] args) {
    BrowseHistory history = new BrowseHistory();
    history.push("a.com");
    history.push("b.com");
    history.push("c.com");

    Iterator<String> iterator = history.createIterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Iterator<T> {
    fun hasNext(): Boolean
    fun next(): T
}

interface IterableCollection<T> {
    fun createIterator(): Iterator<T>
}

class BrowseHistory : IterableCollection<String> {
    private val urls = mutableListOf<String>()

    fun push(url: String) { urls.add(url) }
    fun pop() = urls.removeLast()

    override fun createIterator(): Iterator<String> =
        object : Iterator<String> {
            private var index = 0
            override fun hasNext() = index < urls.size
            override fun next() = urls[index++]
        }
}

fun main() {
    val history = BrowseHistory()
    history.push("a.com")
    history.push("b.com")
    history.push("c.com")

    val iterator = history.createIterator()
    while (iterator.hasNext()) {
        println(iterator.next())
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

interface IterableCollection<T> {
    createIterator(): Iterator<T>;
}

class BrowseHistory implements IterableCollection<string> {
    private urls: string[] = [];

    push(url: string): void {
        this.urls.push(url);
    }

    pop(): string | undefined {
        return this.urls.pop();
    }

    createIterator(): Iterator<string> {
        let index = 0;
        const urls = this.urls;
        return {
            hasNext(): boolean {
                return index < urls.length;
            },
            next(): string {
                return urls[index++];
            }
        };
    }
}

const history = new BrowseHistory();
history.push("a.com");
history.push("b.com");
history.push("c.com");

const iterator = history.createIterator();
while (iterator.hasNext()) {
    console.log(iterator.next());
}`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Iterator(ABC):
    @abstractmethod
    def has_next(self): pass
    @abstractmethod
    def next(self): pass

class IterableCollection(ABC):
    @abstractmethod
    def create_iterator(self): pass

class BrowseHistory(IterableCollection):
    def __init__(self):
        self._urls = []

    def push(self, url):
        self._urls.append(url)

    def pop(self):
        return self._urls.pop()

    def create_iterator(self):
        return BrowseHistoryIterator(self._urls)

class BrowseHistoryIterator(Iterator):
    def __init__(self, urls):
        self._urls = urls
        self._index = 0

    def has_next(self):
        return self._index < len(self._urls)

    def next(self):
        val = self._urls[self._index]
        self._index += 1
        return val

history = BrowseHistory()
history.push("a.com")
history.push("b.com")
history.push("c.com")

iterator = history.create_iterator()
while iterator.has_next():
    print(iterator.next())`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IIterator<T>
{
    bool HasNext();
    T Next();
}

public interface IIterableCollection<T>
{
    IIterator<T> CreateIterator();
}

public class BrowseHistory : IIterableCollection<string>
{
    private List<string> _urls = new();

    public void Push(string url) => _urls.Add(url);
    public string Pop()
    {
        var last = _urls[^1];
        _urls.RemoveAt(_urls.Count - 1);
        return last;
    }

    public IIterator<string> CreateIterator() =>
        new HistoryIterator(this);

    private class HistoryIterator : IIterator<string>
    {
        private BrowseHistory _history;
        private int _index;

        public HistoryIterator(BrowseHistory history) =>
            _history = history;

        public bool HasNext() => _index < _history._urls.Count;
        public string Next() => _history._urls[_index++];
    }
}

static void Main()
{
    var history = new BrowseHistory();
    history.Push("a.com");
    history.Push("b.com");
    history.Push("c.com");

    var iterator = history.CreateIterator();
    while (iterator.HasNext())
        Console.WriteLine(iterator.Next());
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
