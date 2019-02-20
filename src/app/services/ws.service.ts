import { Injectable } from '@angular/core';
import {QueueingSubject} from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import {delay, retryWhen} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class WsService {

  private input: QueueingSubject<any>;
  private connection;
  private connectionStatusSubscription;
  private messagesSubscription;

  public userName;
  public userID;
  public amount = null;


  public amountObs = new Subject<string>();

  constructor(private router: Router) {
    this.input = new QueueingSubject<any>();

    this.connection = websocketConnect('ws://10.0.1.13:8080/ws', this.input);

    this.connectionStatusSubscription = this.connection.connectionStatus.subscribe(numberConnected => {
      console.log('number of connected websockets:', numberConnected);
    });

    this.getMessages().pipe(
      retryWhen(errors => errors.pipe(delay(1000)))
    ).subscribe(message => {
      this.decodeMessage(message);
    });
    this.amountObs.subscribe(val => {
      console.log('value, ', this.amount);
      setTimeout(() => { this.amount = null;  this.router.navigate(['/start']); }, 5000);
    });

  }

  getMessages() {
    return this.connection.messages;
  }
  sendMessage(text) {
    console.log(JSON.stringify(text));
    this.input.next(JSON.stringify(text));
  }

  private decodeMessage(msg: string) {
    console.log(msg);
    if ( msg === 'OK') {
      return;
    }
    const message = JSON.parse(msg);

    if (message.messageType === 'CARD') {
      console.log('IS CARD');
      this.userID = message.messageBody[0];
      this.userName = message.messageBody[1];
      this.router.navigate(['/coffee']);

    } else if (message.messageType === 'AMOUNT') {
      console.log('IS AMOUNT');
      this.amount = message.messageBody;
      this.amountObs.next(this.amount);
      this.router.navigate(['/booked']);
    }
  }


}
