import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask'

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    NgxUpperCaseDirectiveModule,
    NgxMaskModule.forRoot()

  ],
  exports:[
    
    NgxUpperCaseDirectiveModule,
    NgSelectModule,
    NgxMaskModule
 
  ]
})
export class SharedModule { }
