import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, forkJoin, of} from 'rxjs';
import {Article, Column, JuejinArticle, JuejinColumn} from './models';

@Injectable({
  providedIn: 'root'
})
export class GeekService {

  $columns: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  // observable of articles
  $articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  $juejinArticles: BehaviorSubject<JuejinArticle[]> = new BehaviorSubject<JuejinArticle[]>([]);
  $juejinColumns: BehaviorSubject<JuejinColumn[]> = new BehaviorSubject<JuejinColumn[]>([]);




  //load columns with http request
  constructor(private http: HttpClient) {
    // this.completeStatus();
  }
  completeStatus() {
    this.http.get<Column[]>('http://localhost:8800/geekbang/columns2').subscribe(result => {
      // sort by cid
      // loop through columns and load articles
      let cids = new Set<number>();
      let voids = result.map(column => {
        return this.http.get<Article[]>(`http://localhost:8800/geekbang/${column.cid}/articles`).pipe(
          catchError(error => {
              console.error(error);
              return of([]);
            }
          ));

      });
      forkJoin(voids).subscribe(result => {
        //loop articles
        // a set to store the cids

        result.forEach(one => {
          one.forEach(article => {
            if (article.content.length < 6) {
              console.log(`${article.columnId}-${article.id}`);
              cids.add(article.columnId);
            }
          });
        });
        let arr = Array.from(cids);
        console.log(arr);
      });


    }, error => console.error(error));
  }
  fetchColumns() {
    this.http.get<Column[]>('http://localhost:8800/geekbang/columns2').subscribe({
      next: result => {
        this.$columns.next(result.sort((a, b) => a.cid - b.cid));
      }, error: error => console.error(error)
    });
  }
  fetchColumn(cid: Number) {
    this.http.get<Article[]>(`http://localhost:8800/geekbang/${cid}/articles`).subscribe({
      next: result => {
        this.$articles.next(result.sort((a, b) => a.id - b.id));
      }, error: error => console.error(error)
    });
  }
  fetchArticlesByTag(tag: string) {
    this.http.get<Article[]>(`http://localhost:8800/geekbang/tags/${tag}`).subscribe({
      next: result => {
        this.$articles.next(result.sort((a, b) => a.id - b.id));
      }, error: error => console.error(error)
    });
  }
  fetchJuejinColumns() {
    this.http.get<JuejinColumn[]>(`http://localhost:8800/juejin/columns`).subscribe({
      next: result => {
        this.$juejinColumns.next(result);
      }, error: error => console.error(error)
    });
  }
  fetchJuejinArticles(cid: string) {
    this.http.get<JuejinArticle[]>(`http://localhost:8800/juejin/columns/${cid}`).subscribe({
      next: result => {
        this.$juejinArticles.next(result.sort((a, b) => a.index - b.index));
      }, error: error => console.error(error)
    });
  }

}
