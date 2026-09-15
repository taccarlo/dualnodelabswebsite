import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-chain-of-responsibility',
  imports: [IdePanelComponent],
  templateUrl: './chain-of-responsibility.html',
  styleUrl: './chain-of-responsibility.css'
})
export class ChainOfResponsibilityComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public abstract class Handler {
    private Handler next;

    public Handler setNext(Handler next) {
        this.next = next;
        return next;
    }

    public void handle(int level) {
        if (canHandle(level)) {
            process();
        } else if (next != null) {
            next.handle(level);
        } else {
            System.out.println("No handler available");
        }
    }

    protected abstract boolean canHandle(int level);
    protected abstract void process();
}

public class LowLevelHandler extends Handler {
    protected boolean canHandle(int level) {
        return level <= 1;
    }

    protected void process() {
        System.out.println("LowLevelHandler handled the request");
    }
}

public class HighLevelHandler extends Handler {
    protected boolean canHandle(int level) {
        return level <= 3;
    }

    protected void process() {
        System.out.println("HighLevelHandler handled the request");
    }
}

public class Main {
    public static void main(String[] args) {
        Handler chain = new LowLevelHandler();
        chain.setNext(new HighLevelHandler());

        chain.handle(1); // LowLevelHandler handled the request
        chain.handle(2); // HighLevelHandler handled the request
        chain.handle(5); // No handler available
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `abstract class Handler {
    private var next: Handler? = null

    fun setNext(next: Handler): Handler {
        this.next = next
        return next
    }

    fun handle(level: Int) {
        if (canHandle(level)) {
            process()
        } else if (next != null) {
            next?.handle(level)
        } else {
            println("No handler available")
        }
    }

    protected abstract fun canHandle(level: Int): Boolean
    protected abstract fun process(): Unit
}

class LowLevelHandler : Handler() {
    override fun canHandle(level: Int) = level <= 1

    override fun process() {
        println("LowLevelHandler handled the request")
    }
}

class HighLevelHandler : Handler() {
    override fun canHandle(level: Int) = level <= 3

    override fun process() {
        println("HighLevelHandler handled the request")
    }
}

fun main() {
    val chain = LowLevelHandler()
    chain.setNext(HighLevelHandler())

    chain.handle(1) // LowLevelHandler handled the request
    chain.handle(2) // HighLevelHandler handled the request
    chain.handle(5) // No handler available
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `abstract class Handler {
    private next?: Handler;

    setNext(next: Handler): Handler {
        this.next = next;
        return next;
    }

    handle(level: number): void {
        if (this.canHandle(level)) {
            this.process();
        } else if (this.next) {
            this.next.handle(level);
        } else {
            console.log("No handler available");
        }
    }

    protected abstract canHandle(level: number): boolean;
    protected abstract process(): void;
}

class LowLevelHandler extends Handler {
    protected canHandle(level: number): boolean {
        return level <= 1;
    }

    protected process(): void {
        console.log("LowLevelHandler handled the request");
    }
}

class HighLevelHandler extends Handler {
    protected canHandle(level: number): boolean {
        return level <= 3;
    }

    protected process(): void {
        console.log("HighLevelHandler handled the request");
    }
}

const chain = new LowLevelHandler();
chain.setNext(new HighLevelHandler());

chain.handle(1); // LowLevelHandler handled the request
chain.handle(2); // HighLevelHandler handled the request
chain.handle(5); // No handler available`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Handler(ABC):
    def __init__(self):
        self._next = None

    def set_next(self, handler: "Handler") -> "Handler":
        self._next = handler
        return handler

    def handle(self, level: int) -> None:
        if self.can_handle(level):
            self.process()
        elif self._next is not None:
            self._next.handle(level)
        else:
            print("No handler available")

    @abstractmethod
    def can_handle(self, level: int) -> bool:
        pass

    @abstractmethod
    def process(self) -> None:
        pass

class LowLevelHandler(Handler):
    def can_handle(self, level: int) -> bool:
        return level <= 1

    def process(self) -> None:
        print("LowLevelHandler handled the request")

class HighLevelHandler(Handler):
    def can_handle(self, level: int) -> bool:
        return level <= 3

    def process(self) -> None:
        print("HighLevelHandler handled the request")

chain = LowLevelHandler()
chain.set_next(HighLevelHandler())

chain.handle(1)  # LowLevelHandler handled the request
chain.handle(2)  # HighLevelHandler handled the request
chain.handle(5)  # No handler available`
    },
    'C#': {
      lang: 'csharp',
      code: `public abstract class Handler
{
    private Handler? _next;

    public Handler SetNext(Handler next)
    {
        _next = next;
        return next;
    }

    public void Handle(int level)
    {
        if (CanHandle(level))
        {
            Process();
        }
        else if (_next != null)
        {
            _next.Handle(level);
        }
        else
        {
            Console.WriteLine("No handler available");
        }
    }

    protected abstract bool CanHandle(int level);
    protected abstract void Process();
}

public class LowLevelHandler : Handler
{
    protected override bool CanHandle(int level) => level <= 1;

    protected override void Process()
        => Console.WriteLine("LowLevelHandler handled the request");
}

public class HighLevelHandler : Handler
{
    protected override bool CanHandle(int level) => level <= 3;

    protected override void Process()
        => Console.WriteLine("HighLevelHandler handled the request");
}

public class Program
{
    public static void Main()
    {
        Handler chain = new LowLevelHandler();
        chain.SetNext(new HighLevelHandler());

        chain.Handle(1); // LowLevelHandler handled the request
        chain.Handle(2); // HighLevelHandler handled the request
        chain.Handle(5); // No handler available
    }
}`
    }
  };
}