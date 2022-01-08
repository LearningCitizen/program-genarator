import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_LOCALE_FR } from './app-constantes';

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
  providers: [{provide: MAT_DATE_LOCALE, useValue: MAT_DATE_LOCALE_FR}],
  bootstrap: [AppComponent],
})
export class AppModule {}
