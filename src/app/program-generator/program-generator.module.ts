import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { InputProgramComponent } from './input-program/input-program.component';
import { ProgramGeneratorRoutes } from './program-generator.routes';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';

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
        MatSelectModule,
        MatTableModule,
        MatListModule,
    ],
    providers: [FormBuilder],
})
export class ProgramGeneratorModule {}
