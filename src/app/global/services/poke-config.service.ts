import { PokeDataService } from './poke-data.service';
import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PokeConfigService {

  private baseHref = "";

  constructor(
    private httpClientService: HttpClientService,
    private pokeDataService: PokeDataService
  ) { }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {

      /** Get configuration of site from profile.json
       */

      try {
        this.loadConfiguration();

        return resolve('');

      } catch(err) {
        return reject(err);
      }

    });
  }

  loadConfiguration() {
    const fileConfig = `${this.baseHref}/assets/config/profile.json`;

    this.httpClientService.getConfig(fileConfig).subscribe(
      config => {
        this.pokeDataService.setFormConfig(config);
      }
    );
  }

}
