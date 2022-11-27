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
        },
        {
            id: '4',
            type: 'expense',
            title: 'lorem alsfasldfa alsdfwf lasdjf saldjflas alsdfla asdk',
            amount: 200.75,
            date: new Date(2022, 10, 27).toISOString(),
            method: 'UPI',
            extraComment: 'This is my First Expense And I am very happy about it'
        },
        {
            id: '4',
            type: 'expense',
            title: 'Gas Cyclinder',
            amount: 200.75,
            date: new Date(2022, 10, 27).toISOString(),
            method: 'UPI',
            extraComment: 'This is my First Expense And I am very happy about it.alsdflasdf lasdfols dfasdfla asldfalsf asldfalsdf ljasldflas lasflasjdf lasdflasdfj lasdfla sdlflasdlfasldf lasd flasdlfsl asdflasdflasflaf;asfas falslasdlfjsldkfa sdlfasldfjals lasldfflasdjfl asdflaskdflsadf alsdflasdjflaskfllasd falsdflasdfjla alsdfalsdflsadfjl Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores debitis dolor consectetur maxime sint sunt libero distinctio voluptatem, et, harum molestias! Molestiae, molestias.Omnis veniam repellat excepturi nihil harum veritatis debitis, nam laudantium quod ipsa molestias nemo nobis voluptatibus libero officiis quia, magnam minus! Enim dolore autem dolorum eaque exercitationem.'
        }
    ]
}