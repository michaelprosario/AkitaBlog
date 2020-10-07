import { AddBlogPostCommand } from '../commands/add.blog.post.command';
import { DataResponse } from '../response/data.response';
import { DeleteBlogPostCommand } from '../commands/delete.blog.post.command';
import { GetBlogPostQuery } from '../query/get.blog.post.query';
import { GetBlogPostsQuery } from '../query/get.blog.posts.query';
import { NewRecordResponse } from '../response/new.record.response';
import { Response } from '../response/response';
import { UpdateBlogPostCommand } from '../commands/update.blog.post.command';

export abstract class BlogPostsRepository {
  abstract addBlogPost(command: AddBlogPostCommand) : Promise<NewRecordResponse>;
  abstract deleteBlogPost(command: DeleteBlogPostCommand) : Promise<Response>;
  abstract getBlogPost(query: GetBlogPostQuery) : Promise<DataResponse>;
  abstract getBlogPosts(query: GetBlogPostsQuery) : Promise<DataResponse>;
  abstract updateBlogPost(command: UpdateBlogPostCommand) : Promise<Response>;
}