import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-design-patterns',
  imports: [NgFor, RouterLink, TranslatePipe],
  templateUrl: './design-patterns.html',
  styleUrl: './design-patterns.css'
})
export class DesignPatternsComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);

  creationalPatterns = [
    { name: 'Singleton', route: '/design-patterns/singleton' },
    { name: 'Builder', route: '/design-patterns/builder' },
    { name: 'Factory Method', route: '/design-patterns/factory-method' },
    { name: 'Abstract Factory', route: '/design-patterns/abstract-factory' },
    { name: 'Lazy Initialization', route: '/design-patterns/lazy-initialization' },
    { name: 'Prototype', route: '/design-patterns/prototype' },
    { name: 'Object Pool', route: '/design-patterns/object-pool' },
  ];
  structuralPatterns = [
    { name: 'Adapter', route: '/design-patterns/adapter' },
    { name: 'Bridge', route: '/design-patterns/bridge' },
    { name: 'Composite', route: '/design-patterns/composite' },
    { name: 'Decorator', route: '/design-patterns/decorator' },
    { name: 'Facade', route: '/design-patterns/facade' },
    { name: 'Flyweight', route: '/design-patterns/flyweight' },
    { name: 'Proxy', route: '/design-patterns/proxy' },
    { name: 'Dependency Injection', route: '/design-patterns/dependency-injection' },
  ];
  behavioralPatterns = [
    { name: 'Strategy', route: '/design-patterns/strategy' },
    { name: 'Observer', route: '/design-patterns/observer' },
    { name: 'Iterator', route: '/design-patterns/iterator' },
    { name: 'Interpreter', route: '/design-patterns/interpreter' },
  ];
  architecturalPatterns = [
    { name: 'Repository', route: '/design-patterns/repository' },
    { name: 'Result', route: '/design-patterns/result' },
  ];

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
