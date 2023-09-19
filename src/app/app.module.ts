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

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ColumnComponent,
    TweetComponent,
    TagsComponent,
    LinkifyPipe
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
