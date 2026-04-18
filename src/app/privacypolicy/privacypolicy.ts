import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacypolicy',
  imports: [RouterLink],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.css'
})
export class PrivacyPolicyComponent {
  version = '0.0.1';
}
