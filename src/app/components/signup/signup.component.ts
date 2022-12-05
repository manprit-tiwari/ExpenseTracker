import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user/user.service";


@Component({
    selector: 'app-auth-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    
    passwordMatchValidator = (): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get('password')?.value;
            const confirmPassword = control.get('confirmPassword')?.value;
    
            if (password && confirmPassword && password !== confirmPassword) {
                return {
                    passwordsDontMatch: true
                }
            }
            return null;
        }
    }

    signUpForm = new FormGroup({
        'name': new FormControl('',Validators.required),
        'userName': new FormControl('',[Validators.required,Validators.email]),
        'password': new FormControl('',Validators.required),
        'confirmPassword': new FormControl('',Validators.required)
    },{validators: this.passwordMatchValidator()});



    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    onSubmit = () => {
        if (this.signUpForm.invalid) {
            return;
        }
        this.userService.signUp(this.signUpForm.value).subscribe({
            next: (result: any) => {
                localStorage.setItem('auth_token', result.Token);
                this.router.navigate(['/']);
            }
        })
    }
}