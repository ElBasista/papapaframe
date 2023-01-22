import { Component, OnInit } from '@angular/core';
import { ImageDataObj, ImageMetadata, ImagestorageService } from 'src/app/shared/services/imagestorage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  image:ImageDataObj | null = null;
  reactedTo:string = "";
  reaction:string = "";

  constructor(public imagestorage: ImagestorageService) { 
    this.getImageURL();
    this.setRestart(4 * 60 * 60 * 1000);
    this.setReload(0.5 * 60 * 60 * 1000);
  }

  setRestart(time:number){
    setTimeout(() => {
      location.reload();
    }, time)
  }

  setReload(time:number){
    let that = this;
    setInterval(() => {
      that.getImageURL();
    }, time)
  }

  async getImageURL(){
    let newestImage = await this.imagestorage.getNewestImage();
    this.image = newestImage ? newestImage : null;
    if(this.image){
      this.reactedTo = this.image.metadata.reaction != "" ? this.image.id : "";
      this.reaction = this.image.metadata.reaction != "" ? this.image.metadata.reaction : "";
    }
  }

  ngOnInit(): void {
  }

  async react(reaction:string){
    
    console.log(reaction);
    if(this.image){
      this.reactedTo = this.image.id
      this.reaction = reaction;
      this.imagestorage.updateReaction(this.image.id, reaction);
      //this.getImageURL();
    }
  }

}
