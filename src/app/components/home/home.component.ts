import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from '../form/add-form.component';
import { ExpenseService } from '../../services/expense.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    expenses!: any[];
    showExpenseDetail: boolean = false;
    showExpenseDetailOfId!: string;
    moreMenuOpen: boolean = false;

    constructor(
        private dialog: MatDialog,
        private expenseService: ExpenseService
    ) { }

    ngOnInit(): void {
        console.log(this.expenseService.Expenses)
        this.getAllExpenseData();
    }

    tabChangeHandler = (event: string) => {
        this.expenses = [];
        if (['expense', 'income'].includes(event)) {
            let temp: any[] = [];
            this.expenseService.Expenses.forEach((element) => {
                if (element.type === event) {
                    temp = [...temp, element];
                }
            })
            console.log('asldfas', temp);
            this.expenses = [...temp].reverse();
        }
        else {
            this.expenses = [...this.expenseService.Expenses].reverse();
        }
    }

    openAddForm = () => {
        const AddFormDialog = this.dialog.open(AddFormComponent);
        this.moreMenuOpen = false;

        AddFormDialog.afterClosed().subscribe((result) => {
            this.getAllExpenseData();
        })
    }

    private getAllExpenseData = () => {
        this.expenses = [...this.expenseService.Expenses].reverse();
        console.log(this.expenses);
    }

    closeExpenseDetail = () => {
        this.showExpenseDetail = false;
    }
}