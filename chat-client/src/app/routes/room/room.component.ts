import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styles: [
  ]
})
export class RoomComponent implements OnInit {

  lastLoadTime: Number;

  messages: any[] = [];

  roomId: String;
  roomName: String;
  userId: string;
  userName: string;

  formData: { message: String } = { message: '' };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.lastLoadTime = Date.now();

    this.roomId = window.sessionStorage.getItem('roomId');
    this.roomName = window.sessionStorage.getItem('roomName');
    this.userId = window.sessionStorage.getItem('userId');
    this.userName = window.sessionStorage.getItem('userName');

    this.loadMessages();
    this.startIntervalForPolling();

  }

  loadMessages() {
    this.http.get('http://localhost:3000/rooms/' + this.roomId + '/messages/' + this.lastLoadTime).subscribe((messages: any[]) => {
      console.log(messages);
      this.messages = this.messages.concat(messages.map(message => ({ ...message, timeStamp: new Date(message.timeStamp) })));
      this.lastLoadTime = Date.now();
    });
  }

  startIntervalForPolling() {
    window.setInterval(() => {
      this.loadMessages();
    }, 3000);
  }

  onSubmit() {
    this.http.post('http://localhost:3000/rooms/' + this.roomId + '/messages', { message: this.formData.message }, { headers: { userid: this.userId, username: this.userName } })
      .subscribe(() => {
        this.loadMessages();
        this.formData.message = '';
      })
  }

  leaveRoom(){
    this.http.post('http://localhost:3000/rooms/' + this.roomId + '/leave' , {} ,{headers: { userid: this.userId}})
    .subscribe( () => {
      window.sessionStorage.clear();
      this.router.navigate(['']);
    } )
  }

}
