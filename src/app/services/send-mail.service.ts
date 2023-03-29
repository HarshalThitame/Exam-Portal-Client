import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root',
})
export class SendMailService {
  constructor(private _http: HttpClient) {}

  public sendFeedback(feedback: any) {
    return this._http.post(`${baseURL}/mail/`, feedback);
  }
}
