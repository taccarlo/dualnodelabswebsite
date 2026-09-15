import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-lazy-initialization',
  imports: [IdePanelComponent],
  templateUrl: './lazy-initialization.html',
  styleUrl: './lazy-initialization.css'
})
export class LazyInitializationComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public class HeavyResource {
    private static HeavyResource instance;
    private static final Object lock = new Object();

    private HeavyResource() {
        System.out.println("Resource created lazily!");
    }

    public static HeavyResource getInstance() {
        if (instance == null) {
            synchronized (lock) {
                if (instance == null) {
                    instance = new HeavyResource();
                }
            }
        }
        return instance;
    }

    public static void main(String[] args) {
        System.out.println("Before first access");
        HeavyResource r = HeavyResource.getInstance();
        System.out.println("After first access: " + r);
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `class HeavyResource private constructor() {
    companion object {
        val instance: HeavyResource by lazy {
            println("Resource created lazily!")
            HeavyResource()
        }
    }
}

fun main() {
    println("Before first access")
    val r = HeavyResource.instance
    println("After first access: \${r}")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class HeavyResource {
    private static instance: HeavyResource;

    private constructor() {
        console.log("Resource created lazily!");
    }

    static getInstance(): HeavyResource {
        if (!HeavyResource.instance) {
            HeavyResource.instance = new HeavyResource();
        }
        return HeavyResource.instance;
    }
}

console.log("Before first access");
const r = HeavyResource.getInstance();
console.log("After first access:", r);`
    },
    Python: {
      lang: 'python',
      code: `class HeavyResource:
    _instance = None

    def __init__(self):
        print("Resource created lazily!")

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = HeavyResource()
        return cls._instance


print("Before first access")
r = HeavyResource.get_instance()
print("After first access:", r)`
    },
    'C#': {
      lang: 'csharp',
      code: `public class HeavyResource
{
    private static HeavyResource _instance;
    private static readonly object _lock = new();

    private HeavyResource()
    {
        Console.WriteLine("Resource created lazily!");
    }

    public static HeavyResource GetInstance()
    {
        if (_instance == null)
        {
            lock (_lock)
            {
                _instance ??= new HeavyResource();
            }
        }
        return _instance;
    }

    public static void Main(string[] args)
    {
        Console.WriteLine("Before first access");
        var r = HeavyResource.GetInstance();
        Console.WriteLine("After first access: " + r);
    }
}`
    }
  };
}