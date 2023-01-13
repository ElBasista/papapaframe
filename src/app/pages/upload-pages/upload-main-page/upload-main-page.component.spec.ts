import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMainPageComponent } from './upload-main-page.component';

describe('UploadMainPageComponent', () => {
  let component: UploadMainPageComponent;
  let fixture: ComponentFixture<UploadMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
