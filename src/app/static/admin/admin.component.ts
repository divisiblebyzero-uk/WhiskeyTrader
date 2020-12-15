import { Component, OnInit } from '@angular/core';
import { PersistencePayload, Whiskey, WhiskeyPrice, WhiskeyTrade } from 'src/app/entities';
import { WhiskeyDataService } from 'src/app/whiskey-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  uploadShown: boolean = false;

  whiskeys: Whiskey[] | null = null;
  whiskeyPrices: WhiskeyPrice[] | null = null;
  whiskeyTrades: WhiskeyTrade[] | null = null;

  constructor(private data: WhiskeyDataService) { }



  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.whiskeys = this.data.getWhiskeys();
    this.whiskeyPrices = this.data.getWhiskeyPrices();
    this.whiskeyTrades = this.data.getWhiskeyTrades();
  }

  public deleteAll(): void {
    this.data.deleteAll();
    this.getData();
  }

  public generate(): void {
    const w: Whiskey = this.data.addNewWhiskey('Whiskey 1');
    const wp: WhiskeyPrice = this.data.addNewWhiskeyPrice(w);
    wp.price = 100;
    this.data.saveWhiskeyPrice(wp);
    const wt: WhiskeyTrade = this.data.addNewWhiskeyTrade(w, 1, wp.price);
    this.getData();
  }

  public download(): void {
    const payload: PersistencePayload = {
      whiskeys: this.data.getWhiskeys(),
      whiskeyPrices: this.data.getWhiskeyPrices(),
      whiskeyTrades: this.data.getWhiskeyTrades()
    };

    const filename = 'whiskeytrader.json';
    const mime = 'application/json';
    const content = JSON.stringify(payload);

    const link: HTMLAnchorElement = document.createElement('a');
    link.download = filename;
    link.href = 'data:' + mime + ';charset=utf-16,' + content;
    link.click();
    link.remove();
  }

  public showUpload(): void {
    this.uploadShown = true;
  }

  public changeListener(event: Event){
    const files = (<HTMLInputElement>event.target).files;
    if(files && files.length > 0) {
       let file : File|null = files.item(0); 
         let reader: FileReader = new FileReader();
         if (file) reader.readAsText(file);
         reader.onload = (e) => {
            let json: string = reader.result as string;
            const payload: PersistencePayload = JSON.parse(json);
            payload.whiskeys.forEach(w => this.data.saveWhiskey(w));
            payload.whiskeyPrices.forEach(wp => this.data.saveWhiskeyPrice(wp));
            payload.whiskeyTrades.forEach(wt => this.data.saveWhiskeyTrade(wt));
            this.getData();
         }
      }
  }
}
