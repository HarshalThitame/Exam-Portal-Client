import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  category: any;

  cid: any;

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _route: ActivatedRoute,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this.cid = this._route.snapshot.params['cid'];

    this._category.getCategory(this.cid).subscribe(
      (data: any) => {
        this.category = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }

  formSubmit() {
    if (
      this.category.title.trim() == '' ||
      this.category.title.trim() == null
    ) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    this._category.updateCategory(this.category).subscribe(
      (data: any) => {
        //

        Swal.fire('Success', 'Category updated successfully !!!', 'success');
      },
      (error) => {
        //
        console.log(error);
        Swal.fire(
          'Error',
          'Server Error !!! Unable to update category',
          'error'
        );
      }
    );
  }
}
