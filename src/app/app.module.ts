import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ArticleComponent } from './article/article.component';
import { ColumnComponent } from './column/column.component';
import { TweetComponent } from './tweet/tweet.component';
import {ReactiveFormsModule} from "@angular/forms";
import { TagsComponent } from './tags/tags.component';
import { LinkifyPipe } from './linkify.pipe';
import { JuejieColumnComponent } from './juejie-column/juejie-column.component';
import { JuejieArticleComponent } from './juejie-article/juejie-article.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ColumnComponent,
    TweetComponent,
    TagsComponent,
    LinkifyPipe,
    JuejieColumnComponent,
    JuejieArticleComponent,
    BookmarkComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
