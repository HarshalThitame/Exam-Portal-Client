import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import baseURL from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  //current user : which is logged in
  public getCurrentUser(): Observable<any> {
    console.log('token form service ' + this.getToken());

    let token = this.getToken();

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     Authorization: `Bearer ${token}`,
    //   }),
    // };

    // const httpHeaders = new HttpHeaders().set(
    //   'Authorization',
    //   'Bearer ' + token
    // );
    // console.log(httpOptions);

    return this.http.get<any>(`${baseURL}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseURL}/token`, loginData);
  }

  //Login user : set token in local storage

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //isLogin : user is logged in or not

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');

    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //Logout : remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return true;
  }

  //Get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetails
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Get user
  public getUser() {
    let userStr = localStorage.getItem('user');

    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public forgotPassword(email: any) {
    console.log(email);

    return this.http.post(`${baseURL}/forgot/`, email);
  }

  public resetLink(link: any) {
    return this.http.get(`${baseURL}/forgot/${link}`);
  }

  public updatePassword(token: any) {
    return this.http.put(`${baseURL}/forgot/`, token);
  }
}
