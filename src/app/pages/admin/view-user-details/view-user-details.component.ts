import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserResultService } from 'src/app/services/user-result.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css'],
})
export class ViewUserDetailsComponent implements OnInit {
  id: any;
  user: any;
  userResult: any;
  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private _result: UserResultService,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];

    this._user.getUserById(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );

    this._result.getResultByUser(this.id).subscribe(
      (data: any) => {
        this.userResult = data;
        console.log(data);
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
