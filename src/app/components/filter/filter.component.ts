import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ExpenseService } from "src/app/services/expense/expense.service";

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    @Output() filterData: EventEmitter<any> = new EventEmitter();

    years: any[] = [];
    months: any[] = [];
    dates: any[] = [];

    filterForm = new FormGroup({
        'year': new FormControl(null),
        'month': new FormControl(null),
        'date': new FormControl(null)
    });
    
    constructor(
        private dialogRef: MatDialogRef<FilterComponent>,
        private expenseService: ExpenseService
    ) { }
    ngOnInit(): void {
        this.getFilterData();
        if (this.expenseService.filterData) {
            this.filterForm.patchValue(this.expenseService.filterData);
        }
    }

    getFilterData = () => {
        let tempYear: Set<number> = new Set();
        let tempMonth: Set<string> = new Set();
        
            let tempDate: Set<string> = new Set();
        this.expenseService.Expenses.forEach((element: any) => {
            tempYear.add(new Date(element.date).getFullYear());
            tempMonth.add(new Date(element.date).toLocaleDateString('en-IN', { month: 'long' }));
            tempDate.add(new Date(element.date).toLocaleString('en-IN', { day: '2-digit' }));
        })

        this.years = [...tempYear].sort((year1: number, year2: number) => year2 - year1);
        this.months = [...tempMonth].sort((month1: string, month2: string) => {
            return new Date(`${month1} 01, 2021`).getMonth() - new Date(`${month2} 01, 2021`).getMonth()
        });
        this.dates = [...tempDate].sort((date1: string, date2:string) => Number(date1) - Number(date2));
    }

    onSubmit = () => {
        console.log(this.filterForm.value);
        // return;
        let filter: any = {};
        for (let key in this.filterForm.value) {
            if (this.filterForm.get(key)?.value) {
                filter[key] = this.filterForm.get(key)?.value;
            }
        }
        // console.log('filter::', filter);
        this.expenseService.filterData = filter;
        this.expenseService.filterNext(filter);
        this.dialogRef.close();
    }

    clearFilter = () => {
        this.filterForm.reset();
        this.onSubmit();
    }

    
}