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
  selector: 'app-bridge',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './bridge.html',
  styleUrl: './bridge.css'
})
export class BridgeComponent {
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
      code: `interface Device {
    boolean isEnabled();
    void enable();
    void disable();
    int getVolume();
    void setVolume(int percent);
}

class TV implements Device {
    private boolean on = false;
    private int volume = 30;

    public boolean isEnabled() { return on; }
    public void enable() { on = true; }
    public void disable() { on = false; }
    public int getVolume() { return volume; }
    public void setVolume(int percent) { volume = percent; }
}

class Radio implements Device {
    private boolean on = false;
    private int volume = 20;

    public boolean isEnabled() { return on; }
    public void enable() { on = true; }
    public void disable() { on = false; }
    public int getVolume() { return volume; }
    public void setVolume(int percent) { volume = percent; }
}

class Remote {
    protected Device device;
    Remote(Device device) { this.device = device; }

    void togglePower() {
        if (device.isEnabled()) device.disable();
        else device.enable();
    }

    void volumeDown() {
        device.setVolume(device.getVolume() - 10);
    }

    void volumeUp() {
        device.setVolume(device.getVolume() + 10);
    }
}

public static void main(String[] args) {
    TV tv = new TV();
    Remote remote = new Remote(tv);
    remote.togglePower();
    remote.volumeUp();
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Device {
    fun isEnabled(): Boolean
    fun enable()
    fun disable()
    fun getVolume(): Int
    fun setVolume(percent: Int)
}

class TV : Device {
    private var on = false
    private var volume = 30
    override fun isEnabled() = on
    override fun enable() { on = true }
    override fun disable() { on = false }
    override fun getVolume() = volume
    override fun setVolume(percent: Int) { volume = percent }
}

class Radio : Device {
    private var on = false
    private var volume = 20
    override fun isEnabled() = on
    override fun enable() { on = true }
    override fun disable() { on = false }
    override fun getVolume() = volume
    override fun setVolume(percent: Int) { volume = percent }
}

open class Remote(protected val device: Device) {
    fun togglePower() {
        if (device.isEnabled()) device.disable()
        else device.enable()
    }
    fun volumeDown() = device.setVolume(device.getVolume() - 10)
    fun volumeUp() = device.setVolume(device.getVolume() + 10)
}

fun main() {
    val tv = TV()
    val remote = Remote(tv)
    remote.togglePower()
    remote.volumeUp()
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
}

class TV implements Device {
    private on = false;
    private volume = 30;
    isEnabled() { return this.on; }
    enable() { this.on = true; }
    disable() { this.on = false; }
    getVolume() { return this.volume; }
    setVolume(percent: number) { this.volume = percent; }
}

class Radio implements Device {
    private on = false;
    private volume = 20;
    isEnabled() { return this.on; }
    enable() { this.on = true; }
    disable() { this.on = false; }
    getVolume() { return this.volume; }
    setVolume(percent: number) { this.volume = percent; }
}

class Remote {
    constructor(protected device: Device) {}

    togglePower() {
        if (this.device.isEnabled()) this.device.disable();
        else this.device.enable();
    }

    volumeDown() {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    volumeUp() {
        this.device.setVolume(this.device.getVolume() + 10);
    }
}

const tv = new TV();
const remote = new Remote(tv);
remote.togglePower();
remote.volumeUp();`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Device(ABC):
    @abstractmethod
    def is_enabled(self): pass
    @abstractmethod
    def enable(self): pass
    @abstractmethod
    def disable(self): pass
    @abstractmethod
    def get_volume(self): pass
    @abstractmethod
    def set_volume(self, percent): pass

class TV(Device):
    def __init__(self): self._on = False; self._volume = 30
    def is_enabled(self): return self._on
    def enable(self): self._on = True
    def disable(self): self._on = False
    def get_volume(self): return self._volume
    def set_volume(self, percent): self._volume = percent

class Radio(Device):
    def __init__(self): self._on = False; self._volume = 20
    def is_enabled(self): return self._on
    def enable(self): self._on = True
    def disable(self): self._on = False
    def get_volume(self): return self._volume
    def set_volume(self, percent): self._volume = percent

class Remote:
    def __init__(self, device: Device):
        self.device = device

    def toggle_power(self):
        if self.device.is_enabled(): self.device.disable()
        else: self.device.enable()

    def volume_down(self):
        self.device.set_volume(self.device.get_volume() - 10)

    def volume_up(self):
        self.device.set_volume(self.device.get_volume() + 10)

tv = TV()
remote = Remote(tv)
remote.toggle_power()
remote.volume_up()`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IDevice
{
    bool IsEnabled();
    void Enable();
    void Disable();
    int GetVolume();
    void SetVolume(int percent);
}

public class TV : IDevice
{
    private bool _on;
    private int _volume = 30;
    public bool IsEnabled() => _on;
    public void Enable() => _on = true;
    public void Disable() => _on = false;
    public int GetVolume() => _volume;
    public void SetVolume(int percent) => _volume = percent;
}

public class Radio : IDevice
{
    private bool _on;
    private int _volume = 20;
    public bool IsEnabled() => _on;
    public void Enable() => _on = true;
    public void Disable() => _on = false;
    public int GetVolume() => _volume;
    public void SetVolume(int percent) => _volume = percent;
}

public class Remote
{
    protected IDevice Device;
    public Remote(IDevice device) => Device = device;

    public void TogglePower()
    {
        if (Device.IsEnabled()) Device.Disable();
        else Device.Enable();
    }

    public void VolumeDown() =>
        Device.SetVolume(Device.GetVolume() - 10);
    public void VolumeUp() =>
        Device.SetVolume(Device.GetVolume() + 10);
}

static void Main()
{
    var tv = new TV();
    var remote = new Remote(tv);
    remote.TogglePower();
    remote.VolumeUp();
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
