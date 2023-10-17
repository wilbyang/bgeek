import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, of} from 'rxjs';
import {Article, Column} from "./models";
import { newTracker, trackPageView } from "@snowplow/browser-tracker";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bgeek';
/*

  //load columns with http request
  constructor(private http: HttpClient) {
  }

  //init
  ngOnInit() {
    newTracker('sp1', 'localhost:8080', {
      appId: 'my-app-id',
      plugins: [ ],
    })
  }
  //after view init
  ngAfterViewInit() {
    trackPageView();
  }
*/


}

