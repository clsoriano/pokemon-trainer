import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  private formData: BehaviorSubject<any>;


  constructor() { 
    this.formData = new BehaviorSubject<any>({});
  }


  setFormData(data: any) {
    this.formData.next(data);
  }

  getFormData(): BehaviorSubject<any> {
    return this.formData;
  }
  
}
