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
  loading: boolean = true;

  basicData: any;
  labels: any = [];
  basicOptions: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const whiskeyId: string = params["id"];
      this.whiskeysService.getWhiskeyDetails(whiskeyId).then(whiskeyDetails => {
        whiskeyDetails.prices.forEach(p => {
          console.log(p)
          this.priceData.push(p.price);
          this.labels.push(p.date.toString());
        });

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
        this.basicData = {
          labels: this.labels,
          datasets: [
            {
              label: 'Prices',
              data: this.priceData,
              //backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              //borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1,
              tension: .5
            }
          ]
        };
    
        this.basicOptions = {
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            x: {
              type: 'time', distribution: 'linear', time: { tooltipFormat: 'DD MMM YYYY', unit: 'day' },
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };
    

      });
      this.loading = false;
    });
  }











  priceData: any = [];
  public lineChartData: ChartConfiguration["data"] = {
    datasets: [{
      data: [],
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }]
  };

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



}
