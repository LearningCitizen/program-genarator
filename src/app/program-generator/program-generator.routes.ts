import { Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { InputProgramComponent } from './input-program/input-program.component';

export const ProgramGeneratorRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inputProgram',
  },
  {
    path: 'inputProgram',
    component: InputProgramComponent,
  },
  {
    path: 'generator',
    component: GeneratorComponent,
  },
];
