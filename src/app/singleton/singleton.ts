import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-singleton',
  imports: [IdePanelComponent],
  templateUrl: './singleton.html',
  styleUrl: './singleton.css'
})
export class SingletonComponent {
  version = packageJson.version;

  codeSamples: Record<string, { code: string; lang: string }> = {
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
    },
    'C#': {
      lang: 'csharp',
      code: `public class Singleton
{
    private static Singleton _instance;
    private static readonly object _lock = new();

    private Singleton() { }

    public static Singleton GetInstance()
    {
        if (_instance == null)
        {
            lock (_lock)
            {
                _instance ??= new Singleton();
            }
        }
        return _instance;
    }

    public static void Main(string[] args)
    {
        var s = Singleton.GetInstance();
        Console.WriteLine("Hello World from Singleton!");
    }
}`
    }
  };
}
