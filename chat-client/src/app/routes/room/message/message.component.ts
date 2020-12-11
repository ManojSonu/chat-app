import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [
  ]
})
export class MessageComponent implements OnInit {

  @Input() message: any;

  ownMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.ownMessage = this.message.userId === window.sessionStorage.getItem('userId');

  }

}
