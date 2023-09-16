import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, filter, of, switchMap} from "rxjs";

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  constructor(private httpClient: HttpClient) {
  }
  tweets: Tweet[] = [];
  keyword = new FormControl('');
  ngOnInit() {
    this.keyword.valueChanges.pipe(
      debounceTime(500),
      filter(keyword => keyword!.length > 3),
      distinctUntilChanged(),
      switchMap(keyword =>
        this.httpClient.get<Tweet[]>(`http://localhost:8800/tweet/search?q=${keyword}`)
          .pipe(
            catchError(error => {
              console.error(error);
              return of([]);
            }),
          )
      ),
    ).subscribe(data => {

      this.tweets = data;
    });
  }

}
interface Tweet {
  content: string;
  user: string
  id: string;
}
