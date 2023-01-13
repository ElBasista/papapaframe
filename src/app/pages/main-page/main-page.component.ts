import { Component, OnInit } from '@angular/core';
import { ImageDataObj, ImageMetadata, ImagestorageService } from 'src/app/shared/services/imagestorage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  image:ImageDataObj | null = null;
  reactedTo:number = 0;
  reaction:string = "";

  constructor(public imagestorage: ImagestorageService) { 
    this.getImageURL();
  }

  async getImageURL(){
    let newestImage = await this.imagestorage.getNewestImage();
    this.image = newestImage ? newestImage : null;
  }

  ngOnInit(): void {
  }

  react(reaction:string){
    console.log(reaction);
    if(this.image){
      this.reactedTo = this.image?.metadata.timestamp
      this.reaction = reaction;
    }
  }

}
