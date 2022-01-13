import { Component, OnInit } from '@angular/core';
import { InputProgramService } from '../input-program/input-program.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.sass']
})
export class GeneratorComponent implements OnInit {

  programGenerated : any
  constructor(private inputProgramService: InputProgramService) { }

  ngOnInit(): void {
  }

}
