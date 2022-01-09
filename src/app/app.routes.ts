import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sono-program-genarator',
  },
  {
    path: 'sono-program-genarator',
    loadChildren: () => import('./program-generator/program-generator.module').then(m => m.ProgramGeneratorModule),
  },
  { path: '**', redirectTo: 'sono-program-genarator', pathMatch: 'full' }
];
