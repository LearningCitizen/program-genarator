import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [HeaderComponent, ContentComponent],
    imports: [CommonModule, MatToolbarModule, RouterModule, MatTabsModule],
    exports: [HeaderComponent, ContentComponent],
})
export class CoreModule {}
