import { Component } from '@angular/core';
import { PokeBallService } from './global/services/poke-ball.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'pokemon-trainer';

  constructor(
    public pokeBallService: PokeBallService
  ){}
}
