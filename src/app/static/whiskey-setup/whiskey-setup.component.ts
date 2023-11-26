import { Component, OnInit } from '@angular/core';
import { Whiskey, WhiskeyPosition, WhiskeyTrade } from 'src/app/entities';
import { Router } from '@angular/router';
import { WhiskeysService } from 'src/app/Data/whiskeys.service';
import * as _ from 'lodash';
import { WhiskeyPositionCalculatorService } from 'src/app/whiskey-position-calculator.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

interface WhiskeyTree {
  expanded?: boolean,
  key: string,
  label: string,
  data: { name: string, distiller: boolean },
  children: {
    key: string,
    label: string,
    data: {
      id: string,
      name: string,
      updated: Date,
      bottles: number
    }
  }[]
}
@Component({
  selector: 'app-whiskey-setup',
  templateUrl: './whiskey-setup.component.html',
  styleUrls: ['./whiskey-setup.component.scss']
})
export class WhiskeySetupComponent implements OnInit {

  loading: boolean = true;
  error: any;

  whiskeyTree!: WhiskeyTree[];
  whiskeyPositions!: WhiskeyPosition[]

  constructor(private router: Router, private ws: WhiskeysService, private calc: WhiskeyPositionCalculatorService) { }

  rowData: Whiskey[] | null = null;

  ngOnInit(): void {
    this.getWhiskeys();
  }

  createWhiskeyNode(w: Whiskey): any {
    return {
      key: w.id, label: w.name, data: {id: w.id, name: w.name, updated: w.updated, bottles: this.whiskeyPositions.find(pos => pos.whiskeyId === w.id)?.numberOfBottles}
    }
  }

  getWhiskeys(): void {
    this.calc.getPositions().then(positions => {
      this.whiskeyPositions = positions;
      this.ws.list().subscribe(whiskeys => {
        this.rowData = _.sortBy(whiskeys.filter(w => w.active), 'distiller', 'name');
  
        const whiskeyTree: WhiskeyTree[] = [];
        this.rowData.map(w => {
          const distiller = whiskeyTree.find(d => d.data.name === w.distiller)
          if (distiller) {
            distiller.children.push(this.createWhiskeyNode(w));
          } else {
            whiskeyTree.push({
              expanded: true, key: w.distiller, label: w.distiller, data: { name: w.distiller, distiller: true }, children: [ this.createWhiskeyNode(w) ]
            })
          }
        })
        this.whiskeyTree = whiskeyTree;
        this.loading = false
      });
    })
    
  }

  public deleteWhiskey(whiskey: Whiskey): void {
    if (confirm("Are you sure you want to delete this whiskey?")) {
      this.ws.delete(whiskey).subscribe(() => { this.getWhiskeys() });
    }
  }

  public convertDate(date: Date): string {
    if (!date) {
      return "unknown";
    }
    const theDate = (typeof date == "string") ? new Date(date) : date;

    const now = new Date();
    if (theDate.getTime() > now.getTime()) {
      return "now";
    }
    const timeDifference = now.getTime() - theDate.getTime();
    if (timeDifference < 60 * 1000) {
      return "now";
    }
    if (timeDifference < 2 * 60 * 1000) {
      return "about a minute ago";
    }
    if (timeDifference < 60 * 60 * 1000) {
      return Math.floor((timeDifference / 60 / 1000)) + " minutes ago";
    }
    if (timeDifference < 24 * 60 * 60 * 1000) {
      return Math.floor((timeDifference / 60 / 60 / 1000)) + " hours ago";
    } else {
      return Math.floor((timeDifference / 24 / 60 / 60 / 1000)) + " days ago";
    }
  }

  public editPrices(whiskey: Whiskey): void {
  }

  public showDetails(whiskey: Whiskey): void {
    this.router.navigate(['/whiskey-details', whiskey.id]);
  }
}
