import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/material/app-material.module';
import { TabsComponent } from './components/tabs/tabs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './components/form/add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    AddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
