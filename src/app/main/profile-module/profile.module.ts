import { MaterialModule } from './../../global/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { InformationComponent } from './component/profile/information/information.component';
import { LoadImageComponent } from './component/profile/load-image/load-image.component';



@NgModule({
  declarations: [
    ProfileComponent,
    LoadImageComponent,
    InformationComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule
  ]
})
export class ProfileModule { }
