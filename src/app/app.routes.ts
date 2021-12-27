import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'programGenerator',
  },
  {
    path: 'programGenerator',
    loadChildren: () => import('./program-generator/program-generator.module').then(m => m.ProgramGeneratorModule)
  },
];
