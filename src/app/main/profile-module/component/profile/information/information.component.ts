import { PokeDataService } from './../../../../../global/services/poke-data.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from '../../../../../global/services/http-client.service';
import { PokeBallService } from '../../../../../global/services/poke-ball.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { BehaviorSubject, Observable, startWith, map, lastValueFrom } from 'rxjs';
import { ComponentBuild } from 'src/app/global/models/component.build';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { CustomErrorStateMatcher } from 'src/app/global/validator/custom-error-state.matcher';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass']
})
export class InformationComponent extends ComponentBuild implements OnInit, AfterViewInit {
  
  @ViewChild('hobbieInput') hobbieInput!: ElementRef<HTMLInputElement>;

  matcher = new CustomErrorStateMatcher();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  showForm: BehaviorSubject<Boolean>;
  formConfig: any;
  formGroup: FormGroup;
  formsGroup!: FormGroup;
  hobbies: string[] = [];
  filteredHobbies!: Observable<string[]> | undefined;
  allHobbies: string[] = ['Jugar Fútbol', 'Jugar Basquetball', 'Jugar Tennis', 'Jugar Voleibol', 'Jugar Fifa', 'Jugar Videojuegos'];

  formValid!: BehaviorSubject<Boolean>;
  pokemons!: BehaviorSubject<any[]>;

  pokemonSelected!: BehaviorSubject<any[]>;

  constructor(
    private httpClientService: HttpClientService,
    private formBuilder: FormBuilder,
    private pokeBallService: PokeBallService,
    pokeDataService: PokeDataService
  ) {
    super(pokeDataService);

    this.showForm = new BehaviorSubject<Boolean>(false);
    this.formValid  = new BehaviorSubject<Boolean>(false);
    this.pokemons = new BehaviorSubject<any[]>([]);
    this.pokemonSelected = new BehaviorSubject<any[]>([]);
    this.formGroup = this.formBuilder.group({});

    this.context['submitProfile'] = this.submitProfile;
    this.context['submitPokemon'] = this.submitPokemon;
    this.context['loadPokemon'] = this.loadPokemon;

  }

  ngOnInit(): void {
    // loading all inputs in template
    this.loadComponent();

    // call service needed
    // this.httpClientService.requestMapping(``, {}, 'post', {});

  }

  addHobbie(event: MatChipInputEvent, key: string){
    const value = (event.value || '').trim();

    if (value) {
      this.hobbies.push(value);
    }

    event.chipInput!.clear();
    this.formGroup.get(key)?.setValue(null);

  }

  loadComponent() {
    this.loadAllConfig('fmProfile').subscribe(
      (config: any) => {

        if (config) {
          const { formConfig, formGroup } = config;
          
          this.formConfig = formConfig;
          this.formGroup =   this.formsGroup?.get('fmProfile') ? this.formsGroup.get('fmProfile') : formGroup;

          this.formGroup.statusChanges.subscribe(
            status => {
              if( status != 'PENDING') {
                this.formValid.next(this.formGroup.valid && this.pokeDataService.imageProfile.value !== undefined);
                this.convertValues(this.formGroup.controls);
              }
            }
          );

          this.pokeDataService.imageProfile.subscribe(
            value => {
              if (value) this.formValid.next(this.formGroup.valid);
            }
          );

          this.filteredHobbies = this.formGroup.get('hobbie')?.valueChanges.pipe(
            startWith(null),
            map((hobbie: string | null) => (hobbie ? this._filter(hobbie) : this.allHobbies.slice()))
          );

          this.showForm.next(true);
        }
      }
    );
  }

  removeHobbie(hobbie: string): void {
    const index = this.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbieInput.nativeElement.value = '';
    this.formGroup.get('hobbie')?.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter(hobbie => hobbie.toLowerCase().includes(filterValue));
  }

