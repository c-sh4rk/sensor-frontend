import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  api = 'http://10.125.4.100/sensor-api/api.php';


  constructor(private http: HttpClient) { }

  getLastValues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?mode=lastValues`)
      .map(vs => vs.map(e => {
        e.timestamp = new Date(e.timestamp);
        return e;
      }));
  }

}
