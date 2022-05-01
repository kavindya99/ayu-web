import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  playSound(){
    let audio = new Audio();
    audio.src = "../../assets/videoplayback.mp3";
    audio.volume = 0.25;
    audio.load();
    audio.play();
  }

  ngOnInit() {
    this.playSound();
  }
  

}
