import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { translations, Lang } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  currentLang = signal<Lang>('en');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('lang') as Lang | null;
      if (saved === 'en' || saved === 'it') {
        this.currentLang.set(saved);
        document.documentElement.lang = saved;
      }
    }
  }

  translate(key: string): string {
    return translations[this.currentLang()]?.[key] ?? translations['en']?.[key] ?? key;
  }

  setLanguage(lang: Lang): void {
    this.currentLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    const next: Lang = this.currentLang() === 'en' ? 'it' : 'en';
    this.setLanguage(next);
  }
}
