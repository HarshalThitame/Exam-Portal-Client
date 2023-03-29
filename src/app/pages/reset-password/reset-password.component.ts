import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  link: any;
  user = {
    id: 0,
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phone: '',
    profile: '',
    username: '',
  };
  token = {
    id: 0,
    user: {},
    token: '',
  };

  password = '';
  confirmPassword = '';

  constructor(
    private _route: ActivatedRoute,
    private login: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.link = this._route.snapshot.params['link'];
    console.log(this.link);

    this.login.resetLink(this.link).subscribe(
      (data: any) => {
        this.user.id = data.user.id;
        this.user.firstName = data.user.firstName;
        this.user.lastName = data.user.lastName;
        this.user.email = data.user.email;
        this.user.phone = data.user.phone;
        this.user.username = data.user.username;
        this.user.profile = data.user.profile;
        this.user.password = '';

        this.token.id = data.id;
        this.token.user = this.user;
        this.token.token = data.token;
        console.log('token : ' + this.token);

        console.log(this.user);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Server Error', 'error').then(() => {
          this._router.navigate(['/']);
        });
      }
    );
  }

  checkPassword() {
    var resetButton = <HTMLInputElement>document.getElementById('checkPass');
    if (this.password == this.confirmPassword) {
      resetButton.disabled = false;
    } else {
      resetButton.disabled = true;
    }
  }

  resetPassword() {
    this.user.password = this.password;
    this.login.logout();
    console.log(this.user);

    this.login.updatePassword(this.token).subscribe(
      (data: any) => {
        console.log(data);

        Swal.fire('Success', 'Password updated successfully!', 'success').then(
          () => this._router.navigate(['/'])
        );
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Server Error', 'error');
      }
    );
  }
}
