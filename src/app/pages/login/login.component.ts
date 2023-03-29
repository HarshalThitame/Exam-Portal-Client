import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  dialogRef: any;
  hide = true;

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.login.getCurrentUser().subscribe(
      (data: any) => {
        // console.log(data);
        console.log(data.authorities[0].authority);
        if (data.authorities[0].authority == 'NORMAL') {
          this.router.navigate(['user-dashboard/0']);
        } else if (data.authorities[0].authority == 'ADMIN') {
          this.router.navigate(['admin']);
        } else {
          this.login.logout();
        }
      },
      (error) => {
        console.log(error);

        this.login.logout();
      }
    );
  }
  openSignup(): void {
    this.dialog.closeAll();
    this.dialogRef = this.dialog.open(SignupComponent, {
      height: '700px',
      width: '700px',
    });
  }

  openForgotPassword() {
    this.dialog.closeAll();
    this.dialogRef = this.dialog.open(ForgotPasswordComponent, {
      minHeight: '250px',
      width: '700px',
    });
  }

  formSubmit() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username.trim() == null
    ) {
      this.snack.open('Username is required !!!', '', { duration: 3000 });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.snack.open('Password is required !!!', '', { duration: 3000 });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.dialog.closeAll();
        // console.log('success');
        // console.log(data);

        //Login........
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);

            // console.log(user);

            //redirect ....Admin:redirect to admin dashboard
            //redirect ....User:redirect to user dashboard

            if (this.login.getUserRole() == 'ADMIN') {
              //admin
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == 'NORMAL') {
              //Noraml user
              // window.location.href = '/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
              // location.reload();
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      },
      (error) => {
        if (error.status == 417) {
          this.snack.open(
            'You are disabled by admin...Try again later....',
            '',
            {
              duration: 5000,
            }
          );
          return;
        }
        this.snack.open('Invalid details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }
}
