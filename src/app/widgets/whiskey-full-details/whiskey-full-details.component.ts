import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WhiskeysService } from 'src/app/Data/whiskeys.service';
import { Whiskey, WhiskeyDetails } from 'src/app/entities';
import { PriceGraphComponent } from 'src/app/price-graph/price-graph.component';

@Component({
  selector: 'app-whiskey-full-details',
  templateUrl: './whiskey-full-details.component.html',
  styleUrls: ['./whiskey-full-details.component.scss']
})
export class WhiskeyFullDetailsComponent implements OnInit {

  public whiskeyId: string = '';

  public whiskey!: Whiskey;

  @ViewChild(PriceGraphComponent) private priceGraph!: PriceGraphComponent;

  constructor(private route: ActivatedRoute, private whiskeysService: WhiskeysService) { }

  private loadData(): void {
    this.route.params.subscribe(params => {
      this.whiskeyId = params['id'];
      this.whiskeysService.get(this.whiskeyId).subscribe(w => { this.whiskey = w });
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

}
