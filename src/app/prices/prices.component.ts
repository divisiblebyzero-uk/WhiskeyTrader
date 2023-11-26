import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Whiskey, WhiskeyPrice } from '../entities';
import { WhiskeysService } from '../Data/whiskeys.service';
import { WhiskeyPricesService } from '../Data/whiskey-prices.service';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditPriceComponent } from '../widgets/edit-price/edit-price.component';

export interface WhiskeyPriceWithDetails extends WhiskeyPrice {
  whiskeyName: string,
  distiller: string
}
@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
  providers: [DialogService]
})
export class PricesComponent implements OnInit {
  loading: boolean = true;
  error: any;

  @ViewChild('pricesTable') pricesTable!: Table;
  rowData: WhiskeyPriceWithDetails[] = [];
  whiskeys: Whiskey[] | null = null;

  @Input('whiskey')
  whiskey?: Whiskey | null

  ref!: DynamicDialogRef;

  constructor(private whiskeysService: WhiskeysService, private whiskeyPricesService: WhiskeyPricesService, public dialogService: DialogService) {
  }

  globalFilterUpdate(event: any) {
    console.log(JSON.stringify(event.target.value))
    this.pricesTable.filterGlobal(event.target.value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }


  addWhiskeyDetails(price: WhiskeyPrice): WhiskeyPriceWithDetails {
    const w: Whiskey | undefined = this.whiskeys?.find(w => w.id == price.whiskeyId);
    if (w) {
      return { ...price, whiskeyName: w.name, distiller: w.distiller }
    } else {
      console.log("Error - whiskey not found: " + price.whiskeyId)
      return { ...price, whiskeyName: "", distiller: "" }
    }
  }

  ngOnInit(): void {
    console.log("Got: " + JSON.stringify(this.whiskey))
    this.getWhiskeyPrices();
  }

  getWhiskeyPrices(): void {
    this.whiskeysService.list().subscribe(whiskeys => {
      this.whiskeys = whiskeys;
      this.whiskeyPricesService.list().subscribe(prices => {
        if (this.whiskey) {
          this.rowData = prices.filter(wp => wp.whiskeyId === this.whiskey?.id).filter(wp => wp.active).map(p => { return this.addWhiskeyDetails(p) });
        } else {
          this.rowData = prices.filter(wp => wp.active).map(p => { return this.addWhiskeyDetails(p) });
        }
        this.loading = false;
      });
    })
  }

  public delete(whiskeyPrice: WhiskeyPrice): void {
    if (confirm("Are you sure you want to delete this price?")) {
      this.whiskeyPricesService.delete(whiskeyPrice).subscribe(() => this.getWhiskeyPrices());
    }
  }

  public editPrice(whiskeyPrice: WhiskeyPrice): void {
    this.ref = this.dialogService.open(EditPriceComponent, { header: 'Edit Price', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskeyPrice: whiskeyPrice } });
  }

  public addPrice(): void {
    if (this.whiskey) {
      const newWhiskeyPrice: WhiskeyPrice = {
        id: this.whiskeyPricesService.getNewId(),
        whiskeyId: this.whiskey!.id,
        date: new Date(),
        price: 0,
        active: true
      }
      this.ref = this.dialogService.open(EditPriceComponent, { header: 'Add Price', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskeyPrice: newWhiskeyPrice } });
    } else {
      console.log("Add price invoked without reference to a whiskey")
    }
  }
}
