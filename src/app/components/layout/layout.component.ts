import { animate, group, query, style, transition, trigger } from "@angular/animations";
import { Component, DoCheck } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { FilterComponent } from "../filter/filter.component";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements DoCheck{
    moreMenuOpen: boolean = false;

    displayNone: boolean = false;
    filterData: any = { year: '', month: '', date: '' };

    getState = (outlet: any) => {
        return outlet.activatedRouteData.state;
    }

    constructor(
        private router: Router,
        private matDialog: MatDialog
    ) { }
    
    ngDoCheck(): void {
        const Url = this.router.url.trim().split('/')[1];
        if (Url === 'home') {
            this.displayNone = true;
        }
        else {
            this.displayNone = false;
        }
    }

    openFilter = () => {

        const dialogRef = this.matDialog.open(FilterComponent, {
            data: this.filterData
        });
        this.moreMenuOpen = false;


    }



}