import { Component, ElementRef, ViewChild } from '@angular/core';
import { Article } from '../models';
import { GeekService } from '../geek.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const imgReg = /src\="https:\/\/static001.geekbang.org\/resource\/image\/[a-z0-9]{2}\/[a-z0-9]{2}\/([a-z0-9]{8,}\.(png|jpg|jpeg|gif)).*?"/g;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  
  
  @ViewChild('content', {static: false}) contentDiv: ElementRef<HTMLDivElement> | undefined;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}
  ngAfterViewInit() {
    let cid = this.route.snapshot.params['cid'];
    let aid = this.route.snapshot.params['aid'];
    this.httpClient.get<Article>(`http://localhost:8080/geek/${cid}/articles/${aid}`).subscribe({
      next: result => {
        if (this.contentDiv) {
          let content = result?.content || '';
          content = content.replace(imgReg, `src="http://geek_images.test/${result!.columnId}/$1"`);
          this.contentDiv.nativeElement.innerHTML = content;
        }
      }, error: error => console.error(error)
    });
  }

}
