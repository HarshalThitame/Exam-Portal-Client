import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserResultService } from 'src/app/services/user-result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource: any;
  length = 20;
  pageSize = 6;
  pageEvent!: PageEvent;
  obs!: Observable<any>;

  userResult: any;
  id: any;
  categories: any;
  quiz: any;
  ranking: any;
  percentage: Number | undefined;

  searchTitle: any;
  timeout: any = null;
  isFound = true;
  isRanking = false;

  totalElements: number = 0;

  constructor(
    private _router: Router,
    private _userResult: UserResultService,
    private _cat: CategoryService,
    private _quiz: QuizService,
    private _login: LoginService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._userResult.getAllResult().subscribe(
      (data: any) => {
        console.log(data);
        this.userResult = data;
        this.dataSource = new MatTableDataSource<Element>(this.userResult);

        this.changeDetectorRef.detectChanges();

        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();

        if (data == '') {
          this.isFound = false;
          return;
        } else this.isFound = true;
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

    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }

  loadAll() {
    this.ngOnInit();
  }
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
      this._userResult.getSearchResult(this.searchTitle.trim()).subscribe(
        (data: any) => {
          this.userResult = data;
          if (data == '') {
            this.isFound = false;
            return;
          } else this.isFound = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  loadResultByCategory(title: any) {
    this._userResult.getResultByCategory(title).subscribe(
      (data: any) => {
        this.userResult = data;
        if (data == '') {
          this.isFound = false;
          return;
        } else this.isFound = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadResultByQuiz(title: any) {
    this._userResult.getResultByQuiz(title).subscribe(
      (data: any) => {
        this.userResult = data;
        if (data == '') {
          this.isFound = false;
          return;
        } else this.isFound = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  title: any;
  category: any;
  // content: any;
  rankingByQuiz(quizid: any) {
    this._router.navigate(['admin/ranking/' + quizid]);
  }
}
