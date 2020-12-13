import { Component, OnInit } from '@angular/core';
import { Whiskey } from 'src/app/entities';
import { WhiskeyDataService } from 'src/app/whiskey-data.service';

@Component({
  selector: 'app-whiskey-setup',
  templateUrl: './whiskey-setup.component.html',
  styleUrls: ['./whiskey-setup.component.scss']
})
export class WhiskeySetupComponent implements OnInit {

  constructor(private data: WhiskeyDataService) { }

  whiskeys: Whiskey[] | null = null;

  ngOnInit(): void {
    this.getWhiskeys();
  }

  getWhiskeys(): void {
    this.whiskeys = this.data.getWhiskeys();
  }

}
