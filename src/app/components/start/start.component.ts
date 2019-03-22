import { Component, OnInit } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import {delay, retryWhen} from 'rxjs/operators';
import {WsService} from '../../services/ws.service';
import {RestService} from '../../services/rest.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {
  private pin = '0000';

  private showNumpad = false;
  private wrongNumber = false;
  private audio;

  constructor(private wsService: WsService, private restService: RestService) { }

  ngOnInit() {
    this.audio = new Audio('../../assets/button.mp3');
  }

  numberClick(i: string) {
    navigator.vibrate([130]);

    if (this.pin.length === 4) {
      this.pin = this.pin.substr(1, 4);
    }
    this.pin = this.pin.concat(i);
    console.log('PIN', this.pin);
  }

  deleteNumber() {
    this.pin = '0000';
    navigator.vibrate([200]);
  }

  sendNumber() {
    navigator.vibrate([200]);
    this.audio.play();
    console.log(this.pin);
    this.restService.sendPin(this.pin).subscribe( x => {
      console.log(x);
      if (x.check === false) {
        console.log('wrong user');
        this.wrongNumber = true;
        setTimeout(() => {this.wrongNumber = false; }, 2000);

      }
    });
  }
}

