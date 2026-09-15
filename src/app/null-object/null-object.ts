import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-null-object',
  imports: [IdePanelComponent],
  templateUrl: './null-object.html',
  styleUrl: './null-object.css'
})
export class NullObjectComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public interface Logger {
    void log(String message);
}

public class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

public class NullLogger implements Logger {
    @Override
    public void log(String message) {
        // No-op: do nothing
    }
}

public class Application {
    private final Logger logger;

    public Application(Logger logger) {
        this.logger = logger != null ? logger : new NullLogger();
    }

    public void start() {
        logger.log("Application started");
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Logger {
    fun log(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) {
        println("[LOG] $message")
    }
}

class NullLogger : Logger {
    override fun log(message: String) {
        // No-op: do nothing
    }
}

class Application(private val logger: Logger = NullLogger()) {
    fun start() {
        logger.log("Application started")
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(\`[LOG] \${message}\`);
    }
}

class NullLogger implements Logger {
    log(_message: string): void {
        // No-op: do nothing
    }
}

class Application {
    private readonly logger: Logger;

    constructor(logger: Logger | null = null) {
        this.logger = logger ?? new NullLogger();
    }

    start(): void {
        this.logger.log("Application started");
    }
}`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, message: str) -> None:
        pass

class ConsoleLogger(Logger):
    def log(self, message: str) -> None:
        print(f"[LOG] {message}")

class NullLogger(Logger):
    def log(self, message: str) -> None:
        # No-op: do nothing
        pass

class Application:
    def __init__(self, logger: Logger = None):
        self._logger = logger if logger is not None else NullLogger()

    def start(self) -> None:
        self._logger.log("Application started")`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface ILogger
{
    void Log(string message);
}

public class ConsoleLogger : ILogger
{
    public void Log(string message)
        => Console.WriteLine($"[LOG] {message}");
}

public class NullLogger : ILogger
{
    public void Log(string message)
    {
        // No-op: do nothing
    }
}

public class Application
{
    private readonly ILogger _logger;

    public Application(ILogger? logger = null)
    {
        _logger = logger ?? new NullLogger();
    }

    public void Start()
        => _logger.Log("Application started");
}`
    }
  };
}