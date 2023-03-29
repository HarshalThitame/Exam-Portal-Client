import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource: any;
  length = 20;
  pageSize = 6;
  pageEvent!: PageEvent;
  obs!: Observable<any>;

  catid: any;
  quizzes: any;

  searchTitle: any;
  timeout: any = null;
  isAvailable = false;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _login: LoginService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // location.reload();
    this._route.params.subscribe((params) => {
      console.log(params);
      this.catid = params['catid'];
      if (this.catid == 0) {
        console.log('all quiz');
        this._quiz.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;

            this.dataSource = new MatTableDataSource<Element>(this.quizzes);

            this.changeDetectorRef.detectChanges();

            this.dataSource.paginator = this.paginator;
            this.obs = this.dataSource.connect();
            // console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Server Error', 'error').then(() => {
              this._login.logout();
            });
          }
        );
      } else {
        this._quiz.getActiveQuizzesOfCategory(this.catid).subscribe(
          (data: any) => {
            this.quizzes = data;

            this.dataSource = new MatTableDataSource<Element>(this.quizzes);

            this.changeDetectorRef.detectChanges();

            this.dataSource.paginator = this.paginator;
            this.obs = this.dataSource.connect();
          },
          (error) => {
            console.log(error);
            // alert('Error in loading quiz data');
            Swal.fire('Error !!', 'Server Error', 'error').then(() => {
              this._login.logout();
            });
          }
        );
      }
    });
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
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  searchQuiz() {
    if (this.searchTitle == '' || this.searchTitle == null) {
      this.ngOnInit();
    } else {
      this._quiz.searchActiveQuiz(this.searchTitle).subscribe(
        (data: any) => {
          console.log(data);
          this.quizzes = data;
          this.dataSource = new MatTableDataSource<Element>(this.quizzes);

          this.changeDetectorRef.detectChanges();

          this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();

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
}
