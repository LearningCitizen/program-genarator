import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  links = [{value: '/programGenerator/inputProgram', label: 'Formulaire'} ,{value: '/programGenerator/generator', label: 'Générateur'}]
  activeLink = this.links[0]

  constructor() { }

  ngOnInit(): void {
    
  }

}
