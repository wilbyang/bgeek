import {Component, OnInit} from '@angular/core';
import {GeekService} from "../geek.service";
import {Column, JuejinArticle, JuejinColumn} from "../models";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-juejie-column',
  templateUrl: './juejie-column.component.html',
  styleUrls: ['./juejie-column.component.css']
})
export class JuejieColumnComponent implements OnInit {
  juejinColumns: JuejinColumn[] | undefined;
  juejinArticles: JuejinArticle[] | undefined;
  juejinArticle: JuejinArticle | undefined;
  constructor(private service: GeekService, private router: Router) {
    this.service.$juejinColumns.subscribe({
      next: result => {
        this.juejinColumns = result;
      }
    });
    this.service.$juejinArticles.subscribe({
      next: result => {
        this.juejinArticles = result;
      }
    });
  }

  ngOnInit(): void {
    this.service.fetchJuejinColumns();
  }

  chooseColumn(id: string) {
    this.service.fetchJuejinArticles(id);
  }

  chooseJuejinArticle(article: JuejinArticle) {
    const navigationExtras: NavigationExtras = {
      state: {
        article
      }
    };
    this.router.navigateByUrl('juejin/article', navigationExtras);
  }
}
