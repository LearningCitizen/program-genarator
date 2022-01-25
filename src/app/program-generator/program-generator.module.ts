import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
    MatMomentDateModule,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { INPUT_DATE_FORMATS } from './input-program/input-program-constantes';
import { InputProgramComponent } from './input-program/input-program.component';
import { ProgramGeneratorRoutes } from './program-generator.routes';

@NgModule({
    declarations: [InputProgramComponent, GeneratorComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ProgramGeneratorRoutes),
        MatDatepickerModule,
        MatFormFieldModule,
        MatMomentDateModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatTableModule,
        MatListModule,
        MatCardModule,
    ],
    providers: [
        FormBuilder,
        { provide: MAT_DATE_FORMATS, useValue: INPUT_DATE_FORMATS },
        {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: {
                useUtc: true,
            },
        },
    ],
})
export class ProgramGeneratorModule {}
