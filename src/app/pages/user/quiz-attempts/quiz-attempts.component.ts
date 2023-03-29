import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { UserResultService } from 'src/app/services/user-result.service';

@Component({
  selector: 'app-quiz-attempts',
  templateUrl: './quiz-attempts.component.html',
  styleUrls: ['./quiz-attempts.component.css'],
})
export class QuizAttemptsComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource: any;
  length = 20;
  pageSize = 6;
  pageEvent!: PageEvent;
  obs!: Observable<any>;

  userResult: any;
  id: any;

  constructor(
    private _route: ActivatedRoute,
    private _userResult: UserResultService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];

    this._userResult.getResultByUser(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.userResult = data;
        this.dataSource = new MatTableDataSource<Element>(this.userResult);

        this.changeDetectorRef.detectChanges();

        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      },
      (error) => {}
    );
  }
}
