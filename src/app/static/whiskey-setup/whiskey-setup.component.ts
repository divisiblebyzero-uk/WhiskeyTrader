import { Component, OnInit } from '@angular/core';
import { Whiskey } from 'src/app/entities';
import { WhiskeyDataService } from 'src/app/whiskey-data.service';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whiskey-setup',
  templateUrl: './whiskey-setup.component.html',
  styleUrls: ['./whiskey-setup.component.scss']
})
export class WhiskeySetupComponent implements OnInit {
  faPlus = faPlus;
  faTimes = faTimes;
  
  constructor(private data: WhiskeyDataService, private router: Router) { }

  rowData: Whiskey[] | null = null;

  ngOnInit(): void {
    this.getWhiskeys();
  }

  getWhiskeys(): void {
    this.rowData = this.data.getWhiskeys().filter(w => w.active);
  }


  public addNewWhiskey(): void {
    const newWhiskey = this.data.addNewWhiskey("New Whiskey");
    this.getWhiskeys();
  }

  public deleteWhiskey(whiskey: Whiskey): void {
    if (confirm("Are you sure you want to delete this whiskey?")) {
      this.data.deleteWhiskey(whiskey);
      this.getWhiskeys();
    }
  }

  public showDetails(whiskey: Whiskey): void {
    this.router.navigate(['/whiskey-details', whiskey.id]);
  }

  public convertDate(date: Date): string {
    if (!date) {
      return "unknown";
    }
    const theDate = (typeof date == "string")?new Date(date):date;

    const now = new Date();
    if (theDate.getTime() > now.getTime()) {
      return "now";
    }
    const timeDifference = now.getTime() - theDate.getTime();
    if (timeDifference < 60*1000) {
      return "now";
    }
    if (timeDifference < 2*60*1000) {
      return "about a minute ago";
    }
    if (timeDifference < 60*60*1000) {
      return Math.floor((timeDifference / 60 / 1000)) + " minutes ago";
    }
    if (timeDifference < 24*60*60*1000) {
      return Math.floor((timeDifference / 60 / 60 / 1000)) + " hours ago";
    } else {
      return Math.floor((timeDifference / 24 / 60 / 60 / 1000)) + " days ago";
    }
  }

}
