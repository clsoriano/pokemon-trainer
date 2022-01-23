import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientService } from './global/services/http-client.service';
import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'pokemon-trainer';
}
