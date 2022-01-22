import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../../../../../global/services/http-client.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass']
})
export class InformationComponent implements OnInit {

  private baseHref: string;
  container: any;

  constructor(
    private httpClientService: HttpClientService,
    private platformLocation: PlatformLocation
  ) { 
    this.baseHref = environment.production ? this.platformLocation.getBaseHrefFromDOM() : '';
  }

  ngOnInit(): void {
    // loading all inputs in template
    this.loadConfiguration();

    // call service needed
    // this.httpClientService.requestMapping(``, {}, 'post', {});

  }

  loadConfiguration() {
    const fileConfig = `${this.baseHref}/assets/config/profile.json`;

    this.httpClientService.getConfig(fileConfig).subscribe(
      config => {
        console.log(config);
      }
    );

  }

  /**
   * imposible introduce
   * be friendly and to know
   * introduce u selft with lunck
   * small talk, hard, stress, boring, uncontrobal, polite. convers important
   * 
   * better relashionship, enjoy conversation with u coworkers
   * pathway learning new about coworker, discover, having fun
   * introduce to new team member
   * 
   * soccer, how better, messi or ronaldo, why the barcelona its bad
   * 
   * start with a complement and connect
   * strategy, where bougth somethings
   * learn about you
   * store u shope at
   * to find those initial connections, reali polite
   * 
   * 
   * 
   * get conversation flowing.
   * how long, how was u weekend.
   * commons questions....
   * it is hard to conversation to cut answer
   * depth question....
   * introduce and do a question
   * about work like here... find wonderful connection, about city live...
   * what kind to do...? lear about something new with ur coworkers
   * 
   * Ask for advice, some others opinions
   * buying a house of differents thing outside office..
   * appropiate topics
   * conversation going
   * make conversation more easy
   * 
   * 
   * 
   */

}
