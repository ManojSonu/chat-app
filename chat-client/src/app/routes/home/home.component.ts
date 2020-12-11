import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [  ]
})
export class HomeComponent implements OnInit {

  public rooms: any[] = [];

  public formData: { room: any, userName: string } = {
    room: {},
    userName: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getRooms();
  }

  onSubmit() {
    console.log(this.formData);

    if (this.formData.userName ==='') {
      return window.alert("Please enter a username");
    }

    this.http.post('http://localhost:3000/users', { name: this.formData.userName }).subscribe((userId: string) => {
      window.sessionStorage.setItem('userId', userId);
      window.sessionStorage.setItem('userName', this.formData.userName);

      this.http.post('http://localhost:3000/rooms/' + this.formData.room._id + '/join', {}, { headers: { userId: userId } }).subscribe(() => {
        window.sessionStorage.setItem('roomId', this.formData.room._id);
        window.sessionStorage.setItem('roomName', this.formData.room.name);
        this.router.navigate(['room']);
      })

    })

  }


  private getRooms() {
    this.http.get('http://localhost:3000/rooms').subscribe((rooms: any[]) => {
      console.log(rooms);
      this.rooms = rooms;
      this.formData.room = this.rooms.length > 0 ? this.rooms[0] : {};
    })
  }
}
