import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'programGenerator',
  },
  {
    path: 'programGenerator',
    loadChildren:
      './program-generator/program-generator.module#ProgramGeneratorModule',
  },
];
