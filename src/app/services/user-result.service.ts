import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserResultService {
  constructor(private _http: HttpClient) {}

  public getAllResult() {
    return this._http.get(`${baseURL}/result/`);
  }

  public getResultByCategory(title: any) {
    return this._http.get(`${baseURL}/result/cat/${title}`);
  }

  public getResultByQuiz(title: any) {
    return this._http.get(`${baseURL}/result/quiz/${title}`);
  }

  public getSearchResult(query: any) {
    return this._http.get(`${baseURL}/result/search/${query}`);
  }

  public getResultByUser(id: any) {
    return this._http.get(`${baseURL}/result/byuser/${id}`);
  }

  public getRankingByQuiz(id: any) {
    return this._http.get(`${baseURL}/result/rank/${id}`);
  }
}
