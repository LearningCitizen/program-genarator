import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'sono-program-generator';
  links = [{value: '/programGenerator/inputProgram', label: 'Formulaire'} ,{value: '/programGenerator/generator', label: 'Générateur'}]
  activeLink = this.links[0]
}
