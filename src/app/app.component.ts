import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, retryWhen, tap} from 'rxjs/operators';
import {WsService} from './services/ws.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'coffeetouchFrontend';

  url = 'http://localhost:8080/coffeetouch/api/admin/qa';

  constructor(private http: HttpClient, private wsService: WsService, private router: Router) {

    console.log('STARTTING APP...');

  }

  ngOnInit() {
    this.router.navigate(['/start']);
  }
}

