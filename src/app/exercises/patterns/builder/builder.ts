import { Component, afterNextRender } from '@angular/core';
import sdk from '@stackblitz/sdk';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-builder-exercise',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './builder.html',
  styleUrl: './builder.css'
})
export class BuilderExerciseComponent {
  constructor() {
    afterNextRender(() => {
      sdk.embedProjectId(
        'stackblitz-container',
        'secret-python-fy4wvmjq',
        {
          forceEmbedLayout: true,
          openFile: 'main.py',
        }
      );
    });
  }
}
