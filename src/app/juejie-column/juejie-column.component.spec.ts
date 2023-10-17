import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuejieColumnComponent } from './juejie-column.component';

describe('JuejieColumnComponent', () => {
  let component: JuejieColumnComponent;
  let fixture: ComponentFixture<JuejieColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuejieColumnComponent]
    });
    fixture = TestBed.createComponent(JuejieColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
