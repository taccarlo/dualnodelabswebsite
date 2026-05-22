import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  private service = inject(TranslateService);

  transform(key: string): string {
    return this.service.translate(key);
  }
}
