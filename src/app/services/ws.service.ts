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
  public amount = "0";


  public amountObs = new Subject<string>();

  constructor(private router: Router) {
    this.input = new QueueingSubject<any>();

    this.connection = websocketConnect('ws://10.0.1.7:8080/coffeetouch/ws', this.input);

    this.connectionStatusSubscription = this.connection.connectionStatus.subscribe(numberConnected => {
      console.log('number of connected websockets:', numberConnected);
    });

    this.getMessages().pipe(
      retryWhen(errors => errors.pipe(delay(1000)))
    ).subscribe(message => {
      this.decodeMessage(message);
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
      this.userID = message.messageBody[0];
      this.userName = message.messageBody[1];
      this.router.navigate(['/coffee']);

    } else if (message.messageType === 'AMOUNT') {
      this.amount = message.messageBody;
      this.amountObs.next(this.amount);
      this.router.navigate(['/booked']);
    }
  }
}
