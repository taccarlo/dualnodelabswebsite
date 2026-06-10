import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-abstract-factory',
  imports: [IdePanelComponent],
  templateUrl: './abstract-factory.html',
  styleUrl: './abstract-factory.css'
})
export class AbstractFactoryComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `interface Button {
    void render();
}

interface Checkbox {
    void render();
}

class WinButton implements Button {
    public void render() {
        System.out.println("Windows Button");
    }
}

class MacButton implements Button {
    public void render() {
        System.out.println("Mac Button");
    }
}

class WinCheckbox implements Checkbox {
    public void render() {
        System.out.println("Windows Checkbox");
    }
}

class MacCheckbox implements Checkbox {
    public void render() {
        System.out.println("Mac Checkbox");
    }
}

interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class WinFactory implements GUIFactory {
    public Button createButton() {
        return new WinButton();
    }
    public Checkbox createCheckbox() {
        return new WinCheckbox();
    }
}

class MacFactory implements GUIFactory {
    public Button createButton() {
        return new MacButton();
    }
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}

class Application {
    private GUIFactory factory;

    Application(GUIFactory factory) {
        this.factory = factory;
    }

    void render() {
        factory.createButton().render();
        factory.createCheckbox().render();
    }
}

public static void main(String[] args) {
    GUIFactory factory = new WinFactory();
    new Application(factory).render();
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Button {
    fun render()
}

interface Checkbox {
    fun render()
}

class WinButton : Button {
    override fun render() = println("Windows Button")
}

class MacButton : Button {
    override fun render() = println("Mac Button")
}

class WinCheckbox : Checkbox {
    override fun render() = println("Windows Checkbox")
}

class MacCheckbox : Checkbox {
    override fun render() = println("Mac Checkbox")
}

interface GUIFactory {
    fun createButton(): Button
    fun createCheckbox(): Checkbox
}

class WinFactory : GUIFactory {
    override fun createButton() = WinButton()
    override fun createCheckbox() = WinCheckbox()
}

class MacFactory : GUIFactory {
    override fun createButton() = MacButton()
    override fun createCheckbox() = MacCheckbox()
}

class Application(private val factory: GUIFactory) {
    fun render() {
        factory.createButton().render()
        factory.createCheckbox().render()
    }
}

fun main() {
    val factory = WinFactory()
    Application(factory).render()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Button {
    render(): void;
}

interface Checkbox {
    render(): void;
}

class WinButton implements Button {
    render() { console.log("Windows Button"); }
}

class MacButton implements Button {
    render() { console.log("Mac Button"); }
}

class WinCheckbox implements Checkbox {
    render() { console.log("Windows Checkbox"); }
}

class MacCheckbox implements Checkbox {
    render() { console.log("Mac Checkbox"); }
}

interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
    createButton() { return new WinButton(); }
    createCheckbox() { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
    createButton() { return new MacButton(); }
    createCheckbox() { return new MacCheckbox(); }
}

class Application {
    constructor(private factory: GUIFactory) {}

    render() {
        this.factory.createButton().render();
        this.factory.createCheckbox().render();
    }
}

const factory = new WinFactory();
new Application(factory).render();`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Button(ABC):
    @abstractmethod
    def render(self): pass

class Checkbox(ABC):
    @abstractmethod
    def render(self): pass

class WinButton(Button):
    def render(self): print("Windows Button")

class MacButton(Button):
    def render(self): print("Mac Button")

class WinCheckbox(Checkbox):
    def render(self): print("Windows Checkbox")

class MacCheckbox(Checkbox):
    def render(self): print("Mac Checkbox")

class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass
    @abstractmethod
    def create_checkbox(self) -> Checkbox: pass

class WinFactory(GUIFactory):
    def create_button(self): return WinButton()
    def create_checkbox(self): return WinCheckbox()

class MacFactory(GUIFactory):
    def create_button(self): return MacButton()
    def create_checkbox(self): return MacCheckbox()

class Application:
    def __init__(self, factory: GUIFactory):
        self.factory = factory

    def render(self):
        self.factory.create_button().render()
        self.factory.create_checkbox().render()

factory = WinFactory()
Application(factory).render()`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IButton
{
    void Render();
}

public interface ICheckbox
{
    void Render();
}

public class WinButton : IButton
{
    public void Render() => Console.WriteLine("Windows Button");
}

public class MacButton : IButton
{
    public void Render() => Console.WriteLine("Mac Button");
}

public class WinCheckbox : ICheckbox
{
    public void Render() => Console.WriteLine("Windows Checkbox");
}

public class MacCheckbox : ICheckbox
{
    public void Render() => Console.WriteLine("Mac Checkbox");
}

public interface IGUIFactory
{
    IButton CreateButton();
    ICheckbox CreateCheckbox();
}

public class WinFactory : IGUIFactory
{
    public IButton CreateButton() => new WinButton();
    public ICheckbox CreateCheckbox() => new WinCheckbox();
}

public class MacFactory : IGUIFactory
{
    public IButton CreateButton() => new MacButton();
    public ICheckbox CreateCheckbox() => new MacCheckbox();
}

public class Application
{
    private readonly IGUIFactory _factory;
    public Application(IGUIFactory factory) => _factory = factory;

    public void Render()
    {
        _factory.CreateButton().Render();
        _factory.CreateCheckbox().Render();
    }
}

static void Main()
{
    IGUIFactory factory = new WinFactory();
    new Application(factory).Render();
}`
    }
  };
}
