import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabUtentiComponent } from './tab-utenti/tab-utenti.component';
import {FormsModule} from '@angular/forms'; //databinding a due vie
import {HttpClientModule} from '@angular/common/http';
import { TabCredenzialiComponent } from './tab-credenziali/tab-credenziali.component'; //per usare i service con nodejs
@NgModule({
  declarations: [
    AppComponent,
    TabUtentiComponent,
    TabCredenzialiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //databinding a 2 vie.
    HttpClientModule //per usare i service e fare le chiamate a node.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
