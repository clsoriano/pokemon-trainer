import { PokeDataService } from './../../../../global/services/poke-data.service';
import { environment } from './../../../../../environments/environment';
import { HttpClientService } from './../../../../global/services/http-client.service';
import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(
    public pokeDataService: PokeDataService
  ) { }

  ngOnInit(): void { }


  backProfile() {
    if (this.pokeDataService.profileRegister.value || this.pokeDataService.pokemonSelector.value) {
      this.pokeDataService.profileRegister.next(false);
      this.pokeDataService.pokemonSelector.next(false);
    }
  }

}
