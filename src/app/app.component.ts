import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ExpenseTracker';

  private history: string[] = [];

  constructor(private location: Location, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    })
  }

  ngOnInit(): void {
    App.addListener('backButton', this.back)
  }

  back = (): void => {
    this.history.pop();
    if (['home','auth'].includes(this.router.url.split('/')[1])) {
      App.exitApp();
    }
    else {
      this.location.back();
    }
  }

}
