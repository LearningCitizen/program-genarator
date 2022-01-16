import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'program-generator',
    },
    {
        path: 'program-generator',
        loadChildren: () =>
            import('./program-generator/program-generator.module').then(
                (m) => m.ProgramGeneratorModule
            ),
    },
    { path: '**', redirectTo: 'program-generator', pathMatch: 'full' },
];
