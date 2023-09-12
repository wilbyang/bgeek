import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ColumnComponent } from './column/column.component';
const routes: Routes = [
  { path: '', redirectTo: '/columns', pathMatch: 'full' },
  { path: 'columns', component: ColumnComponent },
  { path: 'columns/:cid/articles/:aid', component: ArticleComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
