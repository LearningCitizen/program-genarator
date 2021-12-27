import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputProgramComponent } from './src/app/program-generator/input-program/input-program.component';

@NgModule({
  declarations: [
    AppComponent,
    InputProgramComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
