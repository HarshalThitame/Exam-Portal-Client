import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SendMailService } from 'src/app/services/send-mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedback: any = {
    to: '',
    subject: '',
    message: '',
  };

  constructor(
    private _sendmail: SendMailService,
    private _snack: MatSnackBar
  ) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  sendFeedback() {
    this.feedback.to = 'hthitame@gmail.com';
    if (
      this.feedback.subject == '' ||
      this.feedback.subject == null ||
      this.feedback.message == '' ||
      this.feedback.message == null
    ) {
      this._snack.open('All fields are mendatory(*) !', '', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    } else {
      this._sendmail.sendFeedback(this.feedback).subscribe(
        (data: any) => {
          console.log(data);
          if (data == true) {
            Swal.fire('Success', 'Thank you for your feedback..', 'success');
          } else {
            Swal.fire(
              'Oppss',
              'Error while sending feedback ...Try after some time..',
              'warning'
            );
          }
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Server error...', 'error');
        }
      );
    }
  }
}
