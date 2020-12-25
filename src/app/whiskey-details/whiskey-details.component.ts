import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Whiskey, WhiskeyDetails } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';

import { ChartDataSets, ChartOptions, ChartPoint, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, SingleLineLabel } from 'ng2-charts';
import { time } from 'console';

//import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-whiskey-details',
  templateUrl: './whiskey-details.component.html',
  styleUrls: ['./whiskey-details.component.scss']
})
export class WhiskeyDetailsComponent implements OnInit {

  public whiskeyDetails: WhiskeyDetails | null = null;

  priceData: any = [{
    label: 'Whiskey Name',
    data: [
      
      {y: 1, t: '2015-03-15T13:03:00Z'},
      {y: 2, t: '2015-03-15T13:02:00Z'},
      {y: 3, t: '2015-04-25T14:12:00Z'},
      
    ]
  }
  ];

  

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ["2015-03-15T13:03:00Z", "2015-03-25T13:02:00Z", "2015-04-25T14:12:00Z"];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{type: 'time', distribution: 'linear'}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  public chart:any;

  constructor(private route: ActivatedRoute, private data: WhiskeyDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const whiskeyId = params['id'];
      this.whiskeyDetails = this.data.getWhiskeyDetails(whiskeyId);
      if (this.whiskeyDetails) {
        const data: ChartPoint[] = [];
        const labels: Label[] = [];
        this.whiskeyDetails.prices.forEach(p => {
          data.push({y: p.price.toString(), t: p.date.toString()});
          labels.push(p.date.toString());
        });
        this.priceData = [{
          label: this.whiskeyDetails.whiskeyName,
          data: data
        }
        ];
        this.lineChartLabels = labels;
      }

    });
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
