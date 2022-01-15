import { Component, OnInit } from '@angular/core';
import { InputProgramGenerator } from '../input-program/input-program-constantes';
import { InputProgramService } from '../input-program/input-program.service';

type ProgramAssignment = {
    date: Date;
    roles: string[]
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
    columnsToDisplay = ['date', 'role'];

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
        this.inputProgram?.pgmDates.forEach((pgmDate, i) => {
            rolesForCurrentDate = [];
            Array.from({ length: this.inputProgram?.roles[i] ?? 0 }).forEach(
                (_, i2) => {rolesForCurrentDate.push(`Rôle ${i2+1}`)}
            );
            this.programGenerated.push({ date: pgmDate, roles: rolesForCurrentDate });
        });
    }

    initParticipantsCounter() {
        this.inputProgram?.participants.forEach((par) =>
            this.participantsCounter.set(par, 0)
        );
    }
}
