import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-proxy',
  imports: [IdePanelComponent],
  templateUrl: './proxy.html',
  styleUrl: './proxy.css'
})
export class ProxyComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `interface Image {
    void display();
}

class RealImage implements Image {
    private final String filename;

    public RealImage(String filename) {
        this.filename = filename;
        System.out.println("Loading " + filename);
    }

    public void display() {
        System.out.println("Displaying " + filename);
    }
}

class ProxyImage implements Image {
    private final String filename;
    private RealImage image;

    public ProxyImage(String filename) {
        this.filename = filename;
    }

    public void display() {
        if (image == null) {
            image = new RealImage(filename);
        }
        image.display();
    }
}

public class ProxyDemo {
    public static void main(String[] args) {
        Image img = new ProxyImage("photo.jpg");
        System.out.println("Image created, not loaded yet");
        img.display();
        img.display();
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Image {
    fun display()
}

class RealImage(private val filename: String) : Image {
    init {
        println("Loading \$filename")
    }

    override fun display() {
        println("Displaying \$filename")
    }
}

class ProxyImage(private val filename: String) : Image {
    private var image: RealImage? = null

    override fun display() {
        if (image == null) {
            image = RealImage(filename)
        }
        image?.display()
    }
}

fun main() {
    val img: Image = ProxyImage("photo.jpg")
    println("Image created, not loaded yet")
    img.display()
    img.display()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Image {
    display(): void;
}

class RealImage implements Image {
    constructor(private filename: string) {
        console.log("Loading " + this.filename);
    }

    display(): void {
        console.log("Displaying " + this.filename);
    }
}

class ProxyImage implements Image {
    private image: RealImage | null = null;

    constructor(private filename: string) {}

    display(): void {
        if (!this.image) {
            this.image = new RealImage(this.filename);
        }
        this.image.display();
    }
}

const img: Image = new ProxyImage("photo.jpg");
console.log("Image created, not loaded yet");
img.display();
img.display();`
    },
    Python: {
      lang: 'python',
      code: `class RealImage:
    def __init__(self, filename):
        self.filename = filename
        print(f"Loading {filename}")

    def display(self):
        print(f"Displaying {self.filename}")


class ProxyImage:
    def __init__(self, filename):
        self.filename = filename
        self._image = None

    def display(self):
        if self._image is None:
            self._image = RealImage(self.filename)
        self._image.display()


img = ProxyImage("photo.jpg")
print("Image created, not loaded yet")
img.display()
img.display()`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;

public interface IImage
{
    void Display();
}

public class RealImage : IImage
{
    private readonly string _filename;

    public RealImage(string filename)
    {
        _filename = filename;
        Console.WriteLine("Loading " + filename);
    }

    public void Display() => Console.WriteLine("Displaying " + _filename);
}

public class ProxyImage : IImage
{
    private readonly string _filename;
    private RealImage? _image;

    public ProxyImage(string filename) => _filename = filename;

    public void Display()
    {
        if (_image == null)
        {
            _image = new RealImage(_filename);
        }
        _image.Display();
    }
}

public static class Program
{
    public static void Main()
    {
        IImage img = new ProxyImage("photo.jpg");
        Console.WriteLine("Image created, not loaded yet");
        img.Display();
        img.Display();
    }
}`
    }
  };
}