import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-dependency-injection',
  imports: [IdePanelComponent],
  templateUrl: './dependency-injection.html',
  styleUrl: './dependency-injection.css'
})
export class DependencyInjectionComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `interface Logger {
    void log(String message);
}

class ConsoleLogger implements Logger {
    public void log(String message) {
        System.out.println("LOG: " + message);
    }
}

class FileLogger implements Logger {
    public void log(String message) {
        System.out.println("FILE: " + message);
    }
}

class UserService {
    private final Logger logger;

    public UserService(Logger logger) {
        this.logger = logger;
    }

    public void createUser(String name) {
        logger.log("Creating user: " + name);
    }
}

public class DIMain {
    public static void main(String[] args) {
        Logger logger = new ConsoleLogger();
        UserService service = new UserService(logger);
        service.createUser("Alice");

        service = new UserService(new FileLogger());
        service.createUser("Bob");
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
        println("LOG: \$message")
    }
}

class FileLogger : Logger {
    override fun log(message: String) {
        println("FILE: \$message")
    }
}

class UserService(private val logger: Logger) {
    fun createUser(name: String) {
        logger.log("Creating user: \$name")
    }
}

fun main() {
    val service = UserService(ConsoleLogger())
    service.createUser("Alice")

    val fileService = UserService(FileLogger())
    fileService.createUser("Bob")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log("LOG: " + message);
    }
}

class FileLogger implements Logger {
    log(message: string): void {
        console.log("FILE: " + message);
    }
}

class UserService {
    constructor(private logger: Logger) {}

    createUser(name: string): void {
        this.logger.log("Creating user: " + name);
    }
}

const service = new UserService(new ConsoleLogger());
service.createUser("Alice");

const fileService = new UserService(new FileLogger());
fileService.createUser("Bob");`
    },
    Python: {
      lang: 'python',
      code: `class ConsoleLogger:
    def log(self, message):
        print(f"LOG: {message}")


class FileLogger:
    def log(self, message):
        print(f"FILE: {message}")


class UserService:
    def __init__(self, logger):
        self.logger = logger

    def create_user(self, name):
        self.logger.log(f"Creating user: {name}")


service = UserService(ConsoleLogger())
service.create_user("Alice")

file_service = UserService(FileLogger())
file_service.create_user("Bob")`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;

public interface ILogger
{
    void Log(string message);
}

public class ConsoleLogger : ILogger
{
    public void Log(string message) => Console.WriteLine("LOG: " + message);
}

public class FileLogger : ILogger
{
    public void Log(string message) => Console.WriteLine("FILE: " + message);
}

public class UserService
{
    private readonly ILogger _logger;

    public UserService(ILogger logger) => _logger = logger;

    public void CreateUser(string name) => _logger.Log("Creating user: " + name);
}

public static class Program
{
    public static void Main()
    {
        var service = new UserService(new ConsoleLogger());
        service.CreateUser("Alice");

        var fileService = new UserService(new FileLogger());
        fileService.CreateUser("Bob");
    }
}`
    }
  };
}