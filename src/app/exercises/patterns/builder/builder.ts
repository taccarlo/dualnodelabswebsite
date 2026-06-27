import { Component } from '@angular/core';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-builder-exercise',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './builder.html',
  styleUrl: './builder.css'
})
export class BuilderExerciseComponent {}
