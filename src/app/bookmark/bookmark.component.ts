import {Component, OnInit} from '@angular/core';
import {GeekService} from "../geek.service";
import {HttpClient} from "@angular/common/http";
import {Bookmark} from "../models";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  constructor(private http: HttpClient){}
  bookmarks: Bookmark[] = [];

  ngOnInit(): void {
    this.http.get('http://localhost:8800/bookmark/bookmarks').subscribe(result => {
      this.bookmarks = result as Bookmark[];
    });
  }


}
