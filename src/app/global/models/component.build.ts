import { BehaviorSubject, Observable } from 'rxjs';
import { PokeDataService } from './../services/poke-data.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomValidator } from '../validator/custom.validator';
import { ValidatorElement } from './validator.element';

export class ComponentBuild {

  context: any = {};

  constructor(
    public pokeDataService: PokeDataService
  ){
    
    this.context['submitProfile'] = this.submitProfile;
    this.context['submitPokemon'] = this.submitPokemon;

  }


  /**
   * 
   * @param form 
   * @returns FormGroup
   * @description Convert object to formGroup and then return the formGroup built
   */
  loadFormControls(form: any): FormGroup {
      const { containers } = form;
      let group: any = {};
  
      containers.forEach((c:any) => {
  
        c.rows.forEach((r:any) => {
  
          r.columns.forEach((col: any) => {
            const { key, value, disabled } = col;
            
            // Create all formControls necessary for the component
            if (col.formField) {
              
              const { validatorsArray, asyncValidatorsArray } = this.validatorsBuild(col.validators);

              group[key] = new FormControl({ value, disabled}, validatorsArray, asyncValidatorsArray);
              group[key].valueChanges.subscribe(
                (value: any) => {
                  if (value) {
                    this.executeClient(value, col,  c.rows, group);
                  }
                }
              );
              
            }
          });
  
        });
  
      });
      
      return new FormGroup(group);
  
    }

  validatorsBuild(validators: any) {
      let validatorsArray: any = [];
      let asyncValidatorsArray: any = [];

    if (validators) {
        validators.forEach((v: ValidatorElement) => {
          // call to customValidator
          if (v.expression) 
            validatorsArray.push(CustomValidator(v, this.pokeDataService.formData))
          else
            validatorsArray.push(Validators[v.type]);
        });
    }
    
    return { validatorsArray, asyncValidatorsArray };
  }

  getErrorMessage(control: any, controller: AbstractControl | null): string {
    if (control.validators && controller && (controller.touched || controller.dirty)) {
      const error = control.validators.find( 
        (v: any) => !!this.getErrorObject(v.type, controller)
      );
      
      const errorObject = error ? this.getErrorObject(error.type, controller) : null;

      return this.constructorErrorMessage(error, errorObject);
    }

    return '';
  }

  private getErrorObject(errorType: string, controller: AbstractControl): ValidationErrors {
    const errors = controller.errors;
    return errors ? errors[errorType] : null;
  }

  private constructorErrorMessage(error: ValidatorElement, errorObject: any): string {
    if (error && errorObject) {
      if(typeof errorObject === 'object')
        return error.message.replace(/\{[\s\S]*?\}/g, (part) => {
          const removed = part.replace(/[\{\}]/g, '').trim();
          return errorObject[removed];
        });
    }

    return '';
  }



  loadAllConfig(formName: string): Observable<any> {
    var subject = new BehaviorSubject<any>({});

    this.pokeDataService.getFormConfig()
      .subscribe( (value: any) => {
          const formConfig = value.forms.find((x:any) => x.name == formName);
          let formGroup;

          if (formConfig) formGroup = this.loadFormControls(formConfig);
          
          subject.next({formConfig, formGroup});

      });

    return subject.asObservable();
  }

  convertValues(controls: any) {
    for (let c in controls){
      this.pokeDataService.formData[c] = controls[c].value;
    }
  }

  private executeClient(value: any, config: any, controls: any, group: any) {
    if (config) {
      const { execute } = config;
      
      if (execute) {
        const { clients } = execute;
        
        if (clients) {
          clients.forEach((client: any) => {
            const { onValueChange, expression, controls: controlsUpd } = client;
            
            if (onValueChange && expression) { // Validations on runtime with anonymous function,
              let control: any = undefined;
              // controls
              controls.forEach((r: any) => {
                if (control) return;

                for (let c in controlsUpd) {
                  control = r.columns.find((x: any) => x.key === c);
                }

              });
              
              this.customFunction(value, control, expression);

              // do refresh validations using group
              group[control.key]?.updateValueAndValidity();
              group[control.key]?.setValue('');

            }

          });
        }

      }

    }

  }

  customFunction(value: any, control: any, expression: any) {

    const tempFunc = new Function('value, control', expression);
    const result = tempFunc(value, control);

    if (result) console.log(result); // validate if is necessary get result
  }

  execFn(action: string, ...params: any[]) {
    const args = Array.prototype.slice.call(arguments, 1);

    return this.context[action].apply(this.context, args);
  }

  submitProfile() { console.error('Method not supported.'); }

  submitPokemon() { console.error('Method not supported.'); }

}