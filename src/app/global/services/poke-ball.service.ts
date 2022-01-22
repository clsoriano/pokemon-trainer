import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeBallService {

  visibility: BehaviorSubject<Boolean>;

  constructor() { 
    this.visibility = new BehaviorSubject<Boolean>(false);
  }

  showPokeBallLoading(){
    this.visibility.next(true);
  }

  hidePokeBallLoading(){
    this.visibility.next(false);
  }

}
