import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays } from 'date-fns';
import { SharedValidators } from 'src/app/shared/utils/shared-validators';
import {
    END_FORM_CONTROL,
    PARTICIPANTS_FORM_CONTROL,
    RANGE_DATE_FORM_GROUP,
    SELECTED_DAYS_FORM_CONTROL,
    START_FORM_CONTROL,
} from './input-program-constantes';
import { InputProgramService } from './input-program.service';

@Component({
    selector: 'app-input-program',
    templateUrl: './input-program.component.html',
    styleUrls: ['./input-program.component.sass'],
})
export class InputProgramComponent implements OnInit {
    form!: FormGroup;
    weekDays = [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
    ];
    programDates: Array<Date> = [];
    participants: Array<string> = [];
    title = 'Informations initiales du programme';

    constructor(
        private fb: FormBuilder,
        private inputProgramService: InputProgramService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group(
            {
                participants: [
                    '',
                    [Validators.required, SharedValidators.notBlank],
                ],
                rangeDate: this.fb.group({
                    start: ['', Validators.required],
                    end: ['', Validators.required],
                }),
                selectedDays: ['', [Validators.required]],
                rolesNumber: [1, Validators.required],
            },
            {
                validators: [],
                updateOn: 'blur',
            }
        );
    }

    onValidateForm1() {
        if (this.form.valid) {
            this.initProgramDates();
            this.initParticipants();
            this.title = 'Indisponibilités des participants';
            console.log('partici prop : ' + JSON.stringify(this.participants));
        }
    }

    initProgramDates() {
        this.programDates = [];
        const selectedDays = this.form.get(SELECTED_DAYS_FORM_CONTROL)
            ?.value as Array<number>;
        let currDate = new Date(
            this.form.get(RANGE_DATE_FORM_GROUP)?.get(START_FORM_CONTROL)?.value
        );
        while (
            currDate <=
            this.form.get(RANGE_DATE_FORM_GROUP)?.get(END_FORM_CONTROL)?.value
        ) {
            if (selectedDays.includes(currDate.getDay())) {
                this.programDates.push(currDate);
            }
            currDate = addDays(currDate, 1);
        }
    }

    initParticipants() {
        this.participants = (
            this.form.get(PARTICIPANTS_FORM_CONTROL)?.value as string
        )
            .split('\n')
            .map((participant) => participant.trim())
            .filter((s) => s.length > 0);
    }
}
