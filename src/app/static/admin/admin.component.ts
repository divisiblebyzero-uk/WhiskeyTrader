import { Component, OnInit } from '@angular/core';
import { WhiskeyDataService } from 'src/app/whiskey-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private whiskeyDataService: WhiskeyDataService) { }

  ngOnInit(): void {
  }

  public deleteAll(): void {
    this.whiskeyDataService.deleteAll();
  }

}
