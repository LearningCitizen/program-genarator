import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import * as moment from 'moment';
import { LOCALE_FR } from './app-constantes';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';

// Passage de MomenJs en date francaises
moment.locale('fr');

// date française utilisant la locale
registerLocaleData(localeFr, 'fr');
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        CoreModule,
        BrowserAnimationsModule,
        CommonModule,
        MatTabsModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: LOCALE_FR }, DatePipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
