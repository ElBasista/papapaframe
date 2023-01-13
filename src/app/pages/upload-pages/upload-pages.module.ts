import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPagesRoutingModule } from './upload-pages-routing.module';
import { UploadMainPageComponent } from './upload-main-page/upload-main-page.component';

@NgModule({
  declarations: [
    UploadMainPageComponent,
  ],
  imports: [
    CommonModule,
    UploadPagesRoutingModule,
  ]
})
export class UploadPagesModule { }
