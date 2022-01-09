import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays } from 'date-fns';
import { SharedValidators } from 'src/app/shared/utils/shared-validators';
import {
    AVAILABILITY_FORM,
    END_FORM_CONTROL,
    INITIAL_FORM,
    PARTICIPANTS_FORM_CONTROL,
    RANGE_DATE_FORM_GROUP,
    ROLES_NUMBER_FORM_CONTROL,
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
    rolesByDates: Array<number> = [];
    unavailableParticipantsArray: any[] = [];
    displayForm = INITIAL_FORM;

    constructor(
        private fb: FormBuilder,
        private inputProgramService: InputProgramService
    ) {}

    ngOnInit(): void {
        this.initInitialForm();
    }

    initInitialForm() {
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
            this.initRolesByDates();
            this.updateUnavailablePartFromRoles();
            this.initAvailabilityForm();
            this.title = 'Indisponibilités des participants';
            this.displayForm = AVAILABILITY_FORM;
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

    initRolesByDates() {
        this.programDates.forEach(() =>
            this.rolesByDates.push(
                this.form.get(ROLES_NUMBER_FORM_CONTROL)?.value
            )
        );
    }
    initAvailabilityForm() {
        this.form = this.fb.group(
            {},
            {
                validators: [],
                updateOn: 'blur',
            }
        );
        this.programDates.forEach((pgmDate, index) => {
            this.form.addControl(`pgmDate_${index}`, this.fb.control(pgmDate));
            this.form.addControl(
                `rolesNumber_${index}`,
                this.fb.control(this.rolesByDates[index])
            );
            /* create unavailability for each roles */
            Array.from({ length: this.rolesByDates[index] }).forEach(
                (_, index2) =>
                    this.form.addControl(
                        `unavailablePart_${index}_${index2}`,
                        this.fb.control([])
                    )
            );
        });
    }

    updateUnavailablePartFromRoles() {
        this.rolesByDates.forEach((roles: number) => {
            this.unavailableParticipantsArray.push(
                Array.from({ length: roles })
            );
        });
    }

    arrayOfRolesByDate(index: number) {
        return Array(this.rolesByDates[index]);
    }

    onRolesChanges(index: number) {
        this.form.get('rolesNumber_${index}');
    }
}
