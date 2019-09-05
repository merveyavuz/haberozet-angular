import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFinalProjectComponent } from './app-final-project.component';

describe('AppFinalProjectComponent', () => {
  let component: AppFinalProjectComponent;
  let fixture: ComponentFixture<AppFinalProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFinalProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFinalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
