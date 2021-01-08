import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment as env } from '../../environments/environment';

interface Message {
  message: string;
}

@Component({
  selector: 'app-server-communications',
  templateUrl: './server-communications.component.html',
  styleUrls: ['./server-communications.component.scss']
})
export class ServerCommunicationsComponent implements OnInit {

  message: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.http
      //.get<Message>(`https://whiskey-api.webster-smalley.co.uk/test.php`)
      //.get<Message>(`${env.dev.serverUrl}/api/messages/protected-message`)
      //.subscribe(result => {
      //  this.message = result.message;
      //});
  }
  callApi(): void {
    this.http
      .get<Message>(`${env.dev.serverUrl}/api/messages/public-message`)
      .subscribe((result: Message) => {
        this.message = result.message;
      });
  }

  callSecureApi(): void {
    this.http
      .get<Message>(`${env.dev.serverUrl}/api/messages/protected-message`)
      .subscribe((result: Message) => {
        this.message = result.message;
      });
  }


}
