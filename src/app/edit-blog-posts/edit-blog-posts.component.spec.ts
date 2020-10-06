import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogPostsComponent } from './edit-blog-posts.component';

describe('EditBlogPostsComponent', () => {
  let component: EditBlogPostsComponent;
  let fixture: ComponentFixture<EditBlogPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBlogPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
