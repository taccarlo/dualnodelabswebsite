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
  selector: 'app-composite',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './composite.html',
  styleUrl: './composite.css'
})
export class CompositeComponent {
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

// Component
interface FileSystemNode {
    void show(String indent);
}

// Leaf
class File implements FileSystemNode {
    private String name;
    public File(String name) { this.name = name; }
    public void show(String indent) {
        System.out.println(indent + "\uD83D\uDCC4 " + name);
    }
}

// Composite
class Folder implements FileSystemNode {
    private String name;
    private List<FileSystemNode> children = new ArrayList<>();

    public Folder(String name) { this.name = name; }
    public void add(FileSystemNode node) { children.add(node); }
    public void remove(FileSystemNode node) { children.remove(node); }

    public void show(String indent) {
        System.out.println(indent + "\uD83D\uDCC1 " + name);
        for (FileSystemNode child : children) {
            child.show(indent + "  ");
        }
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Folder root = new Folder("root");
        Folder src = new Folder("src");
        src.add(new File("main.java"));
        src.add(new File("utils.java"));
        root.add(src);
        root.add(new File("README.md"));
        root.show("");
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Component
interface FileSystemNode {
    fun show(indent: String)
}

// Leaf
class File(private val name: String) : FileSystemNode {
    override fun show(indent: String) {
        println("\${indent}\uD83D\uDCC4 $name")
    }
}

// Composite
class Folder(private val name: String) : FileSystemNode {
    private val children = mutableListOf<FileSystemNode>()

    fun add(node: FileSystemNode) { children.add(node) }
    fun remove(node: FileSystemNode) { children.remove(node) }

    override fun show(indent: String) {
        println("\${indent}\uD83D\uDCC1 $name")
        children.forEach { it.show("$indent  ") }
    }
}

// Usage
fun main() {
    val root = Folder("root")
    val src = Folder("src")
    src.add(File("main.java"))
    src.add(File("utils.java"))
    root.add(src)
    root.add(File("README.md"))
    root.show("")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Component
interface FileSystemNode {
  show(indent: string): void;
}

// Leaf
class File implements FileSystemNode {
  constructor(private name: string) {}
  show(indent: string): void {
    console.log(indent + "📄 " + this.name);
  }
}

// Composite
class Folder implements FileSystemNode {
  private children: FileSystemNode[] = [];

  constructor(private name: string) {}

  add(node: FileSystemNode): void { this.children.push(node); }
  remove(node: FileSystemNode): void {
    const idx = this.children.indexOf(node);
    if (idx !== -1) this.children.splice(idx, 1);
  }

  show(indent: string): void {
    console.log(indent + "📁 " + this.name);
    for (const child of this.children) {
      child.show(indent + "  ");
    }
  }
}

// Usage
const root = new Folder("root");
const src = new Folder("src");
src.add(new File("main.java"));
src.add(new File("utils.java"));
root.add(src);
root.add(new File("README.md"));
root.show("");`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Component
class FileSystemNode(ABC):
    @abstractmethod
    def show(self, indent: str): pass

# Leaf
class File(FileSystemNode):
    def __init__(self, name: str):
        self.name = name
    def show(self, indent: str):
        print(f"{indent}\uD83D\uDCC4 {self.name}")

# Composite
class Folder(FileSystemNode):
    def __init__(self, name: str):
        self.name = name
        self._children = []

    def add(self, node: FileSystemNode):
        self._children.append(node)

    def remove(self, node: FileSystemNode):
        self._children.remove(node)

    def show(self, indent: str):
        print(f"{indent}\uD83D\uDCC1 {self.name}")
        for child in self._children:
            child.show(indent + "  ")

# Usage
root = Folder("root")
src = Folder("src")
src.add(File("main.java"))
src.add(File("utils.java"))
root.add(src)
root.add(File("README.md"))
root.show("")`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;
using System.Collections.Generic;

// Component
public interface IFileSystemNode
{
    void Show(string indent);
}

// Leaf
public class File : IFileSystemNode
{
    private string _name;
    public File(string name) => _name = name;
    public void Show(string indent) =>
        Console.WriteLine($"{indent}\uD83D\uDCC4 {_name}");
}

// Composite
public class Folder : IFileSystemNode
{
    private string _name;
    private List<IFileSystemNode> _children = new();

    public Folder(string name) => _name = name;
    public void Add(IFileSystemNode node) => _children.Add(node);
    public void Remove(IFileSystemNode node) => _children.Remove(node);

    public void Show(string indent)
    {
        Console.WriteLine($"{indent}\uD83D\uDCC1 {_name}");
        foreach (var child in _children)
            child.Show(indent + "  ");
    }
}

// Usage
class Program
{
    static void Main()
    {
        var root = new Folder("root");
        var src = new Folder("src");
        src.Add(new File("main.java"));
        src.Add(new File("utils.java"));
        root.Add(src);
        root.Add(new File("README.md"));
        root.Show("");
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
