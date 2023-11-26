import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WhiskeyTradesService } from '../Data/whiskey-trades.service';
import { WhiskeysService } from '../Data/whiskeys.service';
import { Direction, Whiskey, WhiskeyTrade } from '../entities';
import { Table } from 'primeng/table';

interface WhiskeyTradeWithDetails extends WhiskeyTrade {
  whiskeyName: string,
  distiller: string,
  directionString: string
}
@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {
  loading: boolean = true;
  error: any;
  @ViewChild('tradesTable')
  tradesTable!: Table;
  directions: {id: number, name: string}[] = [];

  constructor(private whiskeyTradesService: WhiskeyTradesService, private whiskeysService: WhiskeysService) {
    this.directions.push({id: 1, name: 'Buy'});
    this.directions.push({id: -1, name: 'Sell'});
  }

  rowData!: WhiskeyTrade[];

  @Input('whiskey')
  whiskey: Whiskey|null = null;
  whiskeys!: Whiskey[];

  lookupDirection(direction: number): string {
    return (direction === 1)?'Buy':'Sell'
  }

  addWhiskeyDetails(trade: WhiskeyTrade): WhiskeyTradeWithDetails {
    const w: Whiskey | undefined = this.whiskeys?.find(w => w.id == trade.whiskeyId);
    if (w) {
      return { ...trade, whiskeyName: w.name, distiller: w.distiller, directionString: this.lookupDirection(trade.direction) }
    } else {
      console.log("Error - whiskey not found: " + trade.whiskeyId)
      return { ...trade, whiskeyName: "", distiller: "", directionString: this.lookupDirection(trade.direction) }
    }
  }

  trades!: WhiskeyTrade[];

  ngOnInit(): void {
    this.getWhiskeyTrades();
  }

  getWhiskeyTrades(): void {
    
    this.whiskeysService.list().subscribe(ws => {
      this.whiskeys = ws.filter(w => w.active);
      this.whiskeyTradesService.list().subscribe(trades => {
        if (this.whiskey) {
          this.rowData = trades.filter(t => t.whiskeyId === this.whiskey?.id).filter(t => t.active).map(t => this.addWhiskeyDetails(t))
        } else {
          this.rowData = trades.filter(t => t.active).map(t => this.addWhiskeyDetails(t))
        }
        this.loading = false
      });
    });
  }

  addTrade(): void {
    if (this.whiskeys) {

//      this.whiskeyTradesService.new(this.whiskeys[0], 1, 0, Direction.Buy).subscribe(() => this.getWhiskeyTrades());
    }
  }

  editTrade(trade: WhiskeyTrade): void {

  }

  public delete(whiskeyTrade: WhiskeyTrade): void {
    if (confirm("Are you sure you want to delete this trade?")) {
      this.whiskeyTradesService.delete(whiskeyTrade).subscribe(() => { this.getWhiskeyTrades() });
    }
  }

  clear(table: Table) {
    table.clear();
  }

  globalFilterUpdate(event: any) {
    console.log(JSON.stringify(event.target.value))
    this.tradesTable.filterGlobal(event.target.value, 'contains');
  }

}