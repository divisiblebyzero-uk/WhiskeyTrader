import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  public showError(message: string): void {
    this.toastr.error(message, 'Communications Error', {
      disableTimeOut: true,
      positionClass: 'toast-bottom-right'
    });
  }
}
