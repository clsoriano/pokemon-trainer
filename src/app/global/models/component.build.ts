import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorElement } from './validator.element';
export class ComponentBuild {

    constructor(){}


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

                validatorsArray.push(Validators[v.type]);
            });
        }
        return { validatorsArray, asyncValidatorsArray };
      }

}