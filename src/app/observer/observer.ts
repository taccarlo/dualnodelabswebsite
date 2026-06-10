import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-observer',
  imports: [IdePanelComponent],
  templateUrl: './observer.html',
  styleUrl: './observer.css'
})
export class ObserverComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(String news);
}

class NewsChannel implements Observer {
    private String name;

    NewsChannel(String name) { this.name = name; }

    public void update(String news) {
        System.out.println(name
            + " received: " + news);
    }
}

class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    private String news;

    void addObserver(Observer observer) {
        observers.add(observer);
    }

    void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    void setNews(String news) {
        this.news = news;
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
}

public static void main(String[] args) {
    NewsAgency agency = new NewsAgency();

    NewsChannel cnbc = new NewsChannel("CNBC");
    NewsChannel bbc = new NewsChannel("BBC");

    agency.addObserver(cnbc);
    agency.addObserver(bbc);

    agency.setNews("Breaking News!");
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface Observer {
    fun update(news: String)
}

class NewsChannel(private val name: String) : Observer {
    override fun update(news: String) =
        println("$name received: $news")
}

class NewsAgency {
    private val observers = mutableListOf<Observer>()
    private var news: String = ""

    fun addObserver(observer: Observer) = observers.add(observer)
    fun removeObserver(observer: Observer) = observers.remove(observer)

    fun setNews(news: String) {
        this.news = news
        observers.forEach { it.update(news) }
    }
}

fun main() {
    val agency = NewsAgency()
    val cnbc = NewsChannel("CNBC")
    val bbc = NewsChannel("BBC")

    agency.addObserver(cnbc)
    agency.addObserver(bbc)
    agency.setNews("Breaking News!")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface Observer {
    update(news: string): void;
}

class NewsChannel implements Observer {
    constructor(private name: string) {}

    update(news: string): void {
        console.log(this.name, "received:", news);
    }
}

class NewsAgency {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        const idx = this.observers.indexOf(observer);
        if (idx >= 0) this.observers.splice(idx, 1);
    }

    setNews(news: string): void {
        for (const observer of this.observers) {
            observer.update(news);
        }
    }
}

const agency = new NewsAgency();
const cnbc = new NewsChannel("CNBC");
const bbc = new NewsChannel("BBC");

agency.addObserver(cnbc);
agency.addObserver(bbc);
agency.setNews("Breaking News!");`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, news: str): pass

class NewsChannel(Observer):
    def __init__(self, name): self.name = name
    def update(self, news):
        print(f"{self.name} received: {news}")

class NewsAgency:
    def __init__(self):
        self.observers = []

    def add_observer(self, observer):
        self.observers.append(observer)

    def remove_observer(self, observer):
        self.observers.remove(observer)

    def set_news(self, news):
        for observer in self.observers:
            observer.update(news)

agency = NewsAgency()
cnbc = NewsChannel("CNBC")
bbc = NewsChannel("BBC")

agency.add_observer(cnbc)
agency.add_observer(bbc)
agency.set_news("Breaking News!")`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IObserver
{
    void Update(string news);
}

public class NewsChannel : IObserver
{
    private string _name;
    public NewsChannel(string name) => _name = name;
    public void Update(string news) =>
        Console.WriteLine($"{_name} received: {news}");
}

public class NewsAgency
{
    private List<IObserver> _observers = new();

    public void AddObserver(IObserver observer) =>
        _observers.Add(observer);

    public void RemoveObserver(IObserver observer) =>
        _observers.Remove(observer);

    public void SetNews(string news)
    {
        foreach (var observer in _observers)
            observer.Update(news);
    }
}

static void Main()
{
    var agency = new NewsAgency();
    var cnbc = new NewsChannel("CNBC");
    var bbc = new NewsChannel("BBC");

    agency.AddObserver(cnbc);
    agency.AddObserver(bbc);
    agency.SetNews("Breaking News!");
}`
    }
  };
}
