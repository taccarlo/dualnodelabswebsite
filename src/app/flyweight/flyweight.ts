import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-flyweight',
  imports: [IdePanelComponent],
  templateUrl: './flyweight.html',
  styleUrl: './flyweight.css'
})
export class FlyweightComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `import java.util.HashMap;
import java.util.Map;

class TreeType {
    private final String name;
    private final String color;

    public TreeType(String name, String color) {
        this.name = name;
        this.color = color;
        System.out.println("Created TreeType: " + name);
    }
}

class TreeTypeFactory {
    private static final Map<String, TreeType> types = new HashMap<>();

    public static TreeType getType(String name, String color) {
        return types.computeIfAbsent(name, k -> new TreeType(name, color));
    }
}

public class FlyweightDemo {
    public static void main(String[] args) {
        TreeType a = TreeTypeFactory.getType("Oak", "Green");
        TreeType b = TreeTypeFactory.getType("Oak", "Green");
        System.out.println("Same object? " + (a == b));
        TreeType c = TreeTypeFactory.getType("Pine", "Dark Green");
        System.out.println("Same object? " + (a == c));
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `import java.util.concurrent.ConcurrentHashMap

class TreeType(val name: String, val color: String) {
    init {
        println("Created TreeType: \$name")
    }
}

object TreeTypeFactory {
    private val types = ConcurrentHashMap<String, TreeType>()

    fun getType(name: String, color: String): TreeType =
        types.computeIfAbsent(name) { TreeType(name, color) }
}

fun main() {
    val a = TreeTypeFactory.getType("Oak", "Green")
    val b = TreeTypeFactory.getType("Oak", "Green")
    println("Same object? \${a === b}")
    val c = TreeTypeFactory.getType("Pine", "Dark Green")
    println("Same object? \${a === c}")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class TreeType {
    constructor(public name: string, public color: string) {}
}

class TreeTypeFactory {
    private static types = new Map<string, TreeType>();

    static getType(name: string, color: string): TreeType {
        let type = TreeTypeFactory.types.get(name);
        if (!type) {
            type = new TreeType(name, color);
            console.log("Created TreeType: " + name);
            TreeTypeFactory.types.set(name, type);
        }
        return type;
    }
}

const a = TreeTypeFactory.getType("Oak", "Green");
const b = TreeTypeFactory.getType("Oak", "Green");
console.log("Same object?", a === b);
const c = TreeTypeFactory.getType("Pine", "Dark Green");
console.log("Same object?", a === c);`
    },
    Python: {
      lang: 'python',
      code: `class TreeType:
    def __init__(self, name, color):
        self.name = name
        self.color = color
        print(f"Created TreeType: {name}")


class TreeTypeFactory:
    _types = {}

    @classmethod
    def get_type(cls, name, color):
        if name not in cls._types:
            cls._types[name] = TreeType(name, color)
        return cls._types[name]


a = TreeTypeFactory.get_type("Oak", "Green")
b = TreeTypeFactory.get_type("Oak", "Green")
print("Same object?", a is b)
c = TreeTypeFactory.get_type("Pine", "Dark Green")
print("Same object?", a is c)`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;
using System.Collections.Concurrent;

public class TreeType
{
    public string Name { get; }
    public string Color { get; }

    public TreeType(string name, string color)
    {
        Name = name;
        Color = color;
        Console.WriteLine("Created TreeType: " + name);
    }
}

public static class TreeTypeFactory
{
    private static readonly ConcurrentDictionary<string, TreeType> Types = new();

    public static TreeType GetType(string name, string color) =>
        Types.GetOrAdd(name, n =>
        {
            Console.WriteLine("Created TreeType: " + n);
            return new TreeType(n, color);
        });
}

public static class Program
{
    public static void Main()
    {
        var a = TreeTypeFactory.GetType("Oak", "Green");
        var b = TreeTypeFactory.GetType("Oak", "Green");
        Console.WriteLine("Same object? " + ReferenceEquals(a, b));
        var c = TreeTypeFactory.GetType("Pine", "Dark Green");
        Console.WriteLine("Same object? " + ReferenceEquals(a, c));
    }
}`
    }
  };
}