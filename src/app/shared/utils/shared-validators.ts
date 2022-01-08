import { AbstractControl, ValidationErrors } from "@angular/forms";

export class SharedValidators {

static notBlank(control: AbstractControl) : ValidationErrors|null {
    if(control.value && (control.value as string).trim().length === 0) {
        return {notBlank: true}
    }
    return null;
}
}
