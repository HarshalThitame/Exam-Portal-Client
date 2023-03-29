import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseURL}/question/quiz/all/${qid}`);
  }
  public getQuestionsOfQuizForTest(qid: any) {
    return this._http.get(`${baseURL}/question/quiz/${qid}`);
  }
  public addQuestion(question: any) {
    return this._http.post(`${baseURL}/question/`, question);
  }

  public deleteQuestion(qid: any) {
    return this._http.delete(`${baseURL}/question/${qid}`);
  }

  //eval quiz
  public evalQuiz(questions: any) {
    return this._http.post<any>(`${baseURL}/result/`, questions);
  }
}
