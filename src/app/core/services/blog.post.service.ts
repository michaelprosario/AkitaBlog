import { AddBlogPostCommand } from '../commands/add.blog.post.command';
import { BlogPostsRepository } from '../interface/blog.posts.repository';
import { DataResponse } from '../response/data.response';
import { DeleteBlogPostCommand } from '../commands/delete.blog.post.command';
import { GetBlogPostQuery } from '../query/get.blog.post.query';
import { GetBlogPostsQuery } from '../query/get.blog.posts.query';
import { Injectable } from '@angular/core';
import { NewRecordResponse } from '../response/new.record.response';
import { Require } from '../helpers/require';
import { UpdateBlogPostCommand } from '../commands/update.blog.post.command';

@Injectable({
  providedIn: 'root',
})

export class BlogPostService
{
  constructor(private blogPostRepository: BlogPostsRepository) {
    Require.thatParameterIsDefined(blogPostRepository, "repository should be defined");
  }

  async addBlogPost(command: AddBlogPostCommand) {
    let response = new NewRecordResponse();

    // todo: execute validation
    let newRecordResponse = await this.blogPostRepository.addBlogPost(command);
    return newRecordResponse;
  }

  async deleteBlogPost(command: DeleteBlogPostCommand) {
    let response = new Response();

    // todo: execute validation

    let recordId = await this.blogPostRepository.deleteBlogPost(command);
    return response;
  }

  async updateBlogPost(command: UpdateBlogPostCommand) {
    let response = new Response();

    // todo: execute validation
    let recordId = await this.blogPostRepository.updateBlogPost(command);
    return response;
  }  

  async getBlogPost(query: GetBlogPostQuery) {
    let response = new DataResponse();

    // todo: execute validation
    return await this.blogPostRepository.getBlogPost(query);
  }  

  async getBlogPosts(query: GetBlogPostsQuery) {
    let response = new DataResponse();

    // todo: execute validation
    return await this.blogPostRepository.getBlogPosts(query);
  }  
}