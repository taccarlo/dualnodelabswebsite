import { Component, inject, HostListener } from '@angular/core';
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
  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;
  codeFlex = '4 1 0';
  infoFlex = '6 1 0';
  isDragging = false;
  private startX = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) { if (!this.isDragging) return; this.doResize(e.clientX); }
  @HostListener('document:mouseup')
  onMouseUp() { this.isDragging = false; }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault(); this.isDragging = true;
    this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }

  private doResize(clientX: number) {
    const dp = (document.querySelector('.dp-page') as HTMLElement);
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width * 100;
    const clamped = Math.max(20, Math.min(70, pct));
    this.codeFlex = `${clamped} 1 0`;
    this.infoFlex = `${100 - clamped} 1 0`;
  }

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `class CPU {
    void start() {
        System.out.println("CPU: starting...");
    }
    void shutdown() {
        System.out.println("CPU: shutting down...");
    }
}

class Memory {
    void load() {
        System.out.println("Memory: loading data...");
    }
    void free() {
        System.out.println("Memory: freeing data...");
    }
}

class HardDrive {
    void read() {
        System.out.println("HDD: reading data...");
    }
    void write() {
        System.out.println("HDD: writing data...");
    }
}

class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hdd;

    ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hdd = new HardDrive();
    }

    void start() {
        System.out.println("=== Starting Computer ===");
        cpu.start();
        memory.load();
        hdd.read();
        System.out.println("=== Computer Ready ===");
    }

    void shutdown() {
        System.out.println("=== Shutting Down ===");
        hdd.write();
        memory.free();
        cpu.shutdown();
        System.out.println("=== Goodbye ===");
    }
}

public static void main(String[] args) {
    ComputerFacade computer = new ComputerFacade();
    computer.start();
    computer.shutdown();
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `class CPU {
    fun start() = println("CPU: starting...")
    fun shutdown() = println("CPU: shutting down...")
}

class Memory {
    fun load() = println("Memory: loading data...")
    fun free() = println("Memory: freeing data...")
}

class HardDrive {
    fun read() = println("HDD: reading data...")
    fun write() = println("HDD: writing data...")
}

class ComputerFacade {
    private val cpu = CPU()
    private val memory = Memory()
    private val hdd = HardDrive()

    fun start() {
        println("=== Starting Computer ===")
        cpu.start()
        memory.load()
        hdd.read()
        println("=== Computer Ready ===")
    }

    fun shutdown() {
        println("=== Shutting Down ===")
        hdd.write()
        memory.free()
        cpu.shutdown()
        println("=== Goodbye ===")
    }
}

fun main() {
    val computer = ComputerFacade()
    computer.start()
    computer.shutdown()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class CPU {
    start() { console.log("CPU: starting..."); }
    shutdown() { console.log("CPU: shutting down..."); }
}

class Memory {
    load() { console.log("Memory: loading data..."); }
    free() { console.log("Memory: freeing data..."); }
}

class HardDrive {
    read() { console.log("HDD: reading data..."); }
    write() { console.log("HDD: writing data..."); }
}

class ComputerFacade {
    private cpu = new CPU();
    private memory = new Memory();
    private hdd = new HardDrive();

    start(): void {
        console.log("=== Starting Computer ===");
        this.cpu.start();
        this.memory.load();
        this.hdd.read();
        console.log("=== Computer Ready ===");
    }

    shutdown(): void {
        console.log("=== Shutting Down ===");
        this.hdd.write();
        this.memory.free();
        this.cpu.shutdown();
        console.log("=== Goodbye ===");
    }
}

const computer = new ComputerFacade();
computer.start();
computer.shutdown();`
    },
    Python: {
      lang: 'python',
      code: `class CPU:
    def start(self): print("CPU: starting...")
    def shutdown(self): print("CPU: shutting down...")

class Memory:
    def load(self): print("Memory: loading data...")
    def free(self): print("Memory: freeing data...")

class HardDrive:
    def read(self): print("HDD: reading data...")
    def write(self): print("HDD: writing data...")

class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hdd = HardDrive()

    def start(self):
        print("=== Starting Computer ===")
        self.cpu.start()
        self.memory.load()
        self.hdd.read()
        print("=== Computer Ready ===")

    def shutdown(self):
        print("=== Shutting Down ===")
        self.hdd.write()
        self.memory.free()
        self.cpu.shutdown()
        print("=== Goodbye ===")

computer = ComputerFacade()
computer.start()
computer.shutdown()`
    },
    'C#': {
      lang: 'csharp',
      code: `public class CPU
{
    public void Start() => Console.WriteLine("CPU: starting...");
    public void Shutdown() => Console.WriteLine("CPU: shutting down...");
}

public class Memory
{
    public void Load() => Console.WriteLine("Memory: loading data...");
    public void Free() => Console.WriteLine("Memory: freeing data...");
}

public class HardDrive
{
    public void Read() => Console.WriteLine("HDD: reading data...");
    public void Write() => Console.WriteLine("HDD: writing data...");
}

public class ComputerFacade
{
    private CPU _cpu = new();
    private Memory _memory = new();
    private HardDrive _hdd = new();

    public void Start()
    {
        Console.WriteLine("=== Starting Computer ===");
        _cpu.Start();
        _memory.Load();
        _hdd.Read();
        Console.WriteLine("=== Computer Ready ===");
    }

    public void Shutdown()
    {
        Console.WriteLine("=== Shutting Down ===");
        _hdd.Write();
        _memory.Free();
        _cpu.Shutdown();
        Console.WriteLine("=== Goodbye ===");
    }
}

static void Main()
{
    var computer = new ComputerFacade();
    computer.Start();
    computer.Shutdown();
}`
    }
  };

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    const html = Prism.highlight(sample.code, Prism.languages[sample.lang], sample.lang);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(lang: string): string { return this.codeSamples[lang]?.code || ''; }

  copyCode() {
    const code = this.getCode(this.activeLang);
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true; setTimeout(() => this.copied = false, 2000);
    });
  }

  get currentLang() { return this.translateService.currentLang(); }
  toggleLanguage() { this.translateService.toggleLanguage(); }
}
