import { Component, OnInit } from '@angular/core';
import { Whiskey, WhiskeyPrice, WhiskeyTrade } from 'src/app/entities';
import { WhiskeyDataService } from 'src/app/whiskey-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private data: WhiskeyDataService) { }

  ngOnInit(): void {
  }

  public deleteAll(): void {
    this.data.deleteAll();
  }

  public generate(): void {
    const w: Whiskey = this.data.addNewWhiskey('Whiskey 1');
    const wp: WhiskeyPrice = this.data.addNewWhiskeyPrice(w);
    wp.price = 100;
    this.data.saveWhiskeyPrice(wp);
    const wt: WhiskeyTrade = this.data.addNewWhiskeyTrade(w, 1, wp.price);

  }

}
