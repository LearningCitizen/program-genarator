import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
