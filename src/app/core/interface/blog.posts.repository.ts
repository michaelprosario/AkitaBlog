import { AddBlogPostCommand } from '../commands/add.blog.post.command';
import { DeleteBlogPostCommand } from '../commands/delete.blog.post.command';
import { UpdateBlogPostCommand } from '../commands/update.blog.post.command';
import { GetBlogPostQuery } from '../query/get.blog.post.query';
import { GetBlogPostsQuery } from '../query/get.blog.posts.query';
import { DataResponse } from '../response/data.response';
import { NewRecordResponse } from '../response/new.record.response';

export interface IBlogPostsRepository {
  addBlogPost(command: AddBlogPostCommand) : Promise<NewRecordResponse>;
  deleteBlogPost(command: DeleteBlogPostCommand) : Promise<Response>;
  getBlogPost(query: GetBlogPostQuery) : Promise<DataResponse>;
  getBlogPosts(query: GetBlogPostsQuery) : Promise<DataResponse>;
  updateBlogPost(command: UpdateBlogPostCommand) : Promise<Response>;
}