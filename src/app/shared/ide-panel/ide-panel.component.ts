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
  private startX = 0;
  private startCodeFlex = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.doResize(e.clientX);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDragging = true;
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.startX = cx;
    this.startCodeFlex = parseFloat(this.codeFlex);
  }

  private doResize(clientX: number) {
    const dp = (document.querySelector('.dp-page') as HTMLElement);
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width * 100;
    const clamped = Math.max(30, Math.min(80, pct));
    this.codeFlex = `${clamped} 1 0`;
    this.infoFlex = `${100 - clamped} 1 0`;
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
