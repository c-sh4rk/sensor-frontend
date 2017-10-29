import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  api = '/sensor-api/api.php';


  constructor(private http: HttpClient) { }

  getLastValues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?mode=lastValues`)
      .map(vs => vs.map(e => {
        e.timestamp = new Date(e.timestamp);
        return e;
      }));
  }

  getRangeValues(sensorId: string, type: string, start?: number, end?: number): Observable<any[]> {
    let startStr = '';
    if (start) { startStr = start.toString(); }

    let endStr = '';
    if (end) { endStr = end.toString(); }

    return this.http.get<any[]>(`${this.api}?mode=getValuesInRange&sensorId=${sensorId}&type=${type}&start=${startStr}&end=${endStr}`);
  }

  getSensorList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?mode=getSensorList`);
  }

}
