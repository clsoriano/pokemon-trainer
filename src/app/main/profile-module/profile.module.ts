import { MaterialModule } from './../../global/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { InformationComponent } from './component/profile/information/information.component';
import { LoadImageComponent } from './component/profile/load-image/load-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';



@NgModule({
  declarations: [
    ProfileComponent,
    LoadImageComponent,
    InformationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ProfileRoutingModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ProfileRoutingModule
  ],
  providers:[
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
