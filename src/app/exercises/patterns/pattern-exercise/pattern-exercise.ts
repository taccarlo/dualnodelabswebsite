import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { TranslateService } from '../../../i18n/translate.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import packageJson from '../../../../../package.json';

interface PatternExerciseConfig {
  label: string;
  title: string;
  description: string;
  warning: string;
  url: string | null;
}

@Component({
  selector: 'app-pattern-exercise',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './pattern-exercise.html',
  styleUrl: './pattern-exercise.css'
})
export class PatternExerciseComponent {
  version = packageJson.version;
  private route = inject(ActivatedRoute);
  private translateService = inject(TranslateService);

  slug = '';

  private readonly patternExercises: Record<string, PatternExerciseConfig> = {
    builder: {
      label: 'Builder',
      title: 'Builder Pattern Practice',
      description: 'Practice the Builder pattern in Python.',
      warning: 'Without this pattern, object construction can turn into a long, fragile constructor chain that is hard to read and maintain.',
      url: 'https://stackblitz.com/edit/secret-python-fy4wvmjq?file=main.py'
    },
    singleton: {
      label: 'Singleton',
      title: 'Singleton Pattern Practice',
      description: 'Practice the Singleton pattern in Python.',
      warning: 'Without this pattern, shared resources can be created multiple times, causing inconsistent state and hard-to-debug bugs.',
      url: 'https://stackblitz.com/edit/secret-python-hb9cvs76?file=main.py'
    },
    'factory-method': {
      label: 'Factory Method',
      title: 'Factory Method Pattern Practice',
      description: 'Practice the Factory Method pattern in Python.',
      warning: 'Without this pattern, code can become tightly coupled to concrete classes, making future extensions and substitutions much harder.',
      url: 'https://stackblitz.com/edit/secret-python-tygpcxsw?file=main.py'
    },
    'abstract-factory': {
      label: 'Abstract Factory',
      title: 'Abstract Factory Pattern Practice',
      description: 'Practice the Abstract Factory pattern in Python.',
      warning: 'Without this pattern, switching families of related objects often requires scattered conditional logic and brittle changes.',
      url: 'https://stackblitz.com/edit/secret-python-s8knur2u?file=main.py'
    },
    adapter: {
      label: 'Adapter',
      title: 'Adapter Pattern Practice',
      description: 'Practice the Adapter pattern in Python.',
      warning: 'Without this pattern, incompatible interfaces can force awkward workarounds and duplicate logic across the codebase.',
      url: 'https://stackblitz.com/edit/secret-python-9bjvcxm9?file=main.py'
    },
    bridge: {
      label: 'Bridge',
      title: 'Bridge Pattern Practice',
      description: 'Practice the Bridge pattern in Python.',
      warning: 'Without this pattern, abstraction and implementation details become tightly coupled, making changes more expensive.',
      url: 'https://stackblitz.com/edit/secret-python-13jvmmvg?file=main.py'
    },
    composite: {
      label: 'Composite',
      title: 'Composite Pattern Practice',
      description: 'Practice the Composite pattern in Python.',
      warning: 'Without this pattern, tree-like structures are harder to manage and often require special-case logic for individual nodes.',
      url: 'https://stackblitz.com/edit/secret-python-ytr6dujk?file=main.py'
    },
    decorator: {
      label: 'Decorator',
      title: 'Decorator Pattern Practice',
      description: 'Practice the Decorator pattern in Python.',
      warning: 'Without this pattern, adding responsibilities often means creating many subclasses or modifying existing classes in risky ways.',
      url: 'https://stackblitz.com/edit/secret-python-36egzvjc?file=main.py'
    },
    facade: {
      label: 'Facade',
      title: 'Facade Pattern Practice',
      description: 'Practice the Facade pattern in Python.',
      warning: 'Without this pattern, clients must understand too many internal classes and dependencies, increasing complexity.',
      url: 'https://stackblitz.com/edit/secret-python-6oat66nh?file=main.py'
    },
    strategy: {
      label: 'Strategy',
      title: 'Strategy Pattern Practice',
      description: 'Practice the Strategy pattern in Python.',
      warning: 'Without this pattern, changing behavior often means branching through conditionals and duplicating logic.',
      url: 'https://stackblitz.com/edit/secret-python-3hvkxjyb?file=main.py'
    },
    observer: {
      label: 'Observer',
      title: 'Observer Pattern Practice',
      description: 'Practice the Observer pattern in Python.',
      warning: 'Without this pattern, components become tightly coupled and updates are harder to propagate consistently.',
      url: 'https://stackblitz.com/edit/secret-python-zisfzec5?file=main.py'
    },
    iterator: {
      label: 'Iterator',
      title: 'Iterator Pattern Practice',
      description: 'Practice the Iterator pattern in Python.',
      warning: 'Without this pattern, traversing collections often leaks internal details and makes client code more cumbersome.',
      url: 'https://stackblitz.com/edit/secret-python-vqrzr26k?file=main.py'
    },
    interpreter: {
      label: 'Interpreter',
      title: 'Interpreter Pattern Practice',
      description: 'Practice the Interpreter pattern in Python.',
      warning: 'Without this pattern, parsing domain-specific rules becomes scattered and difficult to evolve.',
      url: 'https://stackblitz.com/edit/secret-python-cqrakwgd?file=main.py'
    }
  };

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || this.route.snapshot.data['slug'] || '';
    });
  }

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }

  get currentExercise(): PatternExerciseConfig {
    return this.patternExercises[this.slug] ?? {
      label: this.patternName,
      title: `${this.patternName} Pattern Practice`,
      description: 'This pattern exercise is coming soon.',
      warning: 'Without this pattern, the design can become harder to evolve and maintain over time.',
      url: null
    };
  }

  get patternName(): string {
    if (!this.slug) {
      return 'Pattern';
    }

    return this.slug
      .split('-')
      .filter(Boolean)
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }
}
