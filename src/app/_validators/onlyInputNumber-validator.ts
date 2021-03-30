import { AbstractControl } from "@angular/forms";

export function onlyInputNumber(control: AbstractControl): {[key: string]: boolean} | null {
    const regEx = new RegExp('^[0-9]*$');
    
    return !regEx.test(control.value) ? { 'error-input': true } : null;
}