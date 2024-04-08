import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ColumnComponent } from './column/column.component';
import {TweetComponent} from "./tweet/tweet.component";
import {JuejieColumnComponent} from "./juejie-column/juejie-column.component";
import {JuejieArticleComponent} from "./juejie-article/juejie-article.component";
import {TagsComponent} from "./tags/tags.component";
const routes: Routes = [
  { path: '', redirectTo: '/tweets', pathMatch: 'full' },
  { path: 'columns', component: ColumnComponent },
  { path: 'columns/tags', component: TagsComponent },
  { path: 'columns/:cid/articles/:aid', component: ArticleComponent },
  { path: 'columns/:cid', component: ColumnComponent },
  { path: 'juejin', component: JuejieColumnComponent },
  { path: 'juejin/article', component: JuejieArticleComponent },
  { path: 'tweets', component: TweetComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
