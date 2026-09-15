import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-visitor',
  imports: [IdePanelComponent],
  templateUrl: './visitor.html',
  styleUrl: './visitor.css'
})
export class VisitorComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}

public interface Shape {
    void accept(ShapeVisitor visitor);
}

public class Circle implements Shape {
    public final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

public class Rectangle implements Shape {
    public final double width;
    public final double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public void accept(ShapeVisitor visitor) {
        visitor.visit(this);
    }
}

public class AreaVisitor implements ShapeVisitor {
    private double total = 0;

    public void visit(Circle circle) {
        total += Math.PI * circle.radius * circle.radius;
    }

    public void visit(Rectangle rectangle) {
        total += rectangle.width * rectangle.height;
    }

    public double getTotal() {
        return total;
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface ShapeVisitor {
    fun visit(circle: Circle)
    fun visit(rectangle: Rectangle)
}

interface Shape {
    fun accept(visitor: ShapeVisitor)
}

class Circle(val radius: Double) : Shape {
    override fun accept(visitor: ShapeVisitor) = visitor.visit(this)
}

class Rectangle(val width: Double, val height: Double) : Shape {
    override fun accept(visitor: ShapeVisitor) = visitor.visit(this)
}

class AreaVisitor : ShapeVisitor {
    private var total = 0.0

    override fun visit(circle: Circle) {
        total += Math.PI * circle.radius * circle.radius
    }

    override fun visit(rectangle: Rectangle) {
        total += rectangle.width * rectangle.height
    }

    fun getTotal(): Double = total
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface ShapeVisitor {
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
}

interface Shape {
    accept(visitor: ShapeVisitor): void;
}

class Circle implements Shape {
    constructor(public readonly radius: number) {}

    accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
    }
}

class Rectangle implements Shape {
    constructor(
        public readonly width: number,
        public readonly height: number
    ) {}

    accept(visitor: ShapeVisitor): void {
        visitor.visitRectangle(this);
    }
}

class AreaVisitor implements ShapeVisitor {
    private total = 0;

    visitCircle(circle: Circle): void {
        this.total += Math.PI * circle.radius * circle.radius;
    }

    visitRectangle(rectangle: Rectangle): void {
        this.total += rectangle.width * rectangle.height;
    }

    getTotal(): number {
        return this.total;
    }
}`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class ShapeVisitor(ABC):
    @abstractmethod
    def visit_circle(self, circle: "Circle") -> None:
        pass

    @abstractmethod
    def visit_rectangle(self, rectangle: "Rectangle") -> None:
        pass

class Shape(ABC):
    @abstractmethod
    def accept(self, visitor: ShapeVisitor) -> None:
        pass

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def accept(self, visitor: ShapeVisitor) -> None:
        visitor.visit_circle(self)

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def accept(self, visitor: ShapeVisitor) -> None:
        visitor.visit_rectangle(self)

class AreaVisitor(ShapeVisitor):
    def __init__(self):
        self._total = 0.0

    def visit_circle(self, circle: Circle) -> None:
        self._total += 3.14159 * circle.radius * circle.radius

    def visit_rectangle(self, rectangle: Rectangle) -> None:
        self._total += rectangle.width * rectangle.height

    def get_total(self) -> float:
        return self._total`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IShapeVisitor
{
    void Visit(Circle circle);
    void Visit(Rectangle rectangle);
}

public interface IShape
{
    void Accept(IShapeVisitor visitor);
}

public class Circle : IShape
{
    public double Radius { get; }

    public Circle(double radius) => Radius = radius;

    public void Accept(IShapeVisitor visitor) => visitor.Visit(this);
}

public class Rectangle : IShape
{
    public double Width { get; }
    public double Height { get; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public void Accept(IShapeVisitor visitor) => visitor.Visit(this);
}

public class AreaVisitor : IShapeVisitor
{
    private double _total;

    public void Visit(Circle circle)
        => _total += Math.PI * circle.Radius * circle.Radius;

    public void Visit(Rectangle rectangle)
        => _total += rectangle.Width * rectangle.Height;

    public double GetTotal() => _total;
}`
    }
  };
}