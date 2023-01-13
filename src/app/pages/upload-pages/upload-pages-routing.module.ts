import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadMainPageComponent } from './upload-main-page/upload-main-page.component';

const routes: Routes = [
  {path: '', component: UploadMainPageComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPagesRoutingModule { }
