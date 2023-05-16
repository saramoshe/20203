import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private _base_url: string;
  public responseRecieved$ = new Subject<ResponseDetails>();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._base_url = baseUrl + 'api';
}

  public sendEmailToServer(emailAddress: string): void {
    this.http.post<ResponseDetails>(this._base_url + "/send-email-to-server", { EmailAddress: emailAddress }).subscribe(res => {
      this.responseRecieved$.next(res);
    });
  }
}

export interface ResponseDetails {
  emailAddress: string;
  exactTime: string;
}
