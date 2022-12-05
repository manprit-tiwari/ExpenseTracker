import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HotToastService } from "@ngneat/hot-toast";
import { headerService } from "../header/header.service";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {

    private baseUrl: string = environment.baseUrl + 'expense/';

    private subject = new Subject<any>();

    filterData: any;

    Expenses: any[] = [
        // {
        //     id: '1',
        //     type: 'income',
        //     title: 'Book',
        //     amount: 20.99,
        //     date: new Date(2022, 10, 27).toISOString(),
        //     method: 'UPI'
        // },
        // {
        //     id: '2',
        //     type: 'expense',
        //     title: 'Television',
        //     amount: 200.75,
        //     date: new Date(2022, 10, 27).toISOString(),
        //     method: 'UPI'
        // },
        // {
        //     id: '3',
        //     type: 'expense',
        //     title: 'lorem alsfasldfa alsdfwf lasdjf saldjflas alsdfla asdk',
        //     amount: 200.75,
        //     date: new Date(2022, 10, 27).toISOString(),
        //     method: 'UPI'
        // },
        // {
        //     id: '4',
        //     type: 'expense',
        //     title: 'lorem alsfasldfa alsdfwf lasdjf saldjflas alsdfla asdk',
        //     amount: 200.75,
        //     date: new Date(2022, 10, 27).toISOString(),
        //     method: 'UPI',
        //     extraComment: 'This is my First Expense And I am very happy about it'
        // },
        // {
        //     id: '4',
        //     type: 'expense',
        //     title: 'Gas Cyclinder',
        //     amount: 200.75,
        //     date: new Date(2022, 10, 27).toISOString(),
        //     method: 'UPI',
        //     extraComment: 'This is my First Expense And I am very happy about it.alsdflasdf lasdfols dfasdfla asldfalsf asldfalsdf ljasldflas lasflasjdf lasdflasdfj lasdfla sdlflasdlfasldf lasd flasdlfsl asdflasdflasflaf;asfas falslasdlfjsldkfa sdlfasldfjals lasldfflasdjfl asdflaskdflsadf alsdflasdjflaskfllasd falsdflasdfjla alsdfalsdflsadfjl Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores debitis dolor consectetur maxime sint sunt libero distinctio voluptatem, et, harum molestias! Molestiae, molestias.Omnis veniam repellat excepturi nihil harum veritatis debitis, nam laudantium quod ipsa molestias nemo nobis voluptatibus libero officiis quia, magnam minus! Enim dolore autem dolorum eaque exercitationem.'
        // }
    ]

    constructor(
        private http: HttpClient,
        private toster: HotToastService,
        private headerService: headerService
    ) { }
    
    addExpense = (expenseData: any) => {
        const httpOptions = this.headerService.updateHeader();
        return this.http.post(this.baseUrl + 'create', expenseData, httpOptions).pipe(
            this.toster.observe({
                success: 'Expense added successfully',
                loading: 'Adding Expense...',
                error: ({ error }) => `${error.Message || 'Something went wrong'}`
            })
        );
    }

    getAllExpense = () => {
        const httpOptions = this.headerService.updateHeader();
        return this.http.get(this.baseUrl + 'getAll', httpOptions).pipe(
            this.toster.observe({
                success: 'Expenses Loaded Successfully',
                loading: 'Loading all expenses...',
                error: ({ error }) => `${error.Message || 'Something went wrong'}`
            })
        );
    }

    deleteExpense = (id: string) => {
        const httpOptions = this.headerService.updateHeader();
        return this.http.delete(this.baseUrl + 'delete/' + id, httpOptions).pipe(
            this.toster.observe({
                success: 'Expense deleted successfully',
                loading: 'Deleting expense...',
                error: ({ error }) => `${error.Message || 'Something went wrong'}`
            })
        )
    }

    filterNext = (data?: any) => {
        this.subject.next(data);
    }

    filterSubject = (): Observable<any> => {
        return this.subject.asObservable();
    }
}