import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { WhiskeyPricesService } from 'src/app/Data/whiskey-prices.service';
import { WhiskeysService } from 'src/app/Data/whiskeys.service';
import { Whiskey, WhiskeyPrice } from 'src/app/entities';

interface WhiskeyPriceWithDetails extends WhiskeyPrice {
  whiskeyName: string,
  distiller: string
}

@Component({
  selector: 'app-edit-prices',
  templateUrl: './edit-prices.component.html',
  styleUrls: ['./edit-prices.component.scss']
})
export class EditPricesComponent implements OnInit{
  loading: boolean = true;
  error: any;

  @ViewChild('pricesTable') pricesTable!:Table;
  rowData: WhiskeyPriceWithDetails[]= [];
  whiskeys: Whiskey[] | null = null;

  whiskey: Whiskey | null = null;

  constructor( public ref: DynamicDialogRef|null, public input:DynamicDialogConfig|null, private whiskeysService: WhiskeysService, private whiskeyPricesService: WhiskeyPricesService) { }

  ngOnInit(): void {
    this.getWhiskeyPrices();
  }

  globalFilterUpdate(event:any) {
    console.log(JSON.stringify(event.target.value))
    this.pricesTable.filterGlobal(event.target.value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }

  addWhiskeyDetails(price: WhiskeyPrice): WhiskeyPriceWithDetails {
    const w: Whiskey|undefined = this.whiskeys?.find(w => w.id == price.whiskeyId);
    if (w) {
      return { ...price, whiskeyName: w.name, distiller: w.distiller}
    } else {
      console.log("Error - whiskey not found: " + price.whiskeyId)
      return { ...price, whiskeyName: "", distiller: ""}
    }
  }

  getWhiskeyPrices(): void {
    this.whiskeysService.list().subscribe(ws => {
      this.whiskeys = ws.filter(w => w.active);

      this.whiskeyPricesService.list().subscribe(prices => {
        this.rowData = prices.filter(wp => wp.active).map(p => { return this.addWhiskeyDetails(p) });

        this.loading = false;
      });
    });
  }

  public delete(whiskeyPrice: WhiskeyPrice): void {
    if (confirm("Are you sure you want to delete this price?")) {
      this.whiskeyPricesService.delete(whiskeyPrice).subscribe(() => this.getWhiskeyPrices());
    }
  }


}