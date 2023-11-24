import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { WhiskeysService } from '../Data/whiskeys.service';

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.scss']
})
export class PriceGraphComponent implements OnInit {

  priceData: any = [];
  public lineChartData: ChartConfiguration["data"] = { datasets: [ {
    data: [],
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }] };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: { type: 'time', time: { tooltipFormat: 'DD MMM YYYY', unit: 'day' } },
      y: 
        {
          position: 'left',
        }
      
    }
  };
//  public lineChartColors: Color[] = [
//    { // grey
//      backgroundColor: 'rgba(148,159,177,0.2)',
//      borderColor: 'rgba(148,159,177,1)',
//      pointBackgroundColor: 'rgba(148,159,177,1)',
//      pointBorderColor: '#fff',
//      pointHoverBackgroundColor: '#fff',
//      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
//    }
//  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  


  constructor(private whiskeysService: WhiskeysService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const whiskeyId: string = params["id"];
      this.whiskeysService.getWhiskeyDetails(whiskeyId).then(whiskeyDetails => {
        whiskeyDetails.prices.forEach(p => {
          console.log(p)
          this.lineChartData.datasets[0].data.push(p.price);//({ y: p.price.toString(), t: p.date.toString() });
          //labels.push(p.date.toString());
        });
        //this.setData(data, labels);
        //this.chart.ngOnChanges({});
        });
    });
  }


}
