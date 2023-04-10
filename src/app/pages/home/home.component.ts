import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { LoginService } from 'src/app/services/login.service';
import { SendMailService } from 'src/app/services/send-mail.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { NewLoginComponent } from '../new-login/new-login.component';
import { SignupComponent } from '../signup/signup.component';
import { register } from 'swiper/element/bundle';
import { SwiperComponent } from '../swiper/swiper.component';

import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name = 'Angular with Swiper';
  @ViewChild('homeSlide', { static: true })
  public homeSlide!: SwiperComponent;
  

  public swipeOptions = {
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };


  goToNextPage() {
    this.homeSlide.swiper.slideNext();
  }
  feedback = {
    to: '',
    subject: '',
    message: '',
  };
  static c: number = 0;

  constructor(
    private _login: LoginService,
    private _router: Router,
    private _sendmail: SendMailService,
    private _snack: MatSnackBar,
    public dialog: MatDialog
  ) {}
  dialogRef: any;
  openLogin(): void {
    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '700px',
    });
  }

  openSignup(): void {
    this.dialogRef = this.dialog.open(SignupComponent, {
      // enterAnimationDuration: 1000,
      height: '700px',
      width: '700px',
    });
  }

  ngOnInit(): void {
    // location.reload();
    this._login.getCurrentUser().subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.authorities[0].authority);
        if (data.authorities[0].authority == 'NORMAL') {
          this._router.navigate(['user-dashboard/0']);
        } else if (data.authorities[0].authority == 'ADMIN') {
          this._router.navigate(['admin']);
        }
      },
      (error) => {
        console.log(error);
        if(HomeComponent.c==0)
        {
          console.log("Hello Welcome to exam portal");
          
          this._router.navigate(['/'])
          HomeComponent.c++;
        }
        this._login.logout();
      }
    );
  }

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
