import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  //load all categories
  public categories() {
    return this._http.get(`${baseURL}/category/`);
  }

  //load  single categories
  public getCategory(cid: any) {
    return this._http.get(`${baseURL}/category/${cid}`);
  }

  //add new category
  public addCategory(category: any) {
    return this._http.post(`${baseURL}/category/`, category);
  }

  //add new category
  public updateCategory(category: any) {
    return this._http.put(`${baseURL}/category/`, category);
  }

  public deleteCategory(cid: any) {
    return this._http.delete(`${baseURL}/category/${cid}`);
  }
}
