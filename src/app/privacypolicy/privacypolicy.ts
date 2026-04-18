import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-privacypolicy',
  imports: [RouterLink],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.css'
})
export class PrivacyPolicyComponent {
  version = packageJson.version;
}
