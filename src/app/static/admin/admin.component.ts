import { Component, OnInit } from '@angular/core';
import { Direction, PersistencePayload, Whiskey, WhiskeyPrice, WhiskeyTrade } from 'src/app/entities';
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

  private generatePrices(whiskey: Whiskey): number {
    const prices: WhiskeyPrice[] = [];
    let firstPrice = Math.floor(Math.random()*400 + 50);
    let currentPrice = firstPrice;
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - i);

      const price = this.data.addNewWhiskeyPrice(whiskey);
      price.date = date;
      
      const change = Math.floor(Math.random()*40 - 20);

      currentPrice = Math.floor(100*(currentPrice * (1 + change/100)))/100;
      price.price = currentPrice;
      this.data.saveWhiskeyPrice(price);
    }
    return firstPrice;
  }

  public generate(): void {
    const w: Whiskey = this.data.addNewWhiskey('Whiskey 1');
    w.description = "The first whiskey I ever tasted";
    w.distiller = "RuBrew";
    this.data.saveWhiskey(w);

    const latestPrice = this.generatePrices(w);
    this.data.addNewWhiskeyTrade(w, 2, latestPrice, Direction.Buy);
    this.data.addNewWhiskeyTrade(w, 1, latestPrice, Direction.Sell);
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
