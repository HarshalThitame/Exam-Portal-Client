import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent {
  category = {
    title: '',
    description: '',
  };

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _login: LoginService
  ) {}

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

    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        //
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success', 'Category added successfully !!!', 'success');
      },
      (error) => {
        //
        console.log(error);
        Swal.fire('Error', 'Server Error !!!', 'error');
      }
    );
  }
}
