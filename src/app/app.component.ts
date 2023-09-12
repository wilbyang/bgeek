import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, of} from 'rxjs';
import {Article, Column} from "./models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bgeek';

  //load columns with http request
  constructor(private http: HttpClient) {
  }


}

