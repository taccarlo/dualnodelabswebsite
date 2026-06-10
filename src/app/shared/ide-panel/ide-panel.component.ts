import { Component, Input, inject, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslateService } from '../../i18n/translate.service';
import { RouterLink } from '@angular/router';

import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-csharp';

@Component({
  selector: 'app-ide-panel',
  imports: [NgFor, TranslatePipe, RouterLink],
  templateUrl: './ide-panel.component.html',
  styleUrl: './ide-panel.component.css'
})
export class IdePanelComponent {
  @Input() codeSamples: Record<string, { code: string; lang: string }> = {};
  @Input() version = '';
  @Input() backKey = '';
  @Input() subtitleKey = '';
  @Input() titleKey = '';
  @Input() descriptionKey = '';

  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);

  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;

  codeFlex = '4 1 0';
  infoFlex = '6 1 0';
  isDragging = false;
  private startPos = 0;
  private startFlex = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.doResize(e);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDragging = true;
    this.startPos = this.getClientPos(e);
    this.startFlex = parseFloat(this.infoFlex);
  }

  private getClientPos(e: MouseEvent | TouchEvent): number {
    const isMobile = window.innerWidth <= 768;
    const val = 'touches' in e ? e.touches[0] : e;
    return isMobile ? val.clientY : val.clientX;
  }

  private doResize(e: MouseEvent | TouchEvent) {
    const dp = document.querySelector('.dp-page') as HTMLElement;
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    const pos = this.getClientPos(e);
    const total = isMobile ? rect.height : rect.width;
    const pct = ((pos - (isMobile ? rect.top : rect.left)) / total) * 100;
    const clamped = Math.max(30, Math.min(80, pct));
    this.infoFlex = `${clamped} 1 0`;
    this.codeFlex = `${100 - clamped} 1 0`;
  }

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    if (!sample) return '';
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
