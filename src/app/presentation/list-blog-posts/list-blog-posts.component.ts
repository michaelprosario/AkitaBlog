import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from 'src/app/core/entity/blog.post';
import { GetBlogPostsQuery } from 'src/app/core/query/get.blog.posts.query';
import { BlogPostService } from 'src/app/core/services/blog.post.service';

@Component({
  selector: 'app-list-blog-posts',
  templateUrl: './list-blog-posts.component.html',
  styleUrls: ['./list-blog-posts.component.css']
})
export class ListBlogPostsComponent implements OnInit {

  public posts: Array<BlogPost> = [];
  public dataReady: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) { }

  ngOnInit(): void {
    this.dataReady = false;
    const query = new GetBlogPostsQuery();
    this.blogPostService.getBlogPosts(query).then((response) => {
      this.posts = response.data;
      this.dataReady = true;
    })
  }

  handleAddPost(){
    this.router.navigate(['/newPost/']);
  }

  openRecord(postId: string){
    this.router.navigate(['/editPost/' + postId])
  }
}
