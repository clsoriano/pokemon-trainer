import { PokeConfigService } from './global/services/poke-config.service';
import { PokeDataService } from './global/services/poke-data.service';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateFormatPipe } from './global/pipes/date-format.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './global/components/not-found/not-found.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PokeballLoadingComponent } from './global/components/pokeball-loading/pokeball-loading.component';
import { HeaderComponent } from './global/components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CustomHttpInterceptor } from './global/interceptors/custom.http.interceptor';
import { PokeBallService } from './global/services/poke-ball.service';

@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    PokeballLoadingComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [
    PokeDataService,
    PokeConfigService,
    PokeBallService,
    CustomHttpInterceptor,
    DateFormatPipe,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: PokeConfigService) => function() { return service.init(); },
      deps: [PokeConfigService],
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appareance: 'fill' }
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
