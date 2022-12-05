import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/material/app-material.module';
import { TabsComponent } from './components/tabs/tabs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './components/form/add-form.component';
import { ExpenseCardComponent } from './components/expense-card/expense-card.component';
import { HomeComponent } from './components/home/home.component';
import { ExpenseDetailComponent } from './components/expense-detail/expense-detail.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    AddFormComponent,
    ExpenseCardComponent,
    HomeComponent,
    ExpenseDetailComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    LayoutComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HotToastModule.forRoot({
      autoClose: true
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
