import { Component, OnInit } from '@angular/core';
import {WsService} from '../../services/ws.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {

  public bookedOK;
  public amount;

  constructor(public wsService: WsService, private router: Router) { }

  ngOnInit() {
    this.bookedOK = false;



  }
}
