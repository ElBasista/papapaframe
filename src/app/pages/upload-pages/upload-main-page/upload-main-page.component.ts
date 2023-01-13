import { Component, OnInit } from '@angular/core';
import { ImagestorageService } from 'src/app/shared/services/imagestorage.service';


@Component({
  selector: 'app-upload-main-page',
  templateUrl: './upload-main-page.component.html',
  styleUrls: ['./upload-main-page.component.scss']
})
export class UploadMainPageComponent implements OnInit {

  file:any;
  owner:string = "";
  email:string = "";

  constructor(public imagestorage:ImagestorageService) { }


  ngOnInit(): void {
  }

  chooseFile(event:any){
    this.file = event.target.files[0];
  }

  async uploadFile(){
    await this.imagestorage.uploadImage(this.file, "Blabla", "E-Mail", "Ein schönes Foto");
  }

}
