import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRooms();
  }


  private getRooms() {
    this.http.get('http://localhost:3000/rooms').subscribe((rooms) => {
      console.log(rooms);
    })
  }

}
