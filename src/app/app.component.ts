import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'sono-program-generator';
    links = [
        { value: 'program-generator/inputProgram', label: 'Formulaire' },
        { value: 'program-generator/generator', label: 'Générateur' },
    ];
    activeLink = this.links[0];
}
