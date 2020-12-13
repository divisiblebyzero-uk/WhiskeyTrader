import { Component, OnInit } from '@angular/core';
import { WhiskeyPosition } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.sass']
})
export class HoldingsComponent implements OnInit {
  constructor(private data: WhiskeyDataService) { }

  positions: WhiskeyPosition[] | null = null;

  ngOnInit(): void {
    this.getWhiskeyPositions();
  }

  getWhiskeyPositions(): void {
    this.positions = this.data.getWhiskeyPositions();
  }

  getWhiskeyName(whiskeyId: number): string {
    return this.data.getWhiskeyName(whiskeyId);
  }

}
