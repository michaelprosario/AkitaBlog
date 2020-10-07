import { AddBlogPostCommand } from 'src/app/core/commands/add.blog.post.command';
import { BlogPost } from 'src/app/core/entity/blog.post';
import { BlogPostsRepository } from 'src/app/core/interface/blog.posts.repository';
import { DataResponse } from 'src/app/core/response/data.response';
import { DeleteBlogPostCommand } from 'src/app/core/commands/delete.blog.post.command';
import { GetBlogPostQuery } from 'src/app/core/query/get.blog.post.query';
import { GetBlogPostsQuery } from 'src/app/core/query/get.blog.posts.query';
import { Injectable } from '@angular/core';
import { NewRecordResponse } from 'src/app/core/response/new.record.response';
import { Require } from 'src/app/core/helpers/require';
import { Response } from 'src/app/core/response/response';
import { UpdateBlogPostCommand } from 'src/app/core/commands/update.blog.post.command';
import { v4 as uuidv4 } from 'uuid';


function makePromise<T>(response: T) : Promise<T> {
  return new Promise( (resolve,reject) => {
    resolve(response);
  })
}

@Injectable({
  providedIn: 'root'
})
export class ConcreteBlogPostRepository extends BlogPostsRepository {

  posts: Array<BlogPost>;

  constructor(){
    super();
    this.posts = new Array<BlogPost>();
  }

  addBlogPost(command: AddBlogPostCommand): Promise<NewRecordResponse> {
    Require.thatParameterIsDefined(command, "command should be defined");

    const post = new BlogPost();
    post.content = command.content;
    post.title = command.title;
    post.id = uuidv4();

    this.posts.push(post);

    const response = new NewRecordResponse();
    response.recordId = post.id;
    response.code = 200;
    response.message = "ok";
    return makePromise<NewRecordResponse>(response);
  }

  deleteBlogPost(command: DeleteBlogPostCommand): Promise<Response> {
    Require.thatParameterIsDefined(command, "command should be defined");

    let results = this.posts.filter(r => r.id === command.id);
    let record = results[0];
    const index = this.posts.indexOf(record);
    if (index > -1) {
      this.posts.splice(index, 1);
    }

    return makePromise<Response>(new Response())
  }

  getBlogPost(query: GetBlogPostQuery): Promise<DataResponse> {
    
    Require.thatParameterIsDefined(query, "query should be defined");

    let results = this.posts.filter(r => r.id === query.id);
    let record = results[0];

    const response = new DataResponse();
    response.data = record;
    response.code = 200;
    response.message = "ok";
    return makePromise<DataResponse>(response)
  }

  getBlogPosts(query: GetBlogPostsQuery): Promise<DataResponse> {
    Require.thatParameterIsDefined(query, "query should be defined");

    const response = new DataResponse();
    response.data = this.posts;
    response.code = 200;
    response.message = "ok";
  
    return makePromise<DataResponse>(response)
  }

  updateBlogPost(command: UpdateBlogPostCommand): Promise<Response> {
    Require.thatParameterIsDefined(command, "command should be defined");

    let results = this.posts.filter(r => r.id === command.post.id);
    let record = results[0];
    record.content = command.post.content;
    record.title = command.post.title;

    return makePromise<Response>(new Response())

  }
}