import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserResultService } from 'src/app/services/user-result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  qid: any;
  ranking: any;
  quizTitle: any;
  categoryTitle: any;

  userResult: any;
  searchTitle: any;
  timeout: any = null;

  quiz: any;

  displayRecordCount = '10';
  displayedColumns = [
    'rank',
    'username',
    'name',
    'email',
    'phone',
    'percentage',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource: any;

  constructor(
    private _route: ActivatedRoute,
    private _result: UserResultService,
    private _router: Router,
    private _quiz: QuizService,
    private _login: LoginService
  ) {}

  public onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.searchResult();
      }
    }, 1000);
  }

  searchResult() {
    if (this.searchTitle.trim() == '' || this.searchTitle == null) {
      this.ngOnInit();
    } else {
      this._result.getSearchResult(this.searchTitle.trim()).subscribe(
        (data: any) => {
          this.userResult = data;
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Server Error', 'error');
        }
      );
    }
  }
  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._result.getRankingByQuiz(this.qid).subscribe(
      (data: any) => {
        this.ranking = data;
        this.quizTitle = this.ranking[0].quizs.title;
        this.categoryTitle = this.ranking[0].quizs.category.title;

        this.dataSource = new MatTableDataSource<Element>(this.ranking);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);

        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );

    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }

  loadQuizRanking(id: any) {
    // this._router.navigate(['admin/ranking/' + id]);
    window.location.href = '/admin/ranking/' + id;
  }
}
