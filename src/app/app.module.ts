import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransportadorasComponent } from './transportadoras/transportadoras.component';
import { DataService } from './services/data.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveupdateComponent } from './saveupdate/saveupdate.component';

@NgModule({
  declarations: [
    AppComponent,
    TransportadorasComponent,
    SaveupdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpModule,
    BrowserModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
