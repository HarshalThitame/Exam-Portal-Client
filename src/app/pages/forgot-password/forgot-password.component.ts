import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: any = {
    email: '',
  };

  isFound = true;
  resetLink = false;

  constructor(
    private login: LoginService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}
  // jsonObject : any = JSON.parse(this.email)
  sendOTP() {
    this.login.forgotPassword(this.email).subscribe(
      (data: any) => {
        this.isFound = true;
        this.resetLink = true;

        var resetButton = <HTMLInputElement>(
          document.getElementById('resetButton')
        );
        var resetInput = <HTMLInputElement>(
          document.getElementById('resetInput')
        );
        resetButton.disabled = true;
        resetInput.disabled = true;

        console.log(data);
      },

      (error) => {
        console.log(error);
        this.resetLink = false;

        if (error.status == 500) {
          this._snack.open('Check your network connection. . . !', '', {
            duration: 4000,
          });
          return;
        }
        if (error.status == 502) {
          this.isFound = false;
        }
      }
    );
  }
  refreshPage() {
    window.location.reload();
  }
}
