import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  user: any = [];

  constructor(private _user: UserService, private _login: LoginService,private snack:MatSnackBar) {}

  ngOnInit(): void {
    this._user.getNormalUsers().subscribe(
      (data: any) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }


  changeUser:any=  {
    id: null,
    enabled:null
  };


  check(id: any) {
    console.log("id ",id);
    
    this._user.getUserById(id).subscribe(
      (data:any)=>{
        this.changeUser.id = data.id;
        this.changeUser.enabled = data.enabled;

        console.log(this.changeUser);
        if(data.enabled)
        {
          this.changeUser.enabled = false;

          this._user.updateEnableOrDisable(this.changeUser).subscribe(
            (data:any)=>{
              this.snack.open('User has been Disabled !!', 'ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });                  
            },
            (error)=>{
              console.log(error);
              
            }
          )

        }

        if(!data.enabled)
        {
          this.changeUser.enabled = true;

          this._user.updateEnableOrDisable(this.changeUser).subscribe(
            (data:any)=>{
              this.snack.open('User has been enabled !!', 'ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });              
            },
            (error)=>{
              console.log(error);
              
            }
          )

        }

        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }
    
}
