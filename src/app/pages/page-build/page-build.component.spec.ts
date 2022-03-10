import { routes } from './page-build-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderModule } from './../../shared/components/header/header.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBuildComponent } from './page-build.component';

describe('PageBuildComponent', () => {
  let component: PageBuildComponent;
  let fixture: ComponentFixture<PageBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBuildComponent ],
      imports: [HeaderModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)]
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
