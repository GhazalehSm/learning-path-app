import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLearning } from './start-learning';

describe('StartLearning', () => {
  let component: StartLearning;
  let fixture: ComponentFixture<StartLearning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartLearning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartLearning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
