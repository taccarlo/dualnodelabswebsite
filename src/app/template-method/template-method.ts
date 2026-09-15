import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-template-method',
  imports: [IdePanelComponent],
  templateUrl: './template-method.html',
  styleUrl: './template-method.css'
})
export class TemplateMethodComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public abstract class DataProcessor {
    public final void process() {
        loadData();
        if (isValid()) {
            transform();
        }
        save();
    }

    protected abstract void loadData();
    protected abstract void transform();
    protected abstract void save();

    protected boolean isValid() {
        return true;
    }
}

public class CsvProcessor extends DataProcessor {
    protected void loadData() {
        System.out.println("Loading CSV file...");
    }

    protected void transform() {
        System.out.println("Transforming CSV rows...");
    }

    protected void save() {
        System.out.println("Saving to database...");
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `abstract class DataProcessor {
    final fun process() {
        loadData()
        if (isValid()) {
            transform()
        }
        save()
    }

    protected abstract fun loadData()
    protected abstract fun transform()
    protected abstract fun save()

    protected open fun isValid(): Boolean = true
}

class CsvProcessor : DataProcessor() {
    override fun loadData() {
        println("Loading CSV file...")
    }

    override fun transform() {
        println("Transforming CSV rows...")
    }

    override fun save() {
        println("Saving to database...")
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `abstract class DataProcessor {
    process(): void {
        this.loadData();
        if (this.isValid()) {
            this.transform();
        }
        this.save();
    }

    protected abstract loadData(): void;
    protected abstract transform(): void;
    protected abstract save(): void;

    protected isValid(): boolean {
        return true;
    }
}

class CsvProcessor extends DataProcessor {
    protected loadData(): void {
        console.log("Loading CSV file...");
    }

    protected transform(): void {
        console.log("Transforming CSV rows...");
    }

    protected save(): void {
        console.log("Saving to database...");
    }
}`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class DataProcessor(ABC):
    def process(self) -> None:
        self.load_data()
        if self.is_valid():
            self.transform()
        self.save()

    @abstractmethod
    def load_data(self) -> None:
        pass

    @abstractmethod
    def transform(self) -> None:
        pass

    @abstractmethod
    def save(self) -> None:
        pass

    def is_valid(self) -> bool:
        return True

class CsvProcessor(DataProcessor):
    def load_data(self) -> None:
        print("Loading CSV file...")

    def transform(self) -> None:
        print("Transforming CSV rows...")

    def save(self) -> None:
        print("Saving to database...")`
    },
    'C#': {
      lang: 'csharp',
      code: `public abstract class DataProcessor
{
    public void Process()
    {
        LoadData();
        if (IsValid())
        {
            Transform();
        }
        Save();
    }

    protected abstract void LoadData();
    protected abstract void Transform();
    protected abstract void Save();

    protected virtual bool IsValid() => true;
}

public class CsvProcessor : DataProcessor
{
    protected override void LoadData()
        => Console.WriteLine("Loading CSV file...");

    protected override void Transform()
        => Console.WriteLine("Transforming CSV rows...");

    protected override void Save()
        => Console.WriteLine("Saving to database...");
}`
    }
  };
}