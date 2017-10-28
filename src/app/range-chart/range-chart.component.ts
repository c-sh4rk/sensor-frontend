import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-range-chart',
  templateUrl: './range-chart.component.html',
  styleUrls: ['./range-chart.component.css']
})
export class RangeChartComponent implements OnInit {

  data = [
    {
      name: 'foo',
      series: [
        {
          name: '5',
          value: 19.6
        },
        {
          name: '6',
          value: 29.3
        },
        {
          name: '7',
          value: 27.8
        },
        {
          name: '8',
          value: 35.1
        },
        {
          name: '9',
          value: 50.4
        },
        {
          name: '10',
          value: 23.7
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
