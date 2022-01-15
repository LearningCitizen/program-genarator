import { Component, OnInit } from '@angular/core';
import { InputProgramGenerator } from '../input-program/input-program-constantes';
import { InputProgramService } from '../input-program/input-program.service';
import {
    DATE_COLUMN,
    PARTICIPANTS_UNAVAILABLE,
    ROLE_COLUMN,
} from './generator-constantes';

type ProgramAssignment = {
    date: Date;
    roles: string[];
};

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.sass'],
})
export class GeneratorComponent implements OnInit {
    programGenerated: ProgramAssignment[] = [];
    inputProgram: InputProgramGenerator | undefined = undefined;
    participantsCounter: Map<string, number> = new Map<string, number>();
    columnsToDisplay = [DATE_COLUMN, ROLE_COLUMN];

    constructor(private inputProgramService: InputProgramService) {}

    ngOnInit(): void {
        this.inputProgramService.inputProgramGenerator$.subscribe((input) => {
            this.inputProgram = input;
            this.generateProgram();
        });
    }

    generateProgram() {
        this.initParticipantsCounter();
        let rolesForCurrentDate: string[];
        let participantForCurrentDate: string[];
        this.inputProgram?.pgmDates.forEach((pgmDate, i) => {
            rolesForCurrentDate = [];
            participantForCurrentDate = [];
            Array.from({ length: this.inputProgram?.roles[i] ?? 0 }).forEach(
                (_, i2) => {
                    rolesForCurrentDate.push(`Rôle ${i2 + 1}`);
                    participantForCurrentDate.push(this.getParticipantWithMinimumAssignments(i, i2))
                }
            );
            this.programGenerated.push({
                date: pgmDate,
                roles: rolesForCurrentDate,
            });
        });
    }

    initParticipantsCounter() {
        this.inputProgram?.participants.forEach((par) =>
            this.participantsCounter.set(par, 0)
        );
    }

    getParticipantWithMinimumAssignments(
        index: number,
        index2: number
    ): string {
        let minParticipant = PARTICIPANTS_UNAVAILABLE;
        if (this.inputProgram) {
            let minAssignments = Number.MAX_VALUE;
            let parAssignments: number;
            let participantsAvailable = this.getAvailableParticipants(
                this.inputProgram.unavailabilitiy[index][index2]
            );
            /* Looking for participants available with min assignments */
            participantsAvailable.forEach((parAvail) => {
                parAssignments =
                    this.participantsCounter.get(parAvail) ?? Number.MAX_VALUE;
                if (parAssignments < minAssignments) {
                    minParticipant = parAvail;
                    minAssignments = parAssignments;
                }
            });
            if (minParticipant !== PARTICIPANTS_UNAVAILABLE) {
                const nbAssignments =
                    this.participantsCounter.get(minParticipant) ?? 0;
                this.participantsCounter.set(minParticipant, nbAssignments + 1);
            }
            this.inputProgram?.unavailabilitiy[index][index2];
        }
        return minParticipant;
    }

    getAvailableParticipants(unavailableParticipants: string[]): string[] {
        return this.inputProgram?.participants
            ? this.inputProgram?.participants.filter(
                  (par) => !unavailableParticipants.includes(par)
              )
            : [];
    }
}
