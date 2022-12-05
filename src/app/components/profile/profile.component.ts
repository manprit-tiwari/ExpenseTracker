import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    editMode: boolean = false;
    showPassword: boolean = false;

    profileForm = new FormGroup<any>({
        'name': new FormControl(''),
        'userName': new FormControl('')
    })

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.getProfileData();
    }

    getProfileData = () => {
        this.profileForm.disable();
        if (this.userService.userData) {
            this.profileForm.patchValue(this.userService.userData);
        }
        else {
            this.userService.getUserById().subscribe({
                next: (result: any) => {

                    this.profileForm.patchValue(result);
                    this.userService.userData = result;
                }
            })
        }
    }

    onSubmit = () => {
        this.userService.updateUser(this.profileForm.value).subscribe({
            next: (result: any) => {
                this.enableEditMode();
                this.userService.userData = this.profileForm.value;
            },
            error: (err: any) => {
                this.profileForm.patchValue(this.userService.userData);
                this.enableEditMode();
            }
        })
    }

    logOut = () => {
        this.userService.logOut()
    }

    enableEditMode = () => {
        if (!this.editMode) {
            this.profileForm.enable();
            this.profileForm.get('userName')?.disable();
            this.editMode = true;
        }
        else {
            this.profileForm.get('userName')?.enable();
            this.profileForm.disable();
            this.editMode = false;
            this.addPasswordField();

        }
    }

    addPasswordField = () => {
        if (this.profileForm.get('password')) {
            this.profileForm.removeControl('password');
        }
        else {
            this.profileForm.addControl('password', new FormControl('', Validators.required));
        }
    }


}