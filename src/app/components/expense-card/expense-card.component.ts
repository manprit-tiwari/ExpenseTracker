import { Component, Input, OnInit } from "@angular/core";
import { ExpenseService } from "src/app/services/expense/expense.service";

@Component({
    selector: 'app-expense-card',
    templateUrl: './expense-card.component.html',
    styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

    date!: Date;
    month!: string;
    year!: number;
    day!: string;
    amount!: any;

    @Input() expense!: any;
    ngOnInit(): void {
        console.log('alsd', this.expense)
        this.date = new Date(this.expense.date);
        this.month = this.date.toLocaleString('en-IN', { month: 'long' });
        this.year = this.date.getFullYear();
        this.day = this.date.toLocaleString('en-IN', { day: '2-digit' });
        this.amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(this.expense.amount);
    }
    // date: Date = new Date(this.expense.date) || new Date();
    // month: string = this.date.toLocaleString('en-IN', { month: 'long' });
    // year: number = this.date.getFullYear();
    // day: string = this.date.toLocaleString('en-IN', { day: '2-digit' });
    // amount: any = new Intl.NumberFormat('en-IN', { currency: 'INR' }).format(this.expense.amount)

}