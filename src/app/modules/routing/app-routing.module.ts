import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { AddFormComponent } from 'src/app/components/form/add-form.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { AuthorizGuard as AuthGuard } from 'src/app/guard/authorized/authorized.guard';
import { UnauthorizedGuard as UnAuthGuard } from 'src/app/guard/unauthorized/unauthorized.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'add_form',
        component: AddFormComponent
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [UnAuthGuard],
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signUp',
        component: SignupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
