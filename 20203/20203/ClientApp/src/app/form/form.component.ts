import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  myEmail: string = "";
  recievedTime: string = "";

  responseRecieved$: Subscription;

  constructor(private myService: MyServiceService) { }

  ngOnInit() {
    if (!this.responseRecieved$) {
      this.responseRecieved$ = this.myService.responseRecieved$.subscribe(result => this.recievedTime = result.exactTime);
    }
  }

  send() {
    this.myService.sendEmailToServer(this.myEmail);
  }

  public get isValidEmail(): boolean {
    return this.expression.test(this.myEmail.trim());
  }
}
