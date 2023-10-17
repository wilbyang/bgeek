import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuejieArticleComponent } from './juejie-article.component';

describe('JuejieArticleComponent', () => {
  let component: JuejieArticleComponent;
  let fixture: ComponentFixture<JuejieArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuejieArticleComponent]
    });
    fixture = TestBed.createComponent(JuejieArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
