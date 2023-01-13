import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  image:string = "/assets/City.jpg";
  reacted:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  react(reaction:string){
    console.log(reaction);
    this.reacted = !this.reacted;
  }

}
