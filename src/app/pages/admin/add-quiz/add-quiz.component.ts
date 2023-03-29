import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories: any = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: { cid: '' },
  };

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private router: Router,
    private _login: LoginService
  ) {}
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }
  addQuiz() {
    if (
      this.quizData.title.trim() == '' ||
      this.quizData.title.trim() == null
    ) {
      this._snack.open('Title Required', '', { duration: 3000 });
      return;
    }

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Quiz saved successfully',
          showCancelButton: true,
          confirmButtonText: 'Add Question.',
          confirmButtonColor: 'success',
          text: 'Click button to add questions in quiz.',
        }).then((e) => {
          if (e.isConfirmed) {
            this.router.navigate([
              '/admin/add-question/' + data.qid + '/' + data.title,
            ]);
          }
        });
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: false,
          category: { cid: '' },
        };
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    );
  }
}
