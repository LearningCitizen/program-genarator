import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCALE_FR } from 'src/app/app-constantes';
import {
    DATE_FORMAT_FR,
    InputProgramGenerator,
} from './input-program-constantes';

@Injectable({
    providedIn: 'root',
})
export class InputProgramService {
    inputProgramGenerator$: BehaviorSubject<InputProgramGenerator | undefined> =
        new BehaviorSubject<InputProgramGenerator | undefined>(undefined);

    constructor(private datepipe: DatePipe) {}

    toDateFr(date: Date) {
        return this.datepipe.transform(
            date,
            DATE_FORMAT_FR,
            undefined,
            LOCALE_FR
        );
    }

    saveInputProgram(input: InputProgramGenerator) {
        this.inputProgramGenerator$.next(input);
    }

    getInputProgram() {
        return this.inputProgramGenerator$?.value;
    }
}
