import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WhiskeyDetails } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';

import { ChartDataSets, ChartOptions, ChartPoint, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { FormsModule } from '@angular/forms';
import { PriceGraphComponent } from '../price-graph/price-graph.component';

@Component({
  selector: 'app-whiskey-details',
  templateUrl: './whiskey-details.component.html',
  styleUrls: ['./whiskey-details.component.scss']
})
export class WhiskeyDetailsComponent implements OnInit {

  public whiskeyId: string = '';

  public editMode: boolean = false;

  public whiskeyDetails: WhiskeyDetails = {
    whiskey: {
      id: '',
      name: '',
      distiller: '',
      description: '',
      updated: new Date(),
      created: new Date(),
      active: false
    },
    prices: []
  };



  @ViewChild(PriceGraphComponent) private priceGraph: PriceGraphComponent|any;


  constructor(private route: ActivatedRoute, private data: WhiskeyDataService) { }

  private loadData(): void {
    this.route.params.subscribe(params => {
      this.whiskeyId = params['id'];
      this.whiskeyDetails = this.data.getWhiskeyDetails(this.whiskeyId);
      this.editMode = false;
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public editButton(): void {
    this.editMode = true;
  }

  public saveWhiskey(): void {
    this.data.saveWhiskey(this.whiskeyDetails.whiskey);
    this.loadData();
  }

}
