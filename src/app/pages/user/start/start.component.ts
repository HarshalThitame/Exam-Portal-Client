import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { DisableRightClickService } from 'src/app/services/disable-right-click.service';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { SendMailService } from 'src/app/services/send-mail.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  //

  qid: any;
  title: any;
  questions: any = [];
  user: any;
  result: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isQuizEmpty = false;
  isSubmit = false;

  timer: any;

  sendmail = {
    to: '',
    subject: '',
    message: '',
  };

  constructor(
    private locationSt: LocationStrategy,
    // private rightClickDisable: DisableRightClickService,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router,
    private login: LoginService,
    private _snack: MatSnackBar,
    private _emailService: SendMailService
  ) {}

  // title = 'html-to-pdf-angular-application';
  public convetToPDF() {
    var data: any = document.getElementById('contentToConvert');
    // data = data + document.getElementById('resultTable');

    html2canvas(data, {
      useCORS: true,
      foreignObjectRendering: true,
      allowTaint: true,
    }).then((canvas) => {
      // Few necessary setting options
      var now = new Date();
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(
        this.user.firstName +
          '-' +
          this.user.lastName +
          now.toISOString() +
          '.pdf'
      ); // Generated PDF
    });
  }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this.user = this.login.getUser();
    console.log(this.user);

    this.isEmpty();

    this.preventBackButton();
    // this.rightClickDisable.disableRightClick();
    window.onkeydown = function (event) {
      if (
        event.keyCode == 116 ||
        event.keyCode == 117 ||
        event.keyCode == 118 ||
        event.keyCode == 119 ||
        event.keyCode == 120 ||
        event.keyCode == 121 ||
        event.keyCode == 122 ||
        event.keyCode == 123 ||
        event.ctrlKey
      ) {
        event.preventDefault();
      }
    };
  }

  //cehck quiz is empty or not
  isEmpty() {
    this._question
      .getQuestionsOfQuizForTest(this.qid)
      .subscribe((data: any) => {
        if (data == '' || data == null) {
          console.log('no data');
          this.isQuizEmpty = true;
          Swal.fire({
            title: 'This Quiz is Empty !!',
            text: 'There is no question in this quiz,',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Home',
          }).then((e: any) => {
            this._router.navigate(['user-dashboard/0']);
          });
        } else {
          this.loadQuestions();
        }
      });
  }

  //load quiz question
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  //disable back button
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  //submit the quiz
  submitQuiz() {
    this.marksGot = 0;
    this.correctAnswers = 0;
    this.attempted = 0;

    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit Quiz',
    }).then((e: any) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  //timer
  startTimer() {
    let t = window.setInterval(() => {
      //
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  //formatted time
  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} Min : ${ss} Sec`;
  }

  //submitting quiz
  evalQuiz() {
    // client call
    // //calculation

    //call to server
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.isSubmit = true;

        console.log(data);

        this.result = data;

        // this.questions.forEach((q: any) => {
        //   if (q.givenAnswer == q.answer) {
        //     this.correctAnswers++;
        //     let marksSingle =
        //       this.questions[0].quiz.maxMarks / this.questions.length;
        //     this.marksGot += marksSingle;
        //   }
        //   if (q.givenAnswer.trim() != '') {
        //     this.attempted++;
        //   }
        // });
        // console.log('correct ans : ' + this.correctAnswers);
        // console.log('markks got' + this.marksGot);
        // console.log('atempted' + this.attempted);
        // console.log(this.questions);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAns;
        this.attempted = data.attempted;
      },
      (error) => {
        console.log(error);

        Swal.fire('Error', 'Error while sending quiz', 'error');
      }
    );
  }

  exitQuiz(){
    Swal.fire({
      title: 'Do you want to exit the quiz ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53935',
      cancelButtonColor: 'black',
      confirmButtonText: 'Exit Quiz',
    }).then((e: any) => {
      if (e.isConfirmed) {
        this._router.navigate(['user-dashboard/0']);
      }
    });
  }

  //print result
  printPage() {
    window.print();
  }
  data: any;
  sendMail() {
    this.data = <HTMLInputElement>(<unknown>document.body.innerHTML.toString());
    this.sendmail.message = this.data;
    this.sendmail.subject = 'result';
    this.sendmail.to = 'hthitame@gmail.com';
    this._emailService.sendFeedback(this.sendmail).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.data);
  }
}
