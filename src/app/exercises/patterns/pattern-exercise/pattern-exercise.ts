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
  openText: string;
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

  private readonly patternExercises: Record<string, { label: string; titleKey: string; descriptionKey: string; warningKey: string; url: string | null }> = {
    builder: {
      label: 'Builder',
      titleKey: 'exercises.patterns.builder.practice.title',
      descriptionKey: 'exercises.patterns.builder.practice.description',
      warningKey: 'exercises.patterns.builder.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-fy4wvmjq?file=main.py'
    },
    singleton: {
      label: 'Singleton',
      titleKey: 'exercises.patterns.singleton.practice.title',
      descriptionKey: 'exercises.patterns.singleton.practice.description',
      warningKey: 'exercises.patterns.singleton.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-hb9cvs76?file=main.py'
    },
    'factory-method': {
      label: 'Factory Method',
      titleKey: 'exercises.patterns.factory-method.practice.title',
      descriptionKey: 'exercises.patterns.factory-method.practice.description',
      warningKey: 'exercises.patterns.factory-method.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-tygpcxsw?file=main.py'
    },
    'abstract-factory': {
      label: 'Abstract Factory',
      titleKey: 'exercises.patterns.abstract-factory.practice.title',
      descriptionKey: 'exercises.patterns.abstract-factory.practice.description',
      warningKey: 'exercises.patterns.abstract-factory.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-s8knur2u?file=main.py'
    },
    'lazy-initialization': {
      label: 'Lazy Initialization',
      titleKey: 'exercises.patterns.lazy-initialization.practice.title',
      descriptionKey: 'exercises.patterns.lazy-initialization.practice.description',
      warningKey: 'exercises.patterns.lazy-initialization.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-qrnuhdjg?file=main.py'
    },
    prototype: {
      label: 'Prototype',
      titleKey: 'exercises.patterns.prototype.practice.title',
      descriptionKey: 'exercises.patterns.prototype.practice.description',
      warningKey: 'exercises.patterns.prototype.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-pfawyra9?file=main.py'
    },
    result: {
      label: 'Result',
      titleKey: 'exercises.patterns.result.practice.title',
      descriptionKey: 'exercises.patterns.result.practice.description',
      warningKey: 'exercises.patterns.result.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-9rwjs3iz?file=main.py'
    },
    repository: {
      label: 'Repository',
      titleKey: 'exercises.patterns.repository.practice.title',
      descriptionKey: 'exercises.patterns.repository.practice.description',
      warningKey: 'exercises.patterns.repository.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-yeld7czx?file=main.py'
    },
    adapter: {
      label: 'Adapter',
      titleKey: 'exercises.patterns.adapter.practice.title',
      descriptionKey: 'exercises.patterns.adapter.practice.description',
      warningKey: 'exercises.patterns.adapter.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-9bjvcxm9?file=main.py'
    },
    bridge: {
      label: 'Bridge',
      titleKey: 'exercises.patterns.bridge.practice.title',
      descriptionKey: 'exercises.patterns.bridge.practice.description',
      warningKey: 'exercises.patterns.bridge.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-13jvmmvg?file=main.py'
    },
    composite: {
      label: 'Composite',
      titleKey: 'exercises.patterns.composite.practice.title',
      descriptionKey: 'exercises.patterns.composite.practice.description',
      warningKey: 'exercises.patterns.composite.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-ytr6dujk?file=main.py'
    },
    decorator: {
      label: 'Decorator',
      titleKey: 'exercises.patterns.decorator.practice.title',
      descriptionKey: 'exercises.patterns.decorator.practice.description',
      warningKey: 'exercises.patterns.decorator.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-36egzvjc?file=main.py'
    },
    facade: {
      label: 'Facade',
      titleKey: 'exercises.patterns.facade.practice.title',
      descriptionKey: 'exercises.patterns.facade.practice.description',
      warningKey: 'exercises.patterns.facade.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-6oat66nh?file=main.py'
    },
    strategy: {
      label: 'Strategy',
      titleKey: 'exercises.patterns.strategy.practice.title',
      descriptionKey: 'exercises.patterns.strategy.practice.description',
      warningKey: 'exercises.patterns.strategy.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-3hvkxjyb?file=main.py'
    },
    observer: {
      label: 'Observer',
      titleKey: 'exercises.patterns.observer.practice.title',
      descriptionKey: 'exercises.patterns.observer.practice.description',
      warningKey: 'exercises.patterns.observer.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-zisfzec5?file=main.py'
    },
    iterator: {
      label: 'Iterator',
      titleKey: 'exercises.patterns.iterator.practice.title',
      descriptionKey: 'exercises.patterns.iterator.practice.description',
      warningKey: 'exercises.patterns.iterator.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-vqrzr26k?file=main.py'
    },
    interpreter: {
      label: 'Interpreter',
      titleKey: 'exercises.patterns.interpreter.practice.title',
      descriptionKey: 'exercises.patterns.interpreter.practice.description',
      warningKey: 'exercises.patterns.interpreter.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-cqrakwgd?file=main.py'
    },
    'object-pool': {
      label: 'Object Pool',
      titleKey: 'exercises.patterns.object-pool.practice.title',
      descriptionKey: 'exercises.patterns.object-pool.practice.description',
      warningKey: 'exercises.patterns.object-pool.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-yberw64q?file=main.py'
    },
    flyweight: {
      label: 'Flyweight',
      titleKey: 'exercises.patterns.flyweight.practice.title',
      descriptionKey: 'exercises.patterns.flyweight.practice.description',
      warningKey: 'exercises.patterns.flyweight.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-wvnddrdo?file=main.py'
    },
    proxy: {
      label: 'Proxy',
      titleKey: 'exercises.patterns.proxy.practice.title',
      descriptionKey: 'exercises.patterns.proxy.practice.description',
      warningKey: 'exercises.patterns.proxy.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-1iv5zmxk?file=main.py'
    },
    'dependency-injection': {
      label: 'Dependency Injection',
      titleKey: 'exercises.patterns.dependency-injection.practice.title',
      descriptionKey: 'exercises.patterns.dependency-injection.practice.description',
      warningKey: 'exercises.patterns.dependency-injection.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-gar7i4y5?file=main.py'
    },
    'null-object': {
      label: 'Null Object',
      titleKey: 'exercises.patterns.null-object.practice.title',
      descriptionKey: 'exercises.patterns.null-object.practice.description',
      warningKey: 'exercises.patterns.null-object.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-tgametvf?file=main.py'
    },
    'template-method': {
      label: 'Template Method',
      titleKey: 'exercises.patterns.template-method.practice.title',
      descriptionKey: 'exercises.patterns.template-method.practice.description',
      warningKey: 'exercises.patterns.template-method.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-bjxfndhg?file=main.py'
    },
    visitor: {
      label: 'Visitor',
      titleKey: 'exercises.patterns.visitor.practice.title',
      descriptionKey: 'exercises.patterns.visitor.practice.description',
      warningKey: 'exercises.patterns.visitor.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-odeuysnk?file=main.py'
    },
    command: {
      label: 'Command',
      titleKey: 'exercises.patterns.command.practice.title',
      descriptionKey: 'exercises.patterns.command.practice.description',
      warningKey: 'exercises.patterns.command.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-iw4hrkzg?file=main.py'
    },
    memento: {
      label: 'Memento',
      titleKey: 'exercises.patterns.memento.practice.title',
      descriptionKey: 'exercises.patterns.memento.practice.description',
      warningKey: 'exercises.patterns.memento.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-sq7tsvsy?file=main.py'
    },
    state: {
      label: 'State',
      titleKey: 'exercises.patterns.state.practice.title',
      descriptionKey: 'exercises.patterns.state.practice.description',
      warningKey: 'exercises.patterns.state.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-6lpzyk6g?file=main.py'
    },
    'chain-of-responsibility': {
      label: 'Chain of Responsibility',
      titleKey: 'exercises.patterns.chain-of-responsibility.practice.title',
      descriptionKey: 'exercises.patterns.chain-of-responsibility.practice.description',
      warningKey: 'exercises.patterns.chain-of-responsibility.practice.warning',
      url: 'https://stackblitz.com/edit/secret-python-h11srkns?file=main.py'
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
    const exercise = this.patternExercises[this.slug];

    const label = exercise?.label ?? this.patternName;
    const title = this.translateWithPattern(exercise?.titleKey ?? 'exercises.patterns.exercise.fallback.title');
    const description = this.translateService.translate(exercise?.descriptionKey ?? 'exercises.patterns.exercise.fallback.description');
    const warning = this.translateWithPattern(exercise?.warningKey ?? 'exercises.patterns.exercise.fallback.warning');
    const openText = this.translateWithPattern('exercises.patterns.exercise.openText', label);

    return {
      label,
      title,
      description,
      warning,
      openText,
      url: exercise?.url ?? null
    };
  }

  private translateWithPattern(key: string, fallbackLabel?: string): string {
    const value = this.translateService.translate(key);
    const patternLabel = fallbackLabel ?? this.patternName;
    return value.includes('{pattern}') ? value.replace('{pattern}', patternLabel) : value;
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
