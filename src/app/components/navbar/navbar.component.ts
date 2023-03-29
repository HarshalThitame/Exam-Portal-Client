import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  constructor(public login: LoginService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  dialogRef: any;

  openLogin(): void {
    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '700px',
    });
  }

  openSignup(): void {
    this.dialogRef = this.dialog.open(SignupComponent, {
      enterAnimationDuration: 1000,
      height: '700px',
      width: '700px',
    });
  }

  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
}
