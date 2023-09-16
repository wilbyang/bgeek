import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ColumnComponent } from './column/column.component';
import {TweetComponent} from "./tweet/tweet.component";
const routes: Routes = [
  { path: '', redirectTo: '/tweets', pathMatch: 'full' },
  { path: 'columns', component: ColumnComponent },
  { path: 'columns/:cid/articles/:aid', component: ArticleComponent },
  { path: 'tweets', component: TweetComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
