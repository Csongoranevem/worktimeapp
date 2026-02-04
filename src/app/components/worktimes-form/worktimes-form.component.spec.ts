import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktimesFormComponent } from './worktimes-form.component';

describe('WorktimesFormComponent', () => {
  let component: WorktimesFormComponent;
  let fixture: ComponentFixture<WorktimesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorktimesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorktimesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
