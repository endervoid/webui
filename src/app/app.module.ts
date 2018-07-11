import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GraphComponent } from './graph/graph.component';
import {NgCyto} from './ng-cyto/ng-cyto.directive';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { GraphControllComponent } from './graph-controll/graph-controll.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    NgCyto,
    HeroesComponent,
    GraphComponent,
    GraphControllComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
