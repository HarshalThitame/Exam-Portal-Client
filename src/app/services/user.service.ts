import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseURL}/user/`, user);
  }

  //update user

  public updateUser(user: any) {
    return this.http.put(`${baseURL}/user/`, user);
  }

  public updateEnableOrDisable(user: any) {
    return this.http.put(`${baseURL}/user/en`, user);
  }

  //get all users
  public getUsers() {
    return this.http.get(`${baseURL}/user/all`);
  }

  public getNormalUsers() {
    return this.http.get(`${baseURL}/user/normal`);
  }

  public getUserById(id: any) {
    return this.http.get(`${baseURL}/user/get/${id}`);
  }
}
