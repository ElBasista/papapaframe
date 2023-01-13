import { Component, OnInit } from '@angular/core';
import { ImagestorageService } from 'src/app/shared/services/imagestorage.service';


@Component({
  selector: 'app-upload-main-page',
  templateUrl: './upload-main-page.component.html',
  styleUrls: ['./upload-main-page.component.scss']
})
export class UploadMainPageComponent implements OnInit {

  file:any = null;
  owner:string = "";
  email:string = "";
  comment:string = "";



  readonly pseudopasswort = "Papapa123";
  hide:boolean = true;
  loggedin:boolean = true;
  typedPassword:string = "";
  passwordIncorrect:boolean = false;
  passwordevent:any;




  constructor(public imagestorage:ImagestorageService) { }


  ngOnInit(): void {
  }

  chooseFile(event:any){
    this.file = event.target.files[0];
  }

  updateValue(val:'email' | 'owner' | 'comment', event:any){
    let value = event.target.value;
    console.log(value);

    if(val === 'email'){
      this.email = value;
      return;
    }
    if(val === 'owner'){
      this.owner = value;
      return;
    }
    if(val === 'comment'){
      this.comment = value;
      return;
    }
  }



  async uploadFile(){
    if(this.file){
      let res = await this.imagestorage.uploadImage(this.file,this.owner, this.email, this.comment);
      alert("Upload Erfolgreich");
      window.location.href = "/";
    }
  }



  typedPasswordChange(event:any){
    this.typedPassword = String(event.target.value);
    this.passwordevent = event;
    this.login();
  }

  login(){
    if(this.typedPassword == this.pseudopasswort){
      this.loggedin = true;
    } else {
      this.passwordIncorrect = true;
    }
    this.passwordevent.target.value;
  }

  uploadReady(){
    return this.email != "" && !!this.file && this.comment != "" && this.owner != "";
  }

}
