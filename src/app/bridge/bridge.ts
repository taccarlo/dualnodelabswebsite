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
  selector: 'app-bridge',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './bridge.html',
  styleUrl: './bridge.css'
})
export class BridgeComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'C#';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `// Implementation hierarchy
interface Device {
    void turnOn();
    void turnOff();
    void setVolume(int percent);
}

class TV implements Device {
    public void turnOn() { System.out.println("TV ON"); }
    public void turnOff() { System.out.println("TV OFF"); }
    public void setVolume(int p) { System.out.println("TV volume: " + p); }
}

class Radio implements Device {
    public void turnOn() { System.out.println("Radio ON"); }
    public void turnOff() { System.out.println("Radio OFF"); }
    public void setVolume(int p) { System.out.println("Radio volume: " + p); }
}

// Abstraction hierarchy
abstract class Remote {
    protected Device device;
    protected Remote(Device device) { this.device = device; }
    abstract void togglePower();
    abstract void volumeUp();
}

class BasicRemote extends Remote {
    private boolean isOn = false;
    public BasicRemote(Device device) { super(device); }
    public void togglePower() {
        if (isOn) { device.turnOff(); isOn = false; }
        else { device.turnOn(); isOn = true; }
    }
    public void volumeUp() { device.setVolume(10); }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Remote remote = new BasicRemote(new TV());
        remote.togglePower();
        remote.volumeUp();
        remote = new BasicRemote(new Radio());
        remote.togglePower();
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Implementation hierarchy
interface Device {
    fun turnOn()
    fun turnOff()
    fun setVolume(percent: Int)
}

class TV : Device {
    override fun turnOn() = println("TV ON")
    override fun turnOff() = println("TV OFF")
    override fun setVolume(p: Int) = println("TV volume: $p")
}

class Radio : Device {
    override fun turnOn() = println("Radio ON")
    override fun turnOff() = println("Radio OFF")
    override fun setVolume(p: Int) = println("Radio volume: $p")
}

// Abstraction hierarchy
abstract class Remote(protected val device: Device) {
    abstract fun togglePower()
    abstract fun volumeUp()
}

class BasicRemote(device: Device) : Remote(device) {
    private var isOn = false
    override fun togglePower() {
        if (isOn) { device.turnOff(); isOn = false }
        else { device.turnOn(); isOn = true }
    }
    override fun volumeUp() = device.setVolume(10)
}

// Usage
fun main() {
    var remote: Remote = BasicRemote(TV())
    remote.togglePower()
    remote.volumeUp()
    remote = BasicRemote(Radio())
    remote.togglePower()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Implementation hierarchy
interface Device {
  turnOn(): void;
  turnOff(): void;
  setVolume(percent: number): void;
}

class TV implements Device {
  turnOn() { console.log("TV ON"); }
  turnOff() { console.log("TV OFF"); }
  setVolume(p: number) { console.log(\`TV volume: \${p}\`); }
}

class Radio implements Device {
  turnOn() { console.log("Radio ON"); }
  turnOff() { console.log("Radio OFF"); }
  setVolume(p: number) { console.log(\`Radio volume: \${p}\`); }
}

// Abstraction hierarchy
abstract class Remote {
  constructor(protected device: Device) {}
  abstract togglePower(): void;
  abstract volumeUp(): void;
}

class BasicRemote extends Remote {
  private isOn = false;
  togglePower() {
    if (this.isOn) { this.device.turnOff(); this.isOn = false; }
    else { this.device.turnOn(); this.isOn = true; }
  }
  volumeUp() { this.device.setVolume(10); }
}

// Usage
let remote: Remote = new BasicRemote(new TV());
remote.togglePower();
remote.volumeUp();
remote = new BasicRemote(new Radio());
remote.togglePower();`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Implementation hierarchy
class Device(ABC):
    @abstractmethod
    def turn_on(self): pass
    @abstractmethod
    def turn_off(self): pass
    @abstractmethod
    def set_volume(self, percent: int): pass

class TV(Device):
    def turn_on(self): print("TV ON")
    def turn_off(self): print("TV OFF")
    def set_volume(self, p): print(f"TV volume: {p}")

class Radio(Device):
    def turn_on(self): print("Radio ON")
    def turn_off(self): print("Radio OFF")
    def set_volume(self, p): print(f"Radio volume: {p}")

# Abstraction hierarchy
class Remote(ABC):
    def __init__(self, device: Device):
        self._device = device
    @abstractmethod
    def toggle_power(self): pass
    @abstractmethod
    def volume_up(self): pass

class BasicRemote(Remote):
    def __init__(self, device: Device):
        super().__init__(device)
        self._is_on = False
    def toggle_power(self):
        if self._is_on:
            self._device.turn_off()
            self._is_on = False
        else:
            self._device.turn_on()
            self._is_on = True
    def volume_up(self):
        self._device.set_volume(10)

# Usage
remote: Remote = BasicRemote(TV())
remote.toggle_power()
remote.volume_up()
remote = BasicRemote(Radio())
remote.toggle_power()`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;

// Implementation hierarchy
public interface IDevice
{
    void TurnOn();
    void TurnOff();
    void SetVolume(int percent);
}

class TV : IDevice
{
    public void TurnOn() => Console.WriteLine("TV ON");
    public void TurnOff() => Console.WriteLine("TV OFF");
    public void SetVolume(int p) => Console.WriteLine($"TV volume: {p}");
}

class Radio : IDevice
{
    public void TurnOn() => Console.WriteLine("Radio ON");
    public void TurnOff() => Console.WriteLine("Radio OFF");
    public void SetVolume(int p) => Console.WriteLine($"Radio volume: {p}");
}

// Abstraction hierarchy
abstract class Remote
{
    protected IDevice Device;
    public Remote(IDevice device) => Device = device;
    public abstract void TogglePower();
    public abstract void VolumeUp();
}

class BasicRemote : Remote
{
    private bool _isOn = false;
    public BasicRemote(IDevice device) : base(device) { }
    public override void TogglePower()
    {
        if (_isOn) { Device.TurnOff(); _isOn = false; }
        else { Device.TurnOn(); _isOn = true; }
    }
    public override void VolumeUp() => Device.SetVolume(10);
}

// Usage
class Program
{
    static void Main()
    {
        Remote remote = new BasicRemote(new TV());
        remote.TogglePower();
        remote.VolumeUp();
        remote = new BasicRemote(new Radio());
        remote.TogglePower();
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