  override submitProfile = () => {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      this.loadPokemon();
    }
  }

  override submitPokemon = () => {
    if (this.formGroup.valid) {
      this.pokeBallService.showPokeBallLoading();
      this.pokeDataService.formData.profile = "Entrenador";
      this.pokeDataService.profileRegister.next(false);
      this.pokeDataService.pokemonSelector.next(true);
      this.pokemonSelected.value.sort((a, b) => parseInt(a.order) - parseInt(b.order));
      setTimeout(()=> this.loadTrainer(), 3000);
    }
  }

  async findPokemonByIdOrName(url: string) {
    const result = this.httpClientService.requestMapping(url, {}, 'GET', {});
    const pokemon = await lastValueFrom(result);

    this.pokemons?.value.push(pokemon);
    //this.pokemons?.next(this.pokemons.value);
    this.pokemons.value.sort((a, b) => parseInt(a.order) - parseInt(b.order));

  }

  selectedPokemon (pokemon: any) {
    if (!pokemon.selected) {
      
      pokemon.selected = true;
      this.pokemonSelected.value.push(pokemon);

      this.formValid.next((this.pokemonSelected.value.length === 3));
    }

  }

  loadPokemon = () => {

    this.httpClientService.requestMapping('pokemon?offset=0&limit=9', {}, 'GET', {})
      
        .subscribe((response: any) => {

          this.pokeDataService.formData.title = '¡Ya casi términamos!';
          this.pokeDataService.formData.subtitle = 'Revisa la información, y completa lo solicitado.';
          this.pokeDataService.formData.hobbie = this.hobbies.toString();
          this.pokeDataService.profileRegister.next(true);
          this.pokeDataService.pokemonSelector.next(false);

          this.pokemons.next([]);
          
          const { results } = response;
          results.forEach( async (p: any) => {
            await this.findPokemonByIdOrName(p.url);
          });
          
          this.showForm.next(false);
          this.formValid.next(false);
          this.pokemonSelected.next([]);
          
          if(!this.formsGroup?.contains('fmProfile')) this.formsGroup = this.formBuilder.group({ fmProfile: this.formGroup });
          
          this.loadAllConfig('fmPokeSelected').subscribe(
            (config: any) => {

              if (config) {
                const { formConfig, formGroup } = config;
                
                this.formConfig = formConfig;
                this.formGroup = formGroup;

                this.formGroup.statusChanges.subscribe(
                  status => {
                    if( status != 'PENDING') {
                      this.formValid.next(this.formGroup.valid && this.pokeDataService.imageProfile.value !== undefined);
                      this.convertValues(this.formGroup.controls);
                    }
                  }
                );

                this.showForm.next(true);
              }
            }
          );

    });
  }

  loadTrainer(){
    this.showForm.next(false);
    this.formValid.next(false);
    
    if (!this.formsGroup?.contains('fmPokeSelected'))
      this.formsGroup = this.formBuilder.group({ fmProfile: this.formsGroup.get('fmProfile'), fmPokeSelected: this.formGroup });
    
    this.loadAllConfig('fmTrainer').subscribe(
      (config: any) => {

        if (config) {
          const { formConfig, formGroup } = config;
          
          this.formConfig = formConfig;
          this.formGroup = formGroup;

          this.formGroup.statusChanges.subscribe(
            status => {
              if( status != 'PENDING') {
                //this.formValid.next(this.formGroup.valid && this.pokeDataService.imageProfile.value !== undefined);
                this.convertValues(this.formGroup.controls);
              }
            }
          );

          this.showForm.next(true);
          this.pokeBallService.hidePokeBallLoading();
        }
      }
    );
  }

  ngAfterViewInit(): void {
    this.pokeDataService.profileRegister.subscribe(
      register => {
        
        if (!register && this.formsGroup?.get('fmProfile')) {
          this.pokeDataService.formData.title = '¡Hola! Configuremos tu perfil';
          this.pokeDataService.formData.subtitle = 'Queremos conocerte mejor.';
          this.pokeDataService.formData.profile = "Imágen perfil";
          this.loadComponent();
        }

      }
    )
  }

}