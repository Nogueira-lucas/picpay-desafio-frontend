import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBuildComponent } from './page-build.component';

describe('PageBuildComponent', () => {
  let component: PageBuildComponent;
  let fixture: ComponentFixture<PageBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
