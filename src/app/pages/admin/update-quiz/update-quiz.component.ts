import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qid = 0;
  quiz: any;
  categories: any = [];
  constructor(
    private _cat: CategoryService,
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }
  updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz  updated successfully', 'success').then(
          (e) => {
            this._router.navigate(['/admin/quizzes']);
          }
        );
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Something went wrong !!', 'error');
      }
    );
  }
}
