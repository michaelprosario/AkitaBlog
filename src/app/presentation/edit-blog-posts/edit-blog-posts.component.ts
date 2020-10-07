import { ActivatedRoute, Router } from '@angular/router';
import { AddBlogPostCommand } from 'src/app/core/commands/add.blog.post.command';
import { BlogPost } from 'src/app/core/entity/blog.post';
import { BlogPostService } from 'src/app/core/services/blog.post.service';
import { Component, OnInit } from '@angular/core';
import { DataResponse } from 'src/app/core/response/data.response';
import { DeleteBlogPostCommand } from 'src/app/core/commands/delete.blog.post.command';
import { GetBlogPostQuery } from 'src/app/core/query/get.blog.post.query';
import { NewRecordResponse } from 'src/app/core/response/new.record.response';
import { UpdateBlogPostCommand } from 'src/app/core/commands/update.blog.post.command';

@Component({
  selector: 'app-edit-blog-posts',
  templateUrl: './edit-blog-posts.component.html',
  styleUrls: ['./edit-blog-posts.component.css']
})
export class EditBlogPostsComponent implements OnInit {

  editingNewRecord: boolean;
  errors: string[];
  record: BlogPost;
  recordId: string;
  recordName: string = "Blog post";
  statusText: string;
  viewModelReady: boolean;

  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editingNewRecord = true;
    this.errors = [];
    this.record = new BlogPost();
    this.recordId = "";
    this.statusText = "";
    this.viewModelReady = false;
  }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    //debugger;
    const url = this.router.url;
    if (url.startsWith('/newPost')) {
      this.setupNewRecord();
    } else if (url.startsWith('/editPost')) {
      this.recordId = this.route.snapshot.paramMap.get('id');
      this.loadRecord();
    }
  }

  private setupNewRecord() {
    this.editingNewRecord = true;
    this.record.content = "";
    this.record.title = "";
    this.record.id = "";
    this.viewModelReady = true;
  }

  loadRecord() {
    this.editingNewRecord = false;
    const query = new GetBlogPostQuery();
    query.id = this.recordId;
    this.blogPostService.getBlogPost(query)
      .then(data => {
        const response = data as unknown as DataResponse;
        this.loadRecordFromResponse(response);
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  private loadRecordFromResponse(response: DataResponse) {
    let post = response.data as BlogPost;
    this.recordId = post.id;
    this.record = post;
    this.viewModelReady = true;
  }

  afterSaveActions(context, saveAndClose) {
    if (saveAndClose) {
      context.onClose();
    }
  }

  logError(currentContext, error) {
    console.log(error);
  }

  onSave(saveAndClose: boolean) {
    const currentContext = this;
    if (this.formIsOkay()) {

      if (this.editingNewRecord) {
        const command = new AddBlogPostCommand();
        command.content = this.record.content;
        command.title = this.record.title;
        this.blogPostService.addBlogPost(command).then(data => {
          const response = data as unknown as NewRecordResponse;
          currentContext.recordId = response.recordId;
          currentContext.loadRecord();
          this.afterSaveActions(currentContext, saveAndClose);
        }).catch(error => {
          this.logError(currentContext, error);
        });
      } else {
        const command = new UpdateBlogPostCommand();
        command.post = this.record;
        this.blogPostService.updateBlogPost(command).then(data => {
          this.afterSaveActions(currentContext, saveAndClose);
        }).catch(error => {
          this.logError(currentContext, error);
        });
      }
    }
  }

  onClose() {
    this.router.navigate(['/listPosts/']);
  }

  formIsOkay() {
    // todo - put validation here!
    return true;
  }

  onDelete() {
    if (confirm("Press OK to delete " + this.recordName)) {
      const command = new DeleteBlogPostCommand();
      command.id = this.record.id;
      this.blogPostService.deleteBlogPost(command)
        .then(data => {
          this.onClose();
        })
        .catch(errors => {
          this.logError(this, errors);
        });
    }
  }

  onNew() {
    this.router.navigate(['/newPost']);
  }
}
