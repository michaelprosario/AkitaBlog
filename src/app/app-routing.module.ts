import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBlogPostsComponent } from './presentation/edit-blog-posts/edit-blog-posts.component';
import { ListBlogPostsComponent } from './presentation/list-blog-posts/list-blog-posts.component';

const routes: Routes = [
  { path: '', component: ListBlogPostsComponent },
  { path: 'editPost/:id', component: EditBlogPostsComponent },
  { path: 'listPosts', component: ListBlogPostsComponent },
  { path: 'newPost', component: EditBlogPostsComponent },    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
