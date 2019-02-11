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


    this.wsService.amountObs.subscribe(val => {
      this.amount = val;
      setTimeout(() => { this.bookedOK = true; }, 3000);
      setTimeout(() => { this.amount = null;  this.router.navigate(['/start']); }, 4000);
    });
  }
}
