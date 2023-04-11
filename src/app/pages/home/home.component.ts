import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  cards = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Hard work beats talent',
      description: 'Success is not final, failure is not fatal: it is the courage to continue that counts.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Believe in yourself',
      description: 'The only limit to our realization of tomorrow will be our doubts of today.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1634552277084-bcaccb0e130f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
      title: 'Never give up',
      description: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      title: 'Take action',
      description: 'Success is not achieved by waiting around. It takes effort, determination, and action.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
      title: 'The Power of Positive Thinking',
      description: 'The power of positive thinking is not just a cliché. It really can change your life and help you achieve your goals.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1543616991-75a2c125ff5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      title: 'Find your passion',
      description: 'When you find something you love to do, you will never have to work a day in your life.'
    }
    ,{
      imageUrl: 'https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      title: 'Believe in Yourself',
      description: 'Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got this.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      title: 'Perseverance Pays Off',
      description: 'Success is not final, failure is not fatal: it is the courage to continue that counts.'
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: 'Embrace Your Uniqueness',
      description: 'You are unique and that is what makes you special. Embrace your individuality and never be afraid to be yourself.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Never Give Up',
      description: 'The road to success is not easy, but never give up. Keep pushing forward, even when the going gets tough.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      title: 'Dream Big',
      description: 'Dream big and believe in yourself. Anything is possible if you set your mind to it.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1544776193-32d404ae608a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1629&q=80',
      title: 'Stay Positive',
      description: 'No matter what happens, stay positive. A positive attitude can help you overcome even the toughest of challenges.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1558443957-d056622df610?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
      title: 'Take Action',
      description: 'Don\'t just talk about your goals, take action. Every step you take brings you closer to your dreams.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1533709475520-a0745bba78bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'The Power of Persistence',
      description: 'Persistence is key when it comes to achieving your goals. Keep working hard and never give up on your dreams.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1560884482-62010016d7c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      title: 'Chase Your Dreams',
      description: 'Chase your dreams, no matter how big or small they may be. The journey is worth it.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1494178270175-e96de2971df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80',
      title: 'You Are Stronger Than You Think',
      description: 'You are stronger than you think. Believe in yourself and you can overcome any obstacle.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      title: 'Be Yourself',
      description: 'Be yourself, everyone else is already taken. Embrace who you are and never be afraid to show it.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1604548640813-a46ebb168ab8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80',
      title: 'Stay Focused',
      description: 'Stay focused on your goals and don\'t let distractions get in your way. Keep your eyes on the prize.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1609954044392-859c21f03569?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      title: 'The Power of Perseverance',
      description: 'Perseverance is the key to success. Keep pushing forward, even when the going gets tough.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1515191107209-c28698631303?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      title: 'Believe in Your Abilities',
      description: 'Believe in your abilities and you can achieve anything. You have the power to make your dreams a reality.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1554290712-e640351074bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1972&q=80',
      title: 'Stay Motivated',
      description: 'Stay motivated and never lose sight of your goals. The journey may be tough, but the destination is worth it.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmlzayUyMHF1b3RlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      title: 'Take Risks',
      description: 'Take risks and step outside of your comfort zone. You never know what amazing opportunities await'
    }  
  ];
  

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
