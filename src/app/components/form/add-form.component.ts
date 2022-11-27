import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {

    constructor(
        private dialogRef: MatDialogRef<AddFormComponent>
    ) { }

    paymentMethod: string[] = ['Cash', 'Card', 'UPI', 'Bank Transfer']

    addForm = new FormGroup({
        'type': new FormControl('expense'),
        'title': new FormControl(''),
        'ammount': new FormControl(''),
        'date': new FormControl(new Date()),
        'method': new FormControl('UPI')
    })

    onSubmit = () => {
        this.dialogRef.close();
    }
}