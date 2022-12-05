import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { environment } from "src/environments/environment";
import { headerService } from "../header/header.service";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    userData: any;

    baseUrl: string = environment.baseUrl + 'user/';

    constructor(
        private http: HttpClient,
        private headerService: headerService,
        private toster: HotToastService,
        private router: Router
    ) { }

    login = (loginData: any) => {
        return this.http.post(this.baseUrl + 'login', loginData).pipe(
            this.toster.observe({
                success: 'Login Successfull',
                loading: 'Logging In...',
                error: ({ error }) => `${error.Message || 'Something went wrong'}`
            })
        )
    }

    signUp = (signupData: any) => {
        return this.http.post(this.baseUrl + 'signUp', signupData).pipe(
            this.toster.observe({
                success: 'Sign Up Successfull',
                loading: 'Signing In...',
                error: ({ error }) => `${error.Message || 'Something went wrong'}`
            })
        )
    }

    logOut = () => {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/auth']);
    }

    getUserById = () => {
        const httpOptions = this.headerService.updateHeader();
        return this.http.get(this.baseUrl + 'getById', httpOptions).pipe(
            this.toster.observe({
                success: 'Profile loaded successfully',
                loading: 'Loading Profile...',
                error: ({ error }) => `${error.Message || 'Something went wrong'}`
            })
        )
    }

    updateUser = (userData: any) => {
        const httpOptions = this.headerService.updateHeader();
        return this.http.post(this.baseUrl + 'update', userData, httpOptions).pipe(
            this.toster.observe({
                success: 'Profile Updated Successfully',
                loading: 'Updating Profile...',
                error: ({ error }) => `${error.Message || 'Something went wrong'}`
            })
        )
    }
}