import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-prototype',
  imports: [IdePanelComponent],
  templateUrl: './prototype.html',
  styleUrl: './prototype.css'
})
export class PrototypeComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `class Shape implements Cloneable {
    private String type;

    public Shape(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    @Override
    protected Shape clone() {
        try {
            return (Shape) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

public class PrototypeDemo {
    public static void main(String[] args) {
        Shape original = new Shape("Circle");
        Shape copy = original.clone();
        System.out.println("Original: " + original.getType());
        System.out.println("Copy: " + copy.getType());
        System.out.println("Same object? " + (original == copy));
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `data class Shape(val type: String, val color: String)

fun main() {
    val original = Shape("Circle", "Red")
    val copy = original.copy(color = "Blue")
    println("Original: \${original}")
    println("Copy: \${copy}")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class Shape {
    constructor(public type: string, public color: string) {}

    clone(): Shape {
        return new Shape(this.type, this.color);
    }
}

const original = new Shape("Circle", "Red");
const copy = original.clone();
copy.color = "Blue";

console.log("Original:", original);
console.log("Copy:", copy);`
    },
    Python: {
      lang: 'python',
      code: `import copy


class Shape:
    def __init__(self, type_, color):
        self.type = type_
        self.color = color

    def clone(self):
        return copy.deepcopy(self)

    def __repr__(self):
        return f"Shape({self.type}, {self.color})"


original = Shape("Circle", "Red")
copied = original.clone()
copied.color = "Blue"

print("Original:", original)
print("Copy:", copied)`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;

public class Shape
{
    public string Type { get; set; }
    public string Color { get; set; }

    public Shape(string type, string color)
    {
        Type = type;
        Color = color;
    }

    public Shape Clone() => (Shape)MemberwiseClone();
}

public static class Program
{
    public static void Main()
    {
        var original = new Shape("Circle", "Red");
        var copy = original.Clone();
        copy.Color = "Blue";
        Console.WriteLine("Original: " + original.Type + ", " + original.Color);
        Console.WriteLine("Copy: " + copy.Type + ", " + copy.Color);
    }
}`
    }
  };
}