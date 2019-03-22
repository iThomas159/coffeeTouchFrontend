import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http2: HttpClient) { }

  endPointUrl = 'http://10.90.43.22:8080/coffeemakerProgram/api/';

  sendPin(pin: string) {

    let url = `${this.endPointUrl}pin`;
    url = url.replace(' ', '%20');
    console.log(url);

    let jsonString = '{"number":"' + pin + '"}';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http2.post<any>(url, jsonString, httpOptions);
  }

}
