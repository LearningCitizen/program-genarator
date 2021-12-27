import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputProgramComponent } from './input-program/input-program.component';
import { GeneratorComponent } from './generator/generator.component';
import { RouterModule } from '@angular/router';
import { ProgramGeneratorRoutes } from './program-generator.routes';



@NgModule({
  declarations: [
    InputProgramComponent,
    GeneratorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProgramGeneratorRoutes)
  ]
})
export class ProgramGeneratorModule { }
