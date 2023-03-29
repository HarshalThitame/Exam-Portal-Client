import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserResultService } from 'src/app/services/user-result.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user: any;
  categories: any;
  quizzes: any;
  userResult: any;
  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _quizzesService: QuizService,
    private _userResultService: UserResultService,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this._userService.getNormalUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.user = data;
      },
      (error) => {
        console.log(error);
        // Swal.fire('Error !!', 'Server Error', 'error').then(() => {
        //   this._login.logout();
        // });
      }
    );

    this._categoryService.categories().subscribe(
      (data: any) => {
        console.log(data);
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );

    this._quizzesService.quizzes().subscribe(
      (data: any) => {
        console.log(data);
        this.quizzes = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );

    this._userResultService.getAllResult().subscribe(
      (data: any) => {
        console.log(data);
        this.userResult = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }
}
