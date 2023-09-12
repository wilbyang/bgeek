import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeekService } from '../geek.service';
import { Router } from '@angular/router';
import { Article, Column } from '../models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  //columns
  columns: Column[] | undefined;

  // observable of articles
  articles: Article[] | undefined;




  //load columns with http request
  constructor(private geekService: GeekService, private router: Router) {
    this.geekService.$columns.subscribe({
      next: result => {
        this.columns = result;
        // sort by cid
      }, error: error => console.error(error)
    });
    this.geekService.$articles.subscribe({
      next: result => {
        this.articles = result;


      }, error: error => console.error(error)
    });
  }
  ngOnInit(): void {
    this.geekService.fetchColumns();
  }

  chooseColumn(column: Number) {

    this.geekService.fetchColumn(column);
  }
}

