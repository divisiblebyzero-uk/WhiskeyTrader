import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { WhiskeysService } from '../Data/whiskeys.service';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.scss']
})
export class PriceGraphComponent implements OnInit {
  loading: boolean = true;

  priceData: any = [];
  basicData: any;
  labels: any = [];
  basicOptions: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const whiskeyId: string = params["id"];
      this.whiskeysService.getWhiskeyDetails(whiskeyId).then(whiskeyDetails => {
        whiskeyDetails.prices.forEach(p => {
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
              type: 'time', distribution: 'linear', time: { tooltipFormat: 'dd MMM yyyy', unit: 'month' },
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

  constructor(private whiskeysService: WhiskeysService, private route: ActivatedRoute) { }
}
