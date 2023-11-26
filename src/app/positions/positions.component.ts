import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ColDef, GridOptions, RowClassParams, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { DatePickerRendererComponent } from '../cellRenderers/date-picker-renderer/date-picker-renderer.component';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DeleteButtonComponent } from '../cellRenderers/delete-button/delete-button.component';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { WhiskeyTradesService } from '../Data/whiskey-trades.service';
import { WhiskeysService } from '../Data/whiskeys.service';
import { Whiskey, WhiskeyPosition } from '../entities';
import { WhiskeyPositionCalculatorService } from '../whiskey-position-calculator.service';
import { Table } from 'primeng/table';

interface WhiskeyPositionWithDetails extends WhiskeyPosition {
  whiskeyName: string,
  distiller: string,
}
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  @ViewChild('positionsTable') positionsTable!: Table
  loading: boolean = true;
  error: any;

  faPlus = faPlus;

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private whiskeysService: WhiskeysService, private calc: WhiskeyPositionCalculatorService) {
  }

  rowData!: WhiskeyPosition[];
  whiskeys!: Whiskey[];

  addWhiskeyDetails(position: WhiskeyPosition): WhiskeyPositionWithDetails {
    const w: Whiskey | undefined = this.whiskeys?.find(w => w.id == position.whiskeyId);
    if (w) {
      return { ...position, whiskeyName: w.name, distiller: w.distiller }
    } else {
      console.log("Error - whiskey not found: " + position.whiskeyId)
      return { ...position, whiskeyName: "", distiller: "" }
    }
  }

  ngOnInit(): void {
    this.getWhiskeyPositions();
  }

  getWhiskeyPositions(): void {
    this.whiskeysService.list().subscribe(whiskeys => {
      this.whiskeys = whiskeys
      this.calc.getPositions().then(positions => {
        this.rowData = positions.map(p => this.addWhiskeyDetails(p))
        this.loading = false
      });
    });
  }


  clear(table: Table) {
    table.clear();
  }

  globalFilterUpdate(event: any) {
    console.log(JSON.stringify(event.target.value))
    this.positionsTable.filterGlobal(event.target.value, 'contains');
  }
}
