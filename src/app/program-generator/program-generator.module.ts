import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputProgramComponent } from './input-program/input-program.component';
import { GeneratorComponent } from './generator/generator.component';
import { RouterModule } from '@angular/router';
import { ProgramGeneratorRoutes } from './program-generator.routes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [InputProgramComponent, GeneratorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProgramGeneratorRoutes),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
})
export class ProgramGeneratorModule {}
