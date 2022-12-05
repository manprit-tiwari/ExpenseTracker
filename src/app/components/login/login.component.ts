import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    showPassword: boolean = false;

    loginForm = new FormGroup({
        'userName': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required)
    })

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    onSubmit = () => {
        if (this.loginForm.invalid) {
            return;
        }
        this.userService.login(this.loginForm.value).subscribe({
            next: (result: any) => {
                localStorage.setItem('auth_token', result.auth_token);
                this.router.navigate(['/']);
            }
        })
    }
}