import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputProgramComponent } from './input-program/input-program.component';
import { GeneratorComponent } from './generator/generator.component';



@NgModule({
  declarations: [
    InputProgramComponent,
    GeneratorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProgramGeneratorModule { }
