import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-csharp';

@Component({
  selector: 'app-facade',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './facade.html',
  styleUrl: './facade.css'
})
export class FacadeComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'C#';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `// Complex subsystems
class CPU {
    public void freeze() { System.out.println("CPU: freeze"); }
    public void jump(long addr) { System.out.println("CPU: jump to " + addr); }
    public void execute() { System.out.println("CPU: execute"); }
}

class Memory {
    public void load(long addr, byte[] data) {
        System.out.println("Memory: load data at " + addr);
    }
}

class HardDrive {
    public byte[] read(long lba, int size) {
        System.out.println("HardDrive: read " + size + " bytes");
        return new byte[size];
    }
}

// Facade
class ComputerFacade {
    private CPU cpu = new CPU();
    private Memory memory = new Memory();
    private HardDrive hardDrive = new HardDrive();

    public void start() {
        cpu.freeze();
        memory.load(0, hardDrive.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        ComputerFacade computer = new ComputerFacade();
        computer.start();
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Complex subsystems
class CPU {
    fun freeze() = println("CPU: freeze")
    fun jump(addr: Long) = println("CPU: jump to $addr")
    fun execute() = println("CPU: execute")
}

class Memory {
    fun load(addr: Long, data: ByteArray) =
        println("Memory: load data at $addr")
}

class HardDrive {
    fun read(lba: Long, size: Int): ByteArray {
        println("HardDrive: read $size bytes")
        return ByteArray(size)
    }
}

// Facade
class ComputerFacade {
    private val cpu = CPU()
    private val memory = Memory()
    private val hardDrive = HardDrive()

    fun start() {
        cpu.freeze()
        memory.load(0, hardDrive.read(0, 1024))
        cpu.jump(0)
        cpu.execute()
    }
}

// Usage
fun main() {
    val computer = ComputerFacade()
    computer.start()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Complex subsystems
class CPU {
  freeze(): void { console.log("CPU: freeze"); }
  jump(addr: number): void { console.log(\`CPU: jump to \${addr}\`); }
  execute(): void { console.log("CPU: execute"); }
}

class Memory {
  load(addr: number, data: Uint8Array): void {
    console.log(\`Memory: load data at \${addr}\`);
  }
}

class HardDrive {
  read(lba: number, size: number): Uint8Array {
    console.log(\`HardDrive: read \${size} bytes\`);
    return new Uint8Array(size);
  }
}

// Facade
class ComputerFacade {
  private cpu = new CPU();
  private memory = new Memory();
  private hardDrive = new HardDrive();

  start(): void {
    this.cpu.freeze();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
  }
}

// Usage
const computer = new ComputerFacade();
computer.start();`
    },
    Python: {
      lang: 'python',
      code: `# Complex subsystems
class CPU:
    def freeze(self): print("CPU: freeze")
    def jump(self, addr: int): print(f"CPU: jump to {addr}")
    def execute(self): print("CPU: execute")

class Memory:
    def load(self, addr: int, data: bytes):
        print(f"Memory: load data at {addr}")

class HardDrive:
    def read(self, lba: int, size: int) -> bytes:
        print(f"HardDrive: read {size} bytes")
        return b"\\x00" * size

# Facade
class ComputerFacade:
    def __init__(self):
        self._cpu = CPU()
        self._memory = Memory()
        self._hard_drive = HardDrive()

    def start(self):
        self._cpu.freeze()
        self._memory.load(0, self._hard_drive.read(0, 1024))
        self._cpu.jump(0)
        self._cpu.execute()

# Usage
computer = ComputerFacade()
computer.start()`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;

// Complex subsystems
public class CPU
{
    public void Freeze() => Console.WriteLine("CPU: freeze");
    public void Jump(long addr) => Console.WriteLine($"CPU: jump to {addr}");
    public void Execute() => Console.WriteLine("CPU: execute");
}

public class Memory
{
    public void Load(long addr, byte[] data) =>
        Console.WriteLine($"Memory: load data at {addr}");
}

public class HardDrive
{
    public byte[] Read(long lba, int size)
    {
        Console.WriteLine($"HardDrive: read {size} bytes");
        return new byte[size];
    }
}

// Facade
public class ComputerFacade
{
    private CPU _cpu = new();
    private Memory _memory = new();
    private HardDrive _hardDrive = new();

    public void Start()
    {
        _cpu.Freeze();
        _memory.Load(0, _hardDrive.Read(0, 1024));
        _cpu.Jump(0);
        _cpu.Execute();
    }
}

// Usage
class Program
{
    static void Main()
    {
        var computer = new ComputerFacade();
        computer.Start();
    }
}`
    }
  };

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    const html = Prism.highlight(sample.code, Prism.languages[sample.lang], sample.lang);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(lang: string): string {
    return this.codeSamples[lang]?.code || '';
  }

  copyCode() {
    const code = this.getCode(this.activeLang);
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
