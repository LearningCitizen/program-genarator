import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
    title = 'sono-program-generator';
    links = [
        { value: 'program-generator/inputProgram', label: 'Formulaire' },
        { value: 'program-generator/generator', label: 'Générateur' },
    ];
    activeLink = this.links[0];

    constructor() {}

    ngOnInit(): void {}
}
