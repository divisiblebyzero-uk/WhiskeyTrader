import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Whiskey, WhiskeyDetails } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';

@Component({
  selector: 'app-whiskey-details',
  templateUrl: './whiskey-details.component.html',
  styleUrls: ['./whiskey-details.component.scss']
})
export class WhiskeyDetailsComponent implements OnInit {

  private sub$: any;
  public whiskeyDetails: WhiskeyDetails | null = null;

  priceData: any;

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  constructor(private route: ActivatedRoute, private data: WhiskeyDataService) {
    this.priceData = [
      {
        "name": "Hello",//this.whiskeyDetails.whiskeyName,
        "series": [
          {
            "name": "2010",
            "value": 7300000
          },
          {
            "name": "2011",
            "value": 8940000
          }
        ]
      }
    ];
   }

  ngOnInit(): void {
    this.sub$ = this.route.params.subscribe(params => {
      const whiskeyId = params['id'];
      this.whiskeyDetails = this.data.getWhiskeyDetails(whiskeyId);
      if (this.whiskeyDetails) {
        
      }

    });
  }

  
}
