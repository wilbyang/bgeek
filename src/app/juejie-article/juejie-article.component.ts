import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-juejie-article',
  templateUrl: './juejie-article.component.html',
  styleUrls: ['./juejie-article.component.css']
})
export class JuejieArticleComponent implements AfterViewInit{
  @ViewChild('content', {static: false}) contentDiv: ElementRef<HTMLDivElement> | undefined;
  constructor() {}
  ngAfterViewInit() {
    const state = window.history.state;
    if (state && state.article) {
      if (this.contentDiv) {
        this.contentDiv.nativeElement.innerHTML = state.article.html;
      }
    }
  }

}
