
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EditBlogPostsComponent } from './presentation/edit-blog-posts/edit-blog-posts.component';
import { FormsModule } from '@angular/forms';
import { ListBlogPostsComponent } from './presentation/list-blog-posts/list-blog-posts.component';
import { NgModule } from '@angular/core';
import { BlogPostsRepository } from './core/interface/blog.posts.repository';
import { ConcreteBlogPostRepository } from './data/repository/concrete.blog.post.repository';

@NgModule({
  declarations: [
    AppComponent,
    ListBlogPostsComponent,
    EditBlogPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{provide: BlogPostsRepository, useClass: ConcreteBlogPostRepository}],
  bootstrap: [AppComponent]
})
export class AppModule { }

