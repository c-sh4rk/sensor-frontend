import { ApiService } from '../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-values',
  templateUrl: './last-values.component.html',
  styleUrls: ['./last-values.component.css']
})
export class LastValuesComponent implements OnInit {

  lastValues: any[] = [];
  loading = false;

  constructor(private as: ApiService) { }

  ngOnInit() {
    this.refreshValues();
    setInterval(() => this.refreshValues(), 3000);
  }

  refreshValues() {
    this.loading = true;
    this.as.getLastValues().subscribe(v => {
      this.lastValues = v;
      this.lastValues.sort((a, b) => {
        const aSize = a.sensorId;
        const bSize = b.sensorId;
        const aLow = a.type;
        const bLow = b.type;

        if (aSize === bSize) {
          return (aLow < bLow) ? -1 : (aLow > bLow) ? 1 : 0;
        } else {
          return (aSize < bSize) ? -1 : 1;
        }
      });

      this.loading = false;
    });
  }

}
