import { environment } from './../../../../environments/environment.prod';
import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  private baseHref!:String;
  pokeImage!: string;
  
  constructor(
    private platformLocation: PlatformLocation
  ) {
    this.baseHref = environment.production ? this.platformLocation.getBaseHrefFromDOM() : '';
    this.pokeImage = this.baseHref + 'assets/img/pokemon-bar.svg';
  }

  ngOnInit(): void { }

}
