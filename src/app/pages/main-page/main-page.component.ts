import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  image:string = "/assets/City.jpg";
  reacted:boolean = false;

  constructor(private storage: AngularFireStorage) { 
    const fileRef = this.storage.ref('City.jpg');
  }

  ngOnInit(): void {
  }

  react(reaction:string){
    console.log(reaction);
    this.reacted = !this.reacted;
  }

}
