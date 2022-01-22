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

  private baseHref!:String;

  constructor(
    private platformLocation: PlatformLocation
  ) { }

  ngOnInit(): void { }

}
