import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokeball-loading',
  templateUrl: './pokeball-loading.component.html',
  styleUrls: ['./pokeball-loading.component.sass']
})
export class PokeballLoadingComponent implements OnInit {
  
  loadingBall!: string;
  private baseHref!:String;
  
  constructor(
    private platformLocation: PlatformLocation
  ) { 
    
    this.baseHref = environment.production ? this.platformLocation.getBaseHrefFromDOM() : '';
    this.loadingBall = `${this.baseHref}/assets/img/loading-Pokemon.gif`;
  }

  ngOnInit(): void {
  }

}
