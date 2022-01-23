import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from "@angular/core";
import { A11yModule } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    exports: [
        A11yModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        ScrollingModule,
        MatDatepickerModule,
        MatButtonModule,
        MatChipsModule,
        MomentDateModule
    ]
})
export class MaterialModule {
    
    constructor(){}

}