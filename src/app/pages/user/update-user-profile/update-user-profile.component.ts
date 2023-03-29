import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css'],
})
export class UpdateUserProfileComponent implements OnInit {
  curuentUser: any = [];
  public user = {
    id: null,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(
    private login: LoginService,
    private userService: UserService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.curuentUser = this.login.getUser();
    console.log(this.user);
    this.user = {
      id: this.curuentUser.id,
      username: this.curuentUser.username,
      password: '',
      firstName: this.curuentUser.firstName,
      lastName: this.curuentUser.lastName,
      email: this.curuentUser.email,
      phone: this.curuentUser.phone,
    };
  }

  formSubmit() {
    if (
      this.user.username == '' ||
      this.user.username == null ||
      this.user.password == '' ||
      this.user.password == null ||
      this.user.firstName == '' ||
      this.user.firstName == null ||
      this.user.lastName == '' ||
      this.user.lastName == null ||
      this.user.email == '' ||
      this.user.email == null ||
      this.user.phone == '' ||
      this.user.phone == null
    ) {
      this.snack.open('All fields is required !!', 'ok', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    this.userService.updateUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Success', 'Your profile has been updated', 'success');
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
