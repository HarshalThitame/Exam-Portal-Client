import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { ViewQuizzesComponent } from '../view-quizzes/view-quizzes.component';

@Component({
  providers:[ViewQuizzesComponent ],
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qid: any;
  title: any;
  questions: any = [];
  numberOfQuestions:any;
  availableQuestions:any;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz:QuizService,
    private _snack: MatSnackBar,
    private _login: LoginService,
    private editquiz:ViewQuizzesComponent
  ) {}

  ngOnInit(): void {



    this.qid = this._route.snapshot.params['qid'];
    this.title = this._route.snapshot.params['title'];
    console.log(this.qid);
    console.log(this.title);

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.numberOfQuestions = data.numberOfQuestions;
        console.log(this.numberOfQuestions);
      }
    )

    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.availableQuestions = this.questions.length;
        console.log(this.availableQuestions);
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }

  deleteQuestion(quesid: any) {
    Swal.fire({
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      title: 'Are you sure, want to delete this question ? ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(quesid).subscribe(
          (data: any) => {
            this._snack.open('Question deleted . . .', '', { duration: 3000 });
            console.log(data);

            


            this.questions = this.questions.filter(
              (q: { quesid: any }) => q.quesid != quesid
            );
          },
          (error) => {
            console.log(error);
            this._snack.open('Error in deleting question', '', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
