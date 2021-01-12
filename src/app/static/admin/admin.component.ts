import { Component, OnInit } from '@angular/core';
import { WhiskeyPricesService } from 'src/app/Data/whiskey-prices.service';
import { WhiskeyTradesService } from 'src/app/Data/whiskey-trades.service';
import { WhiskeysService } from 'src/app/Data/whiskeys-service.service';
import { Direction, PersistencePayload, Whiskey, WhiskeyPrice, WhiskeyTrade } from 'src/app/entities';
import { NotificationsService } from 'src/app/notifications.service';
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

  constructor(
    private whiskeysService: WhiskeysService,
    private whiskeyPricesService: WhiskeyPricesService,
    private whiskeyTradesService: WhiskeyTradesService,
    private notificationsService: NotificationsService
  ) { }



  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.whiskeysService.list().subscribe(whiskeys => this.whiskeys = whiskeys);
    this.whiskeyPricesService.list().subscribe(prices => this.whiskeyPrices = prices);
    this.whiskeyTradesService.list().subscribe(trades => this.whiskeyTrades = trades);
  }

  public deleteAll(): void {
    this.notificationsService.showError("No longer supported");
  }

  private generatePrices(whiskey: Whiskey): WhiskeyPrice[] {
    const prices: WhiskeyPrice[] = [];
    let firstPrice = Math.floor(Math.random()*400 + 50);
    let currentPrice = firstPrice;
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - i);

      const change = Math.floor(Math.random()*40 - 20);

      currentPrice = Math.floor(100*(currentPrice * (1 + change/100)))/100;

      const price = { id: this.whiskeyPricesService.getNewId(), whiskeyId: whiskey.id, date: date, price: currentPrice, active: true };
      
      price.price = currentPrice;
      prices.push(price);
    }
    return prices;
  }

  public generate(): void {
    this.whiskeysService.new("Whiskey 1").subscribe(w => {
      w.description = "The first whiskey I ever tasted";
      w.distiller = "RuBrew";

      const prices: WhiskeyPrice[] = this.generatePrices(w);
      this.whiskeysService.save(w).subscribe(() => {});
      prices.forEach(price => this.whiskeyPricesService.save(price).subscribe(() => {}));
      const latestPrice = prices[0].price;
      this.whiskeyTradesService.new(w, 2, latestPrice, Direction.Buy).subscribe(() => {});
      this.whiskeyTradesService.new(w, 1, latestPrice, Direction.Sell).subscribe(() => {});
    });
  }

  public download(): void {
    const payload: PersistencePayload = {
      whiskeys: this.whiskeys??[],
      whiskeyPrices: this.whiskeyPrices??[],
      whiskeyTrades: this.whiskeyTrades??[]
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
            payload.whiskeys.forEach(w => this.whiskeysService.save(w).subscribe(() => {}));
            payload.whiskeyPrices.forEach(price => this.whiskeyPricesService.save(price).subscribe(() => {}));
            payload.whiskeyTrades.forEach(trade => this.whiskeyTradesService.save(trade).subscribe(() => {}));
            this.getData();
         }
      }
  }
}
