import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Whiskey } from 'src/app/entities';
import { EditPricesComponent } from '../edit-prices/edit-prices.component';

@Component({
  selector: 'app-edit-prices-launcher',
  templateUrl: './edit-prices-launcher.component.html',
  styleUrls: ['./edit-prices-launcher.component.scss'],
  providers: [DialogService, MessageService]
})
export class EditPricesLauncherComponent {
  @Input() whiskey!: Whiskey;

  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService, public messageService: MessageService) { }

  public editPrices(whiskey: Whiskey): void {
    this.ref = this.dialogService.open(EditPricesComponent, { header: 'Edit Prices', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskey: this.whiskey } });
  }

}
