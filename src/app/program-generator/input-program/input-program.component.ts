import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group(
            {
                participants: ['', Validators.required, SharedValidators.notBlank],
                rangeDate: this.fb.group({
                    start: ['', Validators.required],
                    end: ['', Validators.required],
                }),
                selectedDays: ['', Validators.required, SharedValidators.notBlank],
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
    }

}
