import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays } from 'date-fns';
import { SharedValidators } from 'src/app/shared/utils/shared-validators';

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
    constructor(private fb: FormBuilder) {}

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
        // console.log('rangeDate : '+JSON.stringify(this.form.get('rangeDate')))
        console.log(
            'start : ' + this.form.get('rangeDate')?.get('start')?.value
        );
        console.log('end : ' + this.form.get('rangeDate')?.get('end')?.value);
        console.log('participants : ' + this.form.get('participants')?.value);

        this.initProgramDates();
        console.log('programDates : ' + JSON.stringify(this.programDates));
    }

    initProgramDates() {
        console.log('form valid : ' + this.form.valid);
        if (this.form.valid) {
            this.programDates = [];
            const selectedDays = this.form.get('selectedDays')
                ?.value as Array<number>;
            let currDate = new Date(
                this.form.get('rangeDate')?.get('start')?.value
            );
            console.log(
                'selectedDays : ' + selectedDays + ' currDate : ' + currDate
            );
            while (currDate <= this.form.get('rangeDate')?.get('end')?.value) {
                console.log(
                    'currDate : ' + currDate + ' getDay : ' + currDate.getDay()
                );
                if (selectedDays.includes(currDate.getDay())) {
                    this.programDates.push(currDate);
                }
                currDate = addDays(currDate, 1);
            }
        }
    }
}
