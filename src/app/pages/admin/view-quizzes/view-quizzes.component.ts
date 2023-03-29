import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserResultService } from 'src/app/services/user-result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any;
  totalAttempts: any = [];

  quiz: any;
  questions: any;
  sizeOfquestion: any;
  noOfquestion: any;

  searchTitle: any;
  timeout: any = null;
  isAvailable = false;

  constructor(
    private _quiz: QuizService,
    private _snack: MatSnackBar,
    private _que: QuestionService,
    private _result: UserResultService,
    private _login: LoginService
  ) {}
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(data);
        this.quizzes.forEach((q: any) => {
          // this.totalAttempts.push(q);
          this._result.getResultByQuiz(q.title).subscribe(
            (data: any) => {
              this.totalAttempts.push(data.length);
            },
            (error) => {
              Swal.fire('Error !!', 'Server Error', 'error').then(() => {
                this._login.logout();
              });
            }
          );
        });
        console.log(this.totalAttempts);
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );

    // this._result.getResultByQuiz();
  }

  public onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.searchQuiz();
      }
    }, 1000);
  }

  searchQuiz() {
    if (this.searchTitle == '' || this.searchTitle == null) {
      this.ngOnInit();
    } else {
      this._quiz.searchQuiz(this.searchTitle).subscribe(
        (data: any) => {
          console.log(data);
          this.quizzes = data;
          if (data.length == 0) {
            this.isAvailable = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  //delete quiz
  deletQuiz(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qid).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter(
              (quiz: { qid: any }) => quiz.qid != qid
            );
            Swal.fire('Success', 'Quiz deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Something went wrong !!!', 'error');
          }
        );
      }
    });
  }

  check(qid: any) {
    this.sizeOfquestion = 0;
    this.noOfquestion = 0;

    //get thw quiz details
    this._quiz.getQuiz(qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);

        //if publish => not publish
        if (data.active == true) {
          this.quiz.active = false;
          this.updateQuiz();
        }
        //if not publish => publish
        else if (data.active == false) {
          console.log(this.quiz.numberOfQuestions);

          //get total number of quetion in quiz
          this._que.getQuestionsOfQuiz(qid).subscribe((data: any) => {
            this.questions = data;
            this.sizeOfquestion = this.questions.length;

            //check totoal number of question is available in quiz or not if not then do not publish
            if (this.sizeOfquestion >= this.quiz.numberOfQuestions) {
              //true
              this.quiz.active = true;
              this.updateQuiz();
            } else {
              //false
              Swal.fire(
                'Incomplete Question Paper',
                'To publish a quiz, the questions in the quiz must be more than the number of questions.',
                'warning'
              ).then(() => {
                this.ngOnInit();
              });
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        // alert('changed');
        console.log('data ' + data.active);
        if (data.active == true) {
          this._snack.open('Quiz Published', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
        } else if (data.active == false) {
          this._snack.open('Quiz Unpublished', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        Swal.fire('Error', 'Error while publishing quiz. !!');
      }
    );
  }
}
