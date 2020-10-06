
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EditBlogPostsComponent } from './edit-blog-posts/edit-blog-posts.component';
import { ListBlogPostsComponent } from './list-blog-posts/list-blog-posts.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    ListBlogPostsComponent,
    EditBlogPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
