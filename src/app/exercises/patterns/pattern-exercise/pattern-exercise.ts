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
