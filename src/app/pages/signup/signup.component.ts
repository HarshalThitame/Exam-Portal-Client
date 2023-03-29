import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  hide = true;

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  scrollStrategy: any;

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private readonly sso: ScrollStrategyOptions
  ) {
    this.scrollStrategy = this.sso.noop();
  }

  dialogRef: any;
  openLogin(): void {
    this.dialog.closeAll();

    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '700px',
    });
  }

  formSubmit() {
    console.log(this.user);

    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required !!', 'ok', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        this.dialog.closeAll();

        console.log(data);
        Swal.fire('Success', 'User is registered', 'success');
      },
      (error) => {
        console.log(error);
        this.snack.open('Something went wrong !!', 'ok', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    );
  }
}
