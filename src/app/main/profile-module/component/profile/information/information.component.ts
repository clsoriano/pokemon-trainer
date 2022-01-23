import { PokeDataService } from './../../../../../global/services/poke-data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../../../global/services/http-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { BehaviorSubject } from 'rxjs';
import { ComponentBuild } from 'src/app/global/models/component.build';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass']
})
export class InformationComponent extends ComponentBuild implements OnInit {
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  showForm: BehaviorSubject<Boolean>;
  formGroup: FormGroup;
  form: any;
  hobbies: string[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private pokeDataService: PokeDataService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.showForm = new BehaviorSubject<Boolean>(false);
    this.formGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    // loading all inputs in template
    this.pokeDataService.getFormData().subscribe(
      (value: any) => {
        this.form = value.forms.find((x:any) => x.name == 'fmProfile');

        if (this.form) this.formGroup = this.loadFormControls(this.form);

        this.showForm.next(true);

      }
    )

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

  removeHobbie(hobbie: string): void {
    const index = this.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

}