import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WhiskeyDetails } from '../entities';

import { PriceGraphComponent } from '../price-graph/price-graph.component';
import { WhiskeysService } from '../Data/whiskeys.service';

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


  constructor(private route: ActivatedRoute, private whiskeysService: WhiskeysService) { }

  private loadData(): void {
    this.route.params.subscribe(params => {
      this.whiskeyId = params['id'];
      this.whiskeysService.getWhiskeyDetails(this.whiskeyId).then(whiskeyDetails => { this.whiskeyDetails = whiskeyDetails});
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
    this.whiskeysService.save(this.whiskeyDetails.whiskey).subscribe(w => this.loadData());
  }

}
