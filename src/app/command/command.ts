import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-command',
  imports: [IdePanelComponent],
  templateUrl: './command.html',
  styleUrl: './command.css'
})
export class CommandComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public interface Command {
    void execute();
}

public class TurnOnCommand implements Command {
    private final Light light;

    public TurnOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }
}

public class Light {
    public void turnOn() {
        System.out.println("Light is ON");
    }

    public void turnOff() {
        System.out.println("Light is OFF");
    }
}

public class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}

public class Main {
    public static void main(String[] args) {
        Light light = new Light();
        RemoteControl remote = new RemoteControl();

        remote.setCommand(new TurnOnCommand(light));
        remote.pressButton();
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Command {
    fun execute()
}

class TurnOnCommand(private val light: Light) : Command {
    override fun execute() = light.turnOn()
}

class Light {
    fun turnOn() {
        println("Light is ON")
    }

    fun turnOff() {
        println("Light is OFF")
    }
}

class RemoteControl {
    private var command: Command? = null

    fun setCommand(command: Command) {
        this.command = command
    }

    fun pressButton() {
        command?.execute()
    }
}

fun main() {
    val light = Light()
    val remote = RemoteControl()

    remote.setCommand(TurnOnCommand(light))
    remote.pressButton()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Command {
    execute(): void;
}

class TurnOnCommand implements Command {
    constructor(private readonly light: Light) {}

    execute(): void {
        this.light.turnOn();
    }
}

class Light {
    turnOn(): void {
        console.log("Light is ON");
    }

    turnOff(): void {
        console.log("Light is OFF");
    }
}

class RemoteControl {
    private command?: Command;

    setCommand(command: Command): void {
        this.command = command;
    }

    pressButton(): void {
        this.command?.execute();
    }
}

const light = new Light();
const remote = new RemoteControl();

remote.setCommand(new TurnOnCommand(light));
remote.pressButton();`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        pass

class TurnOnCommand(Command):
    def __init__(self, light: "Light"):
        self._light = light

    def execute(self) -> None:
        self._light.turn_on()

class Light:
    def turn_on(self) -> None:
        print("Light is ON")

    def turn_off(self) -> None:
        print("Light is OFF")

class RemoteControl:
    def __init__(self):
        self._command: Command = None

    def set_command(self, command: Command) -> None:
        self._command = command

    def press_button(self) -> None:
        if self._command:
            self._command.execute()

light = Light()
remote = RemoteControl()

remote.set_command(TurnOnCommand(light))
remote.press_button()`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface ICommand
{
    void Execute();
}

public class TurnOnCommand : ICommand
{
    private readonly Light _light;

    public TurnOnCommand(Light light) => _light = light;

    public void Execute() => _light.TurnOn();
}

public class Light
{
    public void TurnOn() => Console.WriteLine("Light is ON");

    public void TurnOff() => Console.WriteLine("Light is OFF");
}

public class RemoteControl
{
    private ICommand? _command;

    public void SetCommand(ICommand command) => _command = command;

    public void PressButton() => _command?.Execute();
}

public class Program
{
    public static void Main()
    {
        var light = new Light();
        var remote = new RemoteControl();

        remote.SetCommand(new TurnOnCommand(light));
        remote.PressButton();
    }
}`
    }
  };
}