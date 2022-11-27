import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {

    Expenses: any[] = [
        {
            id: '1',
            type: 'income',
            title: 'Book',
            amount: 20.99,
            date: new Date(2022, 10, 27).toISOString(),
            method: 'UPI'
        },
        {
            id: '2',
            type: 'expense',
            title: 'Television',
            amount: 200.75,
            date: new Date(2022, 10, 27).toISOString(),
            method: 'UPI'
        },
        {
            id: '3',
            type: 'expense',
            title: 'lorem alsfasldfa alsdfwf lasdjf saldjflas alsdfla asdk',
            amount: 200.75,
            date: new Date(2022, 10, 27).toISOString(),
            method: 'UPI'
        }
    ]
}