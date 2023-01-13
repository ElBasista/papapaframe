import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPagesRoutingModule } from './upload-pages-routing.module';
import { UploadMainPageComponent } from './upload-main-page/upload-main-page.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UploadMainPageComponent,
  ],
  imports: [
    CommonModule,
    UploadPagesRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class UploadPagesModule { }
