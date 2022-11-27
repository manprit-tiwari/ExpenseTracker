import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from './components/form/add-form.component';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ExpenseTracker';

  expenses!: any[];

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
      this.expenses = [...temp];
    }
    else {
      this.expenses = [...this.expenseService.Expenses];
    }
  }

  openAddForm = () => {
    const AddFormDialog = this.dialog.open(AddFormComponent);
    this.moreMenuOpen = false;

    AddFormDialog.afterClosed().subscribe((result) => {
      console.log('Add Form Closed');
    })
  }

  private getAllExpenseData = () => {
    this.expenses = [...this.expenseService.Expenses];
    console.log(this.expenses);
  }
}
