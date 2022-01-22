import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from "@angular/core";
import { A11yModule } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
    exports: [
        A11yModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        ScrollingModule,
        MatDatepickerModule
    ]
})
export class MaterialModule {
    
    constructor(){}

}