import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    @Output() tab: EventEmitter<string> = new EventEmitter();


    filterForm = new FormGroup({
        'filter': new FormControl('all', Validators.required)
    })

    ngOnInit(): void {
        this.tab.emit('all');
        this.watchFormTabChanges();
    }

    get filter() {
        return this.filterForm.get('filter');
    }

    watchFormTabChanges = () => {
        this.filter?.valueChanges.subscribe((changedValue) => {
            this.tab.emit((this.filter?.value as string));
        })
    }

}