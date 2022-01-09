import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'program-genarator',
  },
  {
    path: 'program-genarator',
    loadChildren: () => import('./program-generator/program-generator.module').then(m => m.ProgramGeneratorModule),
  },
  { path: '**', redirectTo: 'program-genarator', pathMatch: 'full' }
];
