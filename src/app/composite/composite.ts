import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-composite',
  imports: [IdePanelComponent],
  templateUrl: './composite.html',
  styleUrl: './composite.css'
})
export class CompositeComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `import java.util.ArrayList;
import java.util.List;

interface FileSystemComponent {
    void showDetails();
}

class File implements FileSystemComponent {
    private String name;

    File(String name) { this.name = name; }

    public void showDetails() {
        System.out.println("File: " + name);
    }
}

class Folder implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children = new ArrayList<>();

    Folder(String name) { this.name = name; }

    void add(FileSystemComponent component) {
        children.add(component);
    }

    void remove(FileSystemComponent component) {
        children.remove(component);
    }

    public void showDetails() {
        System.out.println("Folder: " + name);
        for (FileSystemComponent child : children) {
            child.showDetails();
        }
    }
}

public static void main(String[] args) {
    File file1 = new File("file1.txt");
    File file2 = new File("file2.txt");

    Folder folder = new Folder("Documents");
    folder.add(file1);
    folder.add(file2);

    Folder root = new Folder("Root");
    root.add(folder);
    root.showDetails();
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface FileSystemComponent {
    fun showDetails()
}

class File(private val name: String) : FileSystemComponent {
    override fun showDetails() = println("File: $name")
}

class Folder(private val name: String) : FileSystemComponent {
    private val children = mutableListOf<FileSystemComponent>()

    fun add(component: FileSystemComponent) = children.add(component)
    fun remove(component: FileSystemComponent) = children.remove(component)

    override fun showDetails() {
        println("Folder: $name")
        children.forEach { it.showDetails() }
    }
}

fun main() {
    val file1 = File("file1.txt")
    val file2 = File("file2.txt")

    val folder = Folder("Documents").apply {
        add(file1)
        add(file2)
    }

    Folder("Root").apply {
        add(folder)
        showDetails()
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface FileSystemComponent {
    showDetails(): void;
}

class File implements FileSystemComponent {
    constructor(private name: string) {}

    showDetails(): void {
        console.log("File:", this.name);
    }
}

class Folder implements FileSystemComponent {
    private children: FileSystemComponent[] = [];

    constructor(private name: string) {}

    add(component: FileSystemComponent): void {
        this.children.push(component);
    }

    remove(component: FileSystemComponent): void {
        const idx = this.children.indexOf(component);
        if (idx >= 0) this.children.splice(idx, 1);
    }

    showDetails(): void {
        console.log("Folder:", this.name);
        for (const child of this.children) {
            child.showDetails();
        }
    }
}

const file1 = new File("file1.txt");
const file2 = new File("file2.txt");
const folder = new Folder("Documents");
folder.add(file1);
folder.add(file2);

const root = new Folder("Root");
root.add(folder);
root.showDetails();`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class FileSystemComponent(ABC):
    @abstractmethod
    def show_details(self): pass

class File(FileSystemComponent):
    def __init__(self, name): self.name = name
    def show_details(self): print(f"File: {self.name}")

class Folder(FileSystemComponent):
    def __init__(self, name):
        self.name = name
        self.children = []

    def add(self, component):
        self.children.append(component)

    def remove(self, component):
        self.children.remove(component)

    def show_details(self):
        print(f"Folder: {self.name}")
        for child in self.children:
            child.show_details()

file1 = File("file1.txt")
file2 = File("file2.txt")
folder = Folder("Documents")
folder.add(file1)
folder.add(file2)

root = Folder("Root")
root.add(folder)
root.show_details()`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IFileSystemComponent
{
    void ShowDetails();
}

public class File : IFileSystemComponent
{
    private string _name;
    public File(string name) => _name = name;
    public void ShowDetails() =>
        Console.WriteLine("File: " + _name);
}

public class Folder : IFileSystemComponent
{
    private string _name;
    private List<IFileSystemComponent> _children = new();

    public Folder(string name) => _name = name;

    public void Add(IFileSystemComponent component) =>
        _children.Add(component);

    public void Remove(IFileSystemComponent component) =>
        _children.Remove(component);

    public void ShowDetails()
    {
        Console.WriteLine("Folder: " + _name);
        foreach (var child in _children)
            child.ShowDetails();
    }
}

static void Main()
{
    var file1 = new File("file1.txt");
    var file2 = new File("file2.txt");
    var folder = new Folder("Documents");
    folder.Add(file1);
    folder.Add(file2);

    var root = new Folder("Root");
    root.Add(folder);
    root.ShowDetails();
}`
    }
  };
}
