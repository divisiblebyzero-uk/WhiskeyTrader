import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditWhiskeyComponent } from '../edit-whiskey/edit-whiskey.component';
import { Whiskey } from 'src/app/entities';

@Component({
  selector: 'app-edit-whiskey-launcher',
  templateUrl: './edit-whiskey-launcher.component.html',
  styleUrls: ['./edit-whiskey-launcher.component.scss'],
  providers: [DialogService, MessageService]
})
export class EditWhiskeyLauncherComponent {
  @Input() whiskey?: Whiskey;

  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService, public messageService: MessageService) { }

  public addNewWhiskey(): void {
    this.ref = this.dialogService.open(EditWhiskeyComponent, { header: 'Add new Whiskey', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskey: null } });
  }


  public showDetails(whiskey: Whiskey): void {
    this.ref = this.dialogService.open(EditWhiskeyComponent, { header: 'Add new Whiskey', width: '70%', contentStyle: { overflow: 'auto' }, baseZIndex: 10000, maximizable: true, data: { whiskey: whiskey } });
  }

}
