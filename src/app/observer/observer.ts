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
  selector: 'app-observer',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './observer.html',
  styleUrl: './observer.css'
})
export class ObserverComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `import java.util.ArrayList;
import java.util.List;

// Observer interface
interface Observer {
    void update(float temperature);
}

// Subject
class WeatherStation {
    private List<Observer> observers = new ArrayList<>();
    private float temperature;

    public void addObserver(Observer o) {
        observers.add(o);
    }

    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    public void setTemperature(float temp) {
        this.temperature = temp;
        notifyObservers();
    }

    private void notifyObservers() {
        for (Observer o : observers) {
            o.update(temperature);
        }
    }
}

// Concrete observers
class PhoneDisplay implements Observer {
    public void update(float temp) {
        System.out.println("Phone: Temperature is " + temp + "°C");
    }
}

class WindowDisplay implements Observer {
    public void update(float temp) {
        System.out.println("Window: Temperature is " + temp + "°C");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        station.addObserver(new PhoneDisplay());
        station.addObserver(new WindowDisplay());
        station.setTemperature(25.5f);
        station.setTemperature(30.0f);
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `// Observer interface
interface Observer {
    fun update(temperature: Float)
}

// Subject
class WeatherStation {
    private val observers = mutableListOf<Observer>()
    private var temperature: Float = 0f

    fun addObserver(o: Observer) {
        observers.add(o)
    }

    fun removeObserver(o: Observer) {
        observers.remove(o)
    }

    fun setTemperature(temp: Float) {
        temperature = temp
        notifyObservers()
    }

    private fun notifyObservers() {
        observers.forEach { it.update(temperature) }
    }
}

// Concrete observers
class PhoneDisplay : Observer {
    override fun update(temp: Float) {
        println("Phone: Temperature is \${temp}°C")
    }
}

class WindowDisplay : Observer {
    override fun update(temp: Float) {
        println("Window: Temperature is \${temp}°C")
    }
}

// Usage
fun main() {
    val station = WeatherStation()
    station.addObserver(PhoneDisplay())
    station.addObserver(WindowDisplay())
    station.setTemperature(25.5f)
    station.setTemperature(30.0f)
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `// Observer interface
interface Observer {
  update(temperature: number): void;
}

// Subject
class WeatherStation {
  private observers: Observer[] = [];
  private temperature: number = 0;

  addObserver(o: Observer): void {
    this.observers.push(o);
  }

  removeObserver(o: Observer): void {
    const idx = this.observers.indexOf(o);
    if (idx !== -1) this.observers.splice(idx, 1);
  }

  setTemperature(temp: number): void {
    this.temperature = temp;
    this.notifyObservers();
  }

  private notifyObservers(): void {
    for (const o of this.observers) {
      o.update(this.temperature);
    }
  }
}

// Concrete observers
class PhoneDisplay implements Observer {
  update(temp: number): void {
    console.log(\`Phone: Temperature is \${temp}°C\`);
  }
}

class WindowDisplay implements Observer {
  update(temp: number): void {
    console.log(\`Window: Temperature is \${temp}°C\`);
  }
}

// Usage
const station = new WeatherStation();
station.addObserver(new PhoneDisplay());
station.addObserver(new WindowDisplay());
station.setTemperature(25.5);
station.setTemperature(30.0);`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

# Observer interface
class Observer(ABC):
    @abstractmethod
    def update(self, temperature: float):
        pass

# Subject
class WeatherStation:
    def __init__(self):
        self._observers = []
        self._temperature = 0.0

    def add_observer(self, observer: Observer):
        self._observers.append(observer)

    def remove_observer(self, observer: Observer):
        self._observers.remove(observer)

    def set_temperature(self, temp: float):
        self._temperature = temp
        self._notify_observers()

    def _notify_observers(self):
        for o in self._observers:
            o.update(self._temperature)

# Concrete observers
class PhoneDisplay(Observer):
    def update(self, temp: float):
        print(f"Phone: Temperature is {temp}°C")

class WindowDisplay(Observer):
    def update(self, temp: float):
        print(f"Window: Temperature is {temp}°C")

# Usage
station = WeatherStation()
station.add_observer(PhoneDisplay())
station.add_observer(WindowDisplay())
station.set_temperature(25.5)
station.set_temperature(30.0)`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;
using System.Collections.Generic;

// Observer interface
public interface IObserver
{
    void Update(float temperature);
}

// Subject
public class WeatherStation
{
    private List<IObserver> _observers = new();
    private float _temperature;

    public void AddObserver(IObserver o) => _observers.Add(o);

    public void RemoveObserver(IObserver o) => _observers.Remove(o);

    public void SetTemperature(float temp)
    {
        _temperature = temp;
        NotifyObservers();
    }

    private void NotifyObservers()
    {
        foreach (var o in _observers)
            o.Update(_temperature);
    }
}

// Concrete observers
public class PhoneDisplay : IObserver
{
    public void Update(float temp) =>
        Console.WriteLine($"Phone: Temperature is {temp}°C");
}

public class WindowDisplay : IObserver
{
    public void Update(float temp) =>
        Console.WriteLine($"Window: Temperature is {temp}°C");
}

// Usage
class Program
{
    static void Main()
    {
        var station = new WeatherStation();
        station.AddObserver(new PhoneDisplay());
        station.AddObserver(new WindowDisplay());
        station.SetTemperature(25.5f);
        station.SetTemperature(30.0f);
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
