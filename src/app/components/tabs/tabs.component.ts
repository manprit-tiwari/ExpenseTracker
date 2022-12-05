import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges {

    @Output() tab: EventEmitter<string> = new EventEmitter();
    @Input() swipeData!: string;


    filterForm = new FormGroup({
        'filter': new FormControl('all', Validators.required)
    })

    ngOnInit(): void {
        this.tab.emit('all');
        this.watchFormTabChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.filterForm.patchValue({
            filter: this.swipeData
        });
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