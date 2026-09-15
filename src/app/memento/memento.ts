import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-memento',
  imports: [IdePanelComponent],
  templateUrl: './memento.html',
  styleUrl: './memento.css'
})
export class MementoComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public class Memento {
    private final String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

public class Originator {
    private String state;

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public Memento save() {
        return new Memento(state);
    }

    public void restore(Memento memento) {
        state = memento.getState();
    }
}

public class Caretaker {
    private Memento memento;

    public void save(Originator originator) {
        memento = originator.save();
    }

    public void undo(Originator originator) {
        originator.restore(memento);
    }
}

public class Main {
    public static void main(String[] args) {
        Originator originator = new Originator();
        Caretaker caretaker = new Caretaker();

        originator.setState("State #1");
        caretaker.save(originator);

        originator.setState("State #2");
        System.out.println(originator.getState()); // State #2

        caretaker.undo(originator);
        System.out.println(originator.getState()); // State #1
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `class Memento(private val state: String) {
    fun getState(): String = state
}

class Originator {
    private var state: String = ""

    fun setState(state: String) {
        this.state = state
    }

    fun getState(): String = state

    fun save(): Memento = Memento(state)

    fun restore(memento: Memento) {
        state = memento.getState()
    }
}

class Caretaker {
    private var memento: Memento? = null

    fun save(originator: Originator) {
        memento = originator.save()
    }

    fun undo(originator: Originator) {
        originator.restore(memento!!)
    }
}

fun main() {
    val originator = Originator()
    val caretaker = Caretaker()

    originator.setState("State #1")
    caretaker.save(originator)

    originator.setState("State #2")
    println(originator.getState()) // State #2

    caretaker.undo(originator)
    println(originator.getState()) // State #1
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class Memento {
    constructor(private readonly state: string) {}

    getState(): string {
        return this.state;
    }
}

class Originator {
    private state = "";

    setState(state: string): void {
        this.state = state;
    }

    getState(): string {
        return this.state;
    }

    save(): Memento {
        return new Memento(this.state);
    }

    restore(memento: Memento): void {
        this.state = memento.getState();
    }
}

class Caretaker {
    private memento?: Memento;

    save(originator: Originator): void {
        this.memento = originator.save();
    }

    undo(originator: Originator): void {
        if (this.memento) {
            originator.restore(this.memento);
        }
    }
}

const originator = new Originator();
const caretaker = new Caretaker();

originator.setState("State #1");
caretaker.save(originator);

originator.setState("State #2");
console.log(originator.getState()); // State #2

caretaker.undo(originator);
console.log(originator.getState()); // State #1`
    },
    Python: {
      lang: 'python',
      code: `class Memento:
    def __init__(self, state: str):
        self._state = state

    def get_state(self) -> str:
        return self._state

class Originator:
    def __init__(self):
        self._state = ""

    def set_state(self, state: str) -> None:
        self._state = state

    def get_state(self) -> str:
        return self._state

    def save(self) -> Memento:
        return Memento(self._state)

    def restore(self, memento: Memento) -> None:
        self._state = memento.get_state()

class Caretaker:
    def __init__(self):
        self._memento: Memento = None

    def save(self, originator: Originator) -> None:
        self._memento = originator.save()

    def undo(self, originator: Originator) -> None:
        if self._memento:
            originator.restore(self._memento)

originator = Originator()
caretaker = Caretaker()

originator.set_state("State #1")
caretaker.save(originator)

originator.set_state("State #2")
print(originator.get_state())  # State #2

caretaker.undo(originator)
print(originator.get_state())  # State #1`
    },
    'C#': {
      lang: 'csharp',
      code: `public class Memento
{
    public string State { get; }

    public Memento(string state) => State = state;
}

public class Originator
{
    public string State { get; private set; } = "";

    public Memento Save() => new Memento(State);

    public void Restore(Memento memento) => State = memento.State;
}

public class Caretaker
{
    private Memento? _memento;

    public void Save(Originator originator) => _memento = originator.Save();

    public void Undo(Originator originator)
    {
        if (_memento != null)
        {
            originator.Restore(_memento);
        }
    }
}

public class Program
{
    public static void Main()
    {
        var originator = new Originator();
        var caretaker = new Caretaker();

        originator.State = "State #1";
        caretaker.Save(originator);

        originator.State = "State #2";
        Console.WriteLine(originator.State); // State #2

        caretaker.Undo(originator);
        Console.WriteLine(originator.State); // State #1
    }
}`
    }
  };
}