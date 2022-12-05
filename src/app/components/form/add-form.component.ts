import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ExpenseService } from "src/app/services/expense/expense.service";


@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {

    constructor(
        private router: Router,
        private expenseService: ExpenseService
    ) { }

    paymentMethod: string[] = ['Cash', 'Card', 'UPI', 'Bank Transfer']

    addForm = new FormGroup({
        'type': new FormControl('expense', Validators.required),
        'title': new FormControl('', Validators.required),
        'amount': new FormControl('', Validators.required),
        'date': new FormControl(new Date(), Validators.required),
        'method': new FormControl('UPI', Validators.required),
        'extraComment': new FormControl('')
    })

    onSubmit = () => {
        if (this.addForm.invalid) {
            console.log(this.addForm);
            console.log('asldfasdfalsdfas');
            return;
        }
        else {
            let expenseData = { ...this.addForm.value}
            this.expenseService.addExpense(expenseData).subscribe({
                next: (result: any) => {
                    this.expenseService.Expenses.push(result);
                    this.router.navigate(['/home'])
                }
            })
        }
    }
}