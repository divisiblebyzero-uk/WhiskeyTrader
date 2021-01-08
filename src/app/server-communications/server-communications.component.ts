import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
    this.http
      .get<Message>(`https://api.whiskey.webster-smalley.co.uk/test.json`)
      .subscribe(result => {
        this.message = result.message;
      });
  }

}
