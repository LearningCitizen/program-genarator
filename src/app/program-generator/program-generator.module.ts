import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { InputProgramComponent } from './input-program/input-program.component';
import { ProgramGeneratorRoutes } from './program-generator.routes';

@NgModule({
  declarations: [InputProgramComponent, GeneratorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProgramGeneratorRoutes),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder],
})
export class ProgramGeneratorModule {}
