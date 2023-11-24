import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WhiskeysService } from 'src/app/Data/whiskeys.service';
import { Whiskey, WhiskeyDetails } from 'src/app/entities';

@Component({
  selector: 'app-edit-whiskey',
  templateUrl: './edit-whiskey.component.html',
  styleUrls: ['./edit-whiskey.component.scss']
})
export class EditWhiskeyComponent implements OnInit{
  constructor( public ref: DynamicDialogRef, public data: DynamicDialogConfig, private whiskeysService: WhiskeysService) {
    
  }

  public whiskey: Whiskey = {
    id: this.whiskeysService.getNewId(),
    name: '',
    distiller: '',
    description: '',
    updated: new Date(),
    created: new Date(),
    active: true
  };

  private loadData(): void {
    if (this.data.data.whiskey) {
      console.log(JSON.stringify(this.data.data.whiskey));
      this.whiskeysService.get(this.data.data.whiskey.id).subscribe(w => this.whiskey = w);
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  public saveWhiskey(): void {
    console.log("Saving ... : " + JSON.stringify(this.whiskey))
    this.whiskeysService.save(this.whiskey).subscribe(w => this.loadData());
    this.ref.close();
  }


}
