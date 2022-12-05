import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExpenseService } from "src/app/services/expense/expense.service";

@Component({
    selector: 'app-expense-detail',
    templateUrl: './expense-detail.component.html',
    styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {

    @Input() Id!: string;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<string> = new EventEmitter();

    type!: string;
    title!: string;
    date!: string;
    amount!: string;
    extraComment!: string;
    method!: string;

    constructor(
        private route: ActivatedRoute,
        private expenseService: ExpenseService
    ) { }

    ngOnInit(): void {
        this.getExpenseDataById(this.Id);
    }

    closeDrawer = () => {
        this.close.emit();
    }

    private getExpenseDataById = (expenseId: string) => {
        this.expenseService.Expenses.forEach((element) => {
            if (element._id === expenseId) {
                this.type = element.type;
                this.title = element.title;
                this.amount = Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(element.amount);
                this.date = new Date(element.date).toLocaleDateString('en-IN',{day: '2-digit',month: 'long', year: 'numeric'});
                this.method = element.method;
                this.extraComment = element.extraComment || null;
            }
        })
    }

    deleteExpense = () => {
        this.expenseService.deleteExpense(this.Id).subscribe({
            next: (result: any) => {
                const index = this.expenseService.Expenses.findIndex((element) => element._id === this.Id);
                this.expenseService.Expenses.splice(index, 1);
                this.delete.emit();
            }
        })
    }

}