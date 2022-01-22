import { Component, OnInit } from '@angular/core';
import { InputProgramGenerator } from '../input-program/input-program-constantes';
import { InputProgramService } from '../input-program/input-program.service';
import {
    ASSIGNMENTS_COLUMN,
    DATE_COLUMN,
    PARTICIPANTS_COLUMN,
    PARTICIPANTS_UNAVAILABLE,
    ROLES_COLUMN,
} from './generator-constantes';

type ProgramAssignment = {
    date: Date;
    roles: string[];
    participants: string[];
};
type StatisticAssignment = {
    participant: string;
    assignments: number;
};
@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements OnInit {
    programGenerated: ProgramAssignment[] = [];
    programStatistics: StatisticAssignment[] = [];
    inputProgram: InputProgramGenerator | undefined = undefined;
    participantsCounter: Map<string, number> = new Map<string, number>();
    columnsProgramsToDisplay = [DATE_COLUMN, ROLES_COLUMN, PARTICIPANTS_COLUMN];
    columnsStatisticsToDisplay = [PARTICIPANTS_COLUMN, ASSIGNMENTS_COLUMN];
    orderParAssignments: string[] = [];

    constructor(private inputProgramService: InputProgramService) {}

    ngOnInit(): void {
        this.inputProgramService.inputProgramGenerator$.subscribe((input) => {
            this.inputProgram = input;
            this.generateProgram();
            this.generateProgramStatistics();
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
                    participantForCurrentDate.push(
                        this.getParticipantWithMinimumAssignments(i, i2)
                    );
                }
            );
            this.programGenerated.push({
                date: pgmDate,
                roles: rolesForCurrentDate,
                participants: participantForCurrentDate,
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
                if (
                    parAssignments == minAssignments &&
                    this.orderParAssignments.lastIndexOf(parAvail) <
                        this.orderParAssignments.lastIndexOf(minParticipant)
                ) {
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
        if (minParticipant != PARTICIPANTS_UNAVAILABLE) {
            this.orderParAssignments.push(minParticipant);
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

    generateProgramStatistics() {
        this.inputProgram?.participants.forEach((par) =>
            this.programStatistics.push({
                participant: par,
                assignments: this.participantsCounter.get(par) ?? 0,
            })
        );
        this.programStatistics.sort((a, b) => {
            if (a.assignments == b.assignments) {
                return a.participant.localeCompare(b.participant);
            }
            return a.assignments > b.assignments ? -1 : 1;
        });
    }
}
