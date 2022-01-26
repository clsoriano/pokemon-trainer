import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokeDataService } from 'src/app/global/services/poke-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  private baseHref!:String;
  pokeImage!: string;
  
  constructor(
    private platformLocation: PlatformLocation,
    public pokeDataService: PokeDataService
  ) {
    this.baseHref = environment.production ? this.platformLocation.getBaseHrefFromDOM() : '';
    this.pokeImage = this.baseHref + 'assets/img/pokemon-bar.svg';
  }

  ngOnInit(): void { }

}
