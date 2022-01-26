import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  formData: any;
  imageProfile: BehaviorSubject<any>;
  private formConfig: BehaviorSubject<any>;
  profileRegister: BehaviorSubject<Boolean>;
  pokemonSelector: BehaviorSubject<Boolean>;


  constructor() { 
    this.formConfig = new BehaviorSubject<any>({});
    this.imageProfile = new BehaviorSubject<any>(undefined);
    this.profileRegister = new BehaviorSubject<Boolean>(false);
    this.pokemonSelector = new BehaviorSubject<Boolean>(false);
    
    this.formData = {
      title: '¡Hola! Configuremos tu perfil',
      subtitle: 'Queremos conocerte mejor.',
      profile: 'Imágen perfil'
    };
  }


  setFormConfig(config: any) {
    this.formConfig.next(config);
  }

  getFormConfig(): BehaviorSubject<any> {
    return this.formConfig;
  }
  
}
