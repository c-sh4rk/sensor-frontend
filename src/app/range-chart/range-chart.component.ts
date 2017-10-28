import { DatePipe } from '@angular/common';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-range-chart',
  templateUrl: './range-chart.component.html',
  styleUrls: ['./range-chart.component.css']
})
export class RangeChartComponent implements OnInit {

  loaded = false;
  curve = shape.curveBasis;
  sensors = [];
  start: string;
  end: string;

  selectedSensor: any;

  data = [
    {
      name: 'Sensor',
      series: []
    }
  ];

  constructor(private as: ApiService) { }

  ngOnInit() {
    this.start = '24hago';
    this.end = 'now';

    this.as.getSensorList()
      .subscribe(ss => {
        this.sensors = ss;
        this.selectedSensor = this.sensors[0];
        this.refreshValues();
      });
  }

  setStart(mode: string) {
    this.start = mode;
  }

  setEnd(mode: string) {
    this.end = mode;
  }

  getTimestamp(mode: string) {
    switch (mode) {
      case 'now': return Date.now() / 1000;
      case '24hago': return (Date.now() / 1000) - (24 * 60 * 60);
      case '12hago': return (Date.now() / 1000) - (12 * 60 * 60);
      case '3hago': return (Date.now() / 1000) - (3 * 60 * 60);
      case '1hago': return (Date.now() / 1000) - (1 * 60 * 60);
    }
  }

  refreshValues() {
    const sensorId = this.selectedSensor.sensorId;
    const type = this.selectedSensor.type;

    this.loaded = false;
    return this.as.getRangeValues(sensorId, type, this.getTimestamp(this.start), this.getTimestamp(this.end))
      .filter(e => !!e)
      .map(vs => vs.map(v => ({
        name: new DatePipe('de').transform(new Date(v.timestamp), 'HH:mm:ss / d.M.yy'),
        value: v.value
      })))
      .subscribe(vs => {
        this.data[0].series = vs;
        this.loaded = true;
      });
  }

}
