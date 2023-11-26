import { Component, Input } from '@angular/core';
import { Whiskey } from 'src/app/entities';
import { EditTradesComponent } from '../edit-trades/edit-trades.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-trades-launcher',
  templateUrl: './edit-trades-launcher.component.html',
  styleUrls: ['./edit-trades-launcher.component.scss'],
  providers: [DialogService]
})
export class EditTradesLauncherComponent {
  @Input('whiskey')
  whiskey!: Whiskey;
  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService) { }

  showTrades(whiskey: Whiskey): void {
    this.ref = this.dialogService.open(EditTradesComponent, { header: 'Trades', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskey: this.whiskey } });
  }

}
