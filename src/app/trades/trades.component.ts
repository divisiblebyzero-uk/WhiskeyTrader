import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WhiskeyTradesService } from '../Data/whiskey-trades.service';
import { WhiskeysService } from '../Data/whiskeys.service';
import { Whiskey, WhiskeyTrade } from '../entities';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditTradeComponent } from '../widgets/edit-trade/edit-trade.component';

interface WhiskeyTradeWithDetails extends WhiskeyTrade {
  whiskeyName: string,
  distiller: string,
  directionString: string
}
@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
  providers: [DialogService]
})
export class TradesComponent implements OnInit {
  loading: boolean = true;
  error: any;
  @ViewChild('tradesTable')
  tradesTable!: Table;
  directions: {id: number, name: string}[] = [];
  ref!: DynamicDialogRef;

  constructor(private whiskeyTradesService: WhiskeyTradesService, private whiskeysService: WhiskeysService, public dialogService: DialogService) {
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

    if (this.whiskey) {
      const newWhiskeyTrade: WhiskeyTrade = {
        id: this.whiskeyTradesService.getNewId(),
        whiskeyId: this.whiskey!.id,
        date: new Date(),
        numberOfBottles: 0,
        pricePerBottle: 0,
        direction: 1,
        active: true
      }
      this.ref = this.dialogService.open(EditTradeComponent, { header: 'Add Trade', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskeyTrade: newWhiskeyTrade } });
    } else {
      console.log("Add price invoked without reference to a whiskey")
    }
  }

  editTrade(trade: WhiskeyTrade): void {
    this.ref = this.dialogService.open(EditTradeComponent, { header: 'Edit Trade', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskeyTrade: trade } });
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