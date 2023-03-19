import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBugFormComponent } from './create-bug-form.component';

describe('CreateBugFormComponent', () => {
  let component: CreateBugFormComponent;
  let fixture: ComponentFixture<CreateBugFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBugFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBugFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
