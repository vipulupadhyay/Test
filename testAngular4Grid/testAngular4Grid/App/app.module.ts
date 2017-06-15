import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular-2-data-table';

import { AppComponent } from './Grid/app.component';

@NgModule({
  declarations: [
      AppComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
      HttpModule,
      DataTableModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
