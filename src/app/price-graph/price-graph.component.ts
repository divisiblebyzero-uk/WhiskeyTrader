import { Component, OnInit } from '@angular/core';
import { Color, Label, ThemeService } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartPoint, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { WhiskeysService } from '../Data/whiskeys-service.service';

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.scss']
})
export class PriceGraphComponent implements OnInit {

  priceData: any = [];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{ type: 'time', distribution: 'linear', time: { tooltipFormat: 'DD MMM YYYY', unit: 'day' } }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
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

  public chart: any;


  constructor(private whiskeysService: WhiskeysService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const whiskeyId: string = params["id"];
      this.whiskeysService.getWhiskeyDetails(whiskeyId).then(whiskeyDetails => {
        const data: ChartPoint[] = [];
        const labels: Label[] = [];
        whiskeyDetails.prices.forEach(p => {
          data.push({ y: p.price.toString(), t: p.date.toString() });
          labels.push(p.date.toString());
        });
        this.setData(data, labels);
        });
    });
  }

  public setData(data: ChartPoint[], labels: Label[]): void {
    console.log("Setting data ...");
    this.priceData = [{
      label: 'Historic Prices',
      data: data
    }
    ];
    this.lineChartLabels = labels;
  }

}
