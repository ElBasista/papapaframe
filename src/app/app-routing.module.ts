import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'upload', loadChildren: () => import('./pages/upload-pages/upload-pages.module').then(m=>m.UploadPagesModule)},
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
