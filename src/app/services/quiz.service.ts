import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes() {
    return this._http.get(`${baseURL}/quiz/`);
  }

  public addQuiz(quiz: any) {
    return this._http.post(`${baseURL}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(qid: any) {
    return this._http.delete(`${baseURL}/quiz/${qid}`);
  }

  //get single quiz
  public getQuiz(qid: any) {
    return this._http.get(`${baseURL}/quiz/${qid}`);
  }

  //update quiz
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseURL}/quiz/`, quiz);
  }

  public getQuizzesOfCategory(cid: any) {
    return this._http.get(`${baseURL}/quiz/category/${cid}`);
  }

  //get active quizzes
  public getActiveQuizzes() {
    return this._http.get(`${baseURL}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid: any) {
    return this._http.get(`${baseURL}/quiz/category/active/${cid}`);
  }

  public searchQuiz(title: any) {
    return this._http.get(`${baseURL}/quiz/search/${title}`);
  }

  public searchActiveQuiz(title: any) {
    return this._http.get(`${baseURL}/quiz/active/${title}`);
  }
}
