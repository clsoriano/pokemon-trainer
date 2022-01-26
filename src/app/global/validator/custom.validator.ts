import { AbstractControl, ValidatorFn } from "@angular/forms";
import { ValidatorElement } from "../models/validator.element";

export function CustomValidator(validator: ValidatorElement, values: any): ValidatorFn {
    return (control: AbstractControl): { [ key: string ]: any } | null => {
        if (control) {
            const { value } = control;
            const val: any = {};
            const tempFunc = new Function('value, values', validator.expression);
            const valTemp = tempFunc(value, values);
            val[validator.type] = valTemp;
            return (value && valTemp) || valTemp ? val : null;
        }
        return null;
    };
}