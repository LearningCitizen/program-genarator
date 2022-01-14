import { Component, OnInit } from '@angular/core';
import { InputProgramGenerator } from '../input-program/input-program-constantes';
import { InputProgramService } from '../input-program/input-program.service';

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.sass'],
})
export class GeneratorComponent implements OnInit {
    programGenerated: any;
    inputProgram: InputProgramGenerator | undefined = undefined;
    participantsCounter: Map<string, number> = new Map<string, number>();

    constructor(private inputProgramService: InputProgramService) {}

    ngOnInit(): void {
        this.inputProgramService.inputProgramGenerator$.subscribe((input) => {
            this.inputProgram = input;
            this.generateProgram();
        });
    }

    generateProgram() {
        this.initParticipantsCounter();
    }

    initParticipantsCounter() {
        this.inputProgram?.participants.forEach((par) =>
            this.participantsCounter.set(par, 0)
        );
    }
}
