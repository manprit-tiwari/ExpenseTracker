import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExpenseService } from "src/app/services/expense.service";

@Component({
    selector: 'app-expense-detail',
    templateUrl: './expense-detail.component.html',
    styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {

    @Input() Id!: string;
    @Output() close: EventEmitter<any> = new EventEmitter();

    type!: string;
    title!: string;
    date!: Date;
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
            if (element.id === expenseId) {
                this.type = element.type;
                this.title = element.title;
                this.amount = element.amount;
                this.date = new Date(element.date);
                this.method = element.method;
                this.extraComment = element.extraComment || null;
            }
        })
    }

}