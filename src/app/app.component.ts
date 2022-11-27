import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from './components/form/add-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ExpenseTracker';

  moreMenuOpen: boolean = false;

  constructor(private dialog: MatDialog) {

  }

  tabChangeHandler = (event: string) => {
    console.log(event);
  }

  openAddForm = () => {
    const AddFormDialog = this.dialog.open(AddFormComponent);
    this.moreMenuOpen = false;

    AddFormDialog.afterClosed().subscribe((result) => {
      console.log('Add Form Closed');
    })
  }
}
