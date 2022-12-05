import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpenseService } from '../../services/expense/expense.service';
import { FilterComponent } from "../filter/filter.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    expenses!: any[];
    showExpenseDetail: boolean = false;
    showExpenseDetailOfId!: string;
    filterApplied: boolean = false;
    appliedFilterData: any = { year: '', month: '', date: '' };
    activeTab: string = 'all';
    touchStart: number = 0;
    touchEnd: number = 0;
    swipeData: string = 'all';
    tabsArray: string[] = ['expense', 'all', 'income'];
    tabsIndex: number = 1;




    constructor(
        // private matDialogRef: MatDialogRef<FilterComponent>,
        private expenseService: ExpenseService
    ) { }

    ngOnInit(): void {
        console.log(this.expenseService.Expenses)
        this.getAllExpenseData();
        this.watchForFilterDialog();
        this.watchForSwipe();
    }

    tabChangeHandler = (event?: string) => {
        if (event) this.activeTab = event;
        else event = this.activeTab;
        this.tabsIndex = this.tabsArray.findIndex((element) => element === event);
        this.expenses = [];
        if (['expense', 'income'].includes(event)) {
            let temp: any[] = [];
            this.expenseService.Expenses.forEach((element) => {
                if (element.type === event) {
                    temp = [...temp, element];
                }
            })
            // console.log('asldfas', temp);
            if (this.filterApplied) {
                temp = [...this.filterData(this.appliedFilterData, [...temp])];
            }
            this.expenses = [...temp].sort((element1: any, element2: any) => {
                return new Date(element1.date).getTime() - new Date(element2.date).getTime();
            });
        }
        else {
            let temp = [...this.expenseService.Expenses];
            if (this.filterApplied) {
                temp = [...this.filterData(this.appliedFilterData, [...temp])];
            }
            this.expenses = [...temp].sort((element1: any, element2: any) => {
                return new Date(element1.date).getTime() - new Date(element2.date).getTime();
            });
        }
        this.expenses.reverse();
    }

    watchForFilterDialog = () => {
        this.expenseService.filterSubject().subscribe({
            next: (data: any) => {
                console.log('After data received::', data);
                if (Object.keys(data).length > 0) {
                    console.log('if data availabel::', data);
                    this.appliedFilterData = data;
                    this.filterApplied = true;
                }
                else {
                    console.log('data not available::', data);
                    this.filterApplied = false;
                }
                this.tabChangeHandler()
                // this.filterData(data);
            }
        })
    }

    filterData = (filter: any, data: any[]) => {
        let temp: any[] = [];
        console.log(filter);
        data.forEach((element) => {
            //year
            if (!filter.month && !filter.date && filter.year) {
                if (filter.year === new Date(element.date).getFullYear()) {
                    temp = [...temp, element];
                }
            }
            //month
            else if (!filter.year && !filter.date && filter.month) {
                if (filter.month === new Date(element.date).toLocaleString('en-IN', { month: 'long' })) {
                    temp = [...temp, element];
                }
            }
            //date
            else if (!filter.year && !filter.month && filter.date) {
                if (filter.date === new Date(element.date).toLocaleString('en-IN', { day: '2-digit' })) {
                    temp = [...temp, element];
                }
            }
            // year Month
            else if (!filter.date && filter.year && filter.month) {
                if (filter.year === new Date(element.date).getFullYear() && filter.month === new Date(element.date).toLocaleString('en-IN', { month: 'long' })) {
                    temp = [...temp, element];
                }
            }
            // year date
            else if (!filter.month && filter.year && filter.date) {
                if (filter.year === new Date(element.date).getFullYear() && filter.date === new Date(element.date).toLocaleString('en-IN', { day: '2-digit' })) {
                    temp = [...temp, element];
                }
            }
            // Month date
            else if (!filter.year && filter.month && filter.date) {
                if (filter.month === new Date(element.date).toLocaleString('en-IN', { month: 'long' }) && filter.date === new Date(element.date).toLocaleString('en-IN', { day: '2-digit' })) {
                    temp = [...temp, element];
                }
            }// Year month date
            else if (filter.year && filter.month && filter.date) {
                if (filter.year === new Date(element.date).getFullYear() && filter.month === new Date(element.date).toLocaleString('en-IN', { month: 'long' }) && filter.date === new Date(element.date).toLocaleString('en-IN', { day: '2-digit' })) {
                    temp = [...temp, element];
                }
            }




        })
        // this.expenses = [];
        // this.expenses = [...temp];
        return temp
        // console.log(this.expenses);
    }



    private getAllExpenseData = () => {
        if (this.expenseService.Expenses.length > 0) {
            // let temp = [];
            this.expenses = this.expenseService.Expenses.sort((element1: any, element2: any) => {
                return new Date(element1.date).getTime() - new Date(element2.date).getTime();
            })
            // this.expenses = [...this.expenseService.Expenses].reverse();
        }
        else {
            this.expenseService.getAllExpense().subscribe({
                next: async (result: any) => {
                    // result = [...result].reverse();

                    this.expenses = await result.sort((element1: any, element2: any) => {
                        return new Date(element1.date).getTime() - new Date(element2.date).getTime();
                    });

                    
                    this.expenseService.Expenses = [...this.expenses];
                    this.expenses = [...this.expenses].reverse();
                }
            })
        }
        // this.tabChangeHandler();
        // console.log(this.expenses);
    }

    showExpenseDetailHandler = (id: string) => {
        if (this.showExpenseDetail === true) {
            this.showExpenseDetail = false;
        }
        setTimeout(() => {
            this.showExpenseDetailOfId = id;
            this.showExpenseDetail = true;
        }, 100)

    }



    closeExpenseDetail = () => {
        this.showExpenseDetail = false;
    }

    watchForSwipe = () => {
        addEventListener('touchstart', (touchStartEvent: any) => {
            this.touchStart = touchStartEvent.changedTouches[0].clientX;
        }, false);
        addEventListener('touchend', (touchEndEvent: any) => {
            this.checkIfSwipeIsLeftOfRight(this.touchStart, touchEndEvent.changedTouches[0].clientX);
        }, false)

        




    }

    private checkIfSwipeIsLeftOfRight = (event1: any, event2: any) => {
        let difference = Math.abs(event1 - event2);
        if (!this.showExpenseDetail) {
            if (difference > 100) {
                if (event1 < event2) {
                    if (this.tabsIndex > 0) this.tabsIndex = this.tabsIndex - 1;
                    this.swipeData = this.tabsArray[this.tabsIndex];
                };
                if (event1 > event2) {
                    if (this.tabsIndex < 2) this.tabsIndex = this.tabsIndex + 1;
                    this.swipeData = this.tabsArray[this.tabsIndex];
                };
            }
        }
    }

    expenseDeleteHandler = () => {
        this.getAllExpenseData();
        this.closeExpenseDetail();
    }
}