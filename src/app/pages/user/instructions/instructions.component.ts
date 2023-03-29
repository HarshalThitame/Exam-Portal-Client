import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        // console.log(error);
        Swal.fire('Error', 'Error in loading quiz data', 'error');
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Start Quiz...',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
      }
    });
  }
}
