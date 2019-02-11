import { Component, OnInit } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import {delay, retryWhen} from 'rxjs/operators';
import {WsService} from '../../services/ws.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {


  constructor(private wsService: WsService) { }

  ngOnInit() {
  }
}

