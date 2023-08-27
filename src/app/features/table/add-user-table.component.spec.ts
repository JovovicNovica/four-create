import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addUserTableComponent } from './add-user-table.component';

describe('addUserTableComponent', () => {
  let component: addUserTableComponent;
  let fixture: ComponentFixture<addUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [addUserTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(addUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
