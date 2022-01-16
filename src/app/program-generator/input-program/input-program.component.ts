import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addDays } from 'date-fns';
import { SharedValidators } from 'src/app/shared/utils/shared-validators';
import {
    AVAILABILITY_FORM,
    END_FORM_CONTROL,
    INITIAL_FORM,
    InputProgramGenerator,
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
    styleUrls: ['./input-program.component.scss'],
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
    unavailableParticipantsArray: number[][] = [];
    displayForm = INITIAL_FORM;

    constructor(
        private fb: FormBuilder,
        private inputProgramService: InputProgramService,
        private router: Router
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
                updateOn: 'change',
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
                updateOn: 'change',
            }
        );
        this.addControlsToAvailabilityForm();
    }

    addControlsToAvailabilityForm() {
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
            this.form
                .get(`rolesNumber_${index}`)
                ?.valueChanges.subscribe((newRolesNumber) =>
                    this.onRolesChanges(index, newRolesNumber)
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

    onRolesChanges(index: number, newRolesNumber: number) {
        this.updateUnavailableControlsOnRolesChange(index, newRolesNumber);
        this.rolesByDates[index] = newRolesNumber;
        this.unavailableParticipantsArray[index] = Array.from({
            length: newRolesNumber,
        });
    }

    updateUnavailableControlsOnRolesChange(
        index: number,
        newRolesNumber: number
    ) {
        const diffNewRoles = newRolesNumber - this.rolesByDates[index];
        Array.from({ length: Math.abs(diffNewRoles) }).forEach((_, index2) => {
            if (diffNewRoles > 0) {
                this.form.addControl(
                    `unavailablePart_${index}_${
                        this.rolesByDates[index] + index2
                    }`,
                    this.fb.control([])
                );
            }
            if (diffNewRoles < 0) {
                this.form.removeControl(
                    `unavailablePart_${index}_${
                        this.rolesByDates[index] - 1 - index2
                    }`
                );
            }
        });
    }

    /**TODO */
    onValidateAvailabilityForm() {
        const inputProgramGenerator : InputProgramGenerator = this.getAllAvailabilityFormInputs()
        this.inputProgramService.saveInputProgram(inputProgramGenerator);
        this.router.navigate(['program-generator/generator']);
    }

    getAllAvailabilityFormInputs() : InputProgramGenerator {
        let unavailabilityList: string[][][] = [];
        let unavailableRole: string[][];
        let pgmDatesList: Date[] = [];
        this.programDates.forEach((date, i) => {
            pgmDatesList.push(this.form.get(`pgmDate_${i}`)?.value);
            unavailableRole = [];
            this.unavailableParticipantsArray[i].forEach((un, i2) => {
                unavailableRole.push(
                    this.form.get(`unavailablePart_${i}_${i2}`)?.value
                );
            });
            unavailabilityList.push(unavailableRole);
        });
        return {
            participants: this.participants,
            pgmDates: pgmDatesList,
            roles: this.rolesByDates,
            unavailabilitiy: unavailabilityList,
        };
    }
}
