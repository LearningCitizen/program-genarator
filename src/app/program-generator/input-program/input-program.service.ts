import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { LOCALE_FR } from 'src/app/app-constantes';
import { DATE_FORMAT_FR } from './input-program-constantes';

@Injectable({
    providedIn: 'root',
})
export class InputProgramService {
    constructor(private datepipe: DatePipe) {}

    toDateFr(date: Date) {
        return this.datepipe.transform(
            date,
            DATE_FORMAT_FR,
            undefined,
            LOCALE_FR
        );
    }

    /**TODO */
    saveInputProgram(input: any){

    }
}
