import { Component, OnInit } from '@angular/core';
import {auditTime} from 'rxjs/operators';
import {WsService} from '../../services/ws.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {

  coffeeTap;
  coffeeMilkTap;
  audio;
  constructor(public wsService: WsService, private router: Router) { }

  ngOnInit() {

    this.coffeeTap = false;
    this.coffeeMilkTap = false;
    this.audio = new Audio("../../assets/button.mp3");
  }

  tapCoffeeButton() {
    this.coffeeTap = true;
    setTimeout(() => {this.coffeeTap = false; }, 1000);
    navigator.vibrate([200]);
    this.audio.play();
    this.wsService.sendMessage({'messageType': 'COFFEE_TYP', 'messageBody': this.wsService.userID + ';COFFEE'});
    setTimeout(() => { this.router.navigate(['/booked']); }, 2000);

  }

  tapCoffeeMilkButton() {
    this.coffeeMilkTap = true;
    setTimeout(() => {this.coffeeMilkTap = false; }, 1000);
    navigator.vibrate([200]);
    this.audio.play();
    this.wsService.sendMessage({'messageType': 'COFFEE_TYP', 'messageBody': this.wsService.userID + ';COFFEE_WITH_MILK'});

    setTimeout(() => { this.router.navigate(['/booked']); }, 2000);
  }
}
