import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,

    NgxUpperCaseDirectiveModule,


  ],
  exports:[
    HeaderComponent,

    NgxUpperCaseDirectiveModule,
    NgSelectModule,
 
  ]
})
export class SharedModule { }
