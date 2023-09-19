import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeekService} from "../geek.service";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  constructor(private http: HttpClient, private geekbangService: GeekService) {
  }
  tags: string[] = [];
  ngOnInit() {
    this.http.get<string[]>('http://localhost:8800/geekbang/tags').subscribe((data: any) => {
      this.tags = data.map((v: string) => v.split(':')[1]);
    });
  }

  pickTag(t: string) {
    this.geekbangService.fetchArticlesByTag(t);
  }
}
