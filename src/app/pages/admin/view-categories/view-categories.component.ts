import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  constructor(
    private category: CategoryService,
    private dialog: MatDialog,
    private _login: LoginService
  ) {}
  ngOnInit(): void {
    this.category.categories().subscribe(
      (data: any) => {
        //
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Server Error', 'error').then(() => {
          this._login.logout();
        });
      }
    );
  }

  addDialog() {
    this.dialog.open(AddCategoriesComponent, {
      // hasBackdrop: false,
      width: '1000px',
      direction: 'ltr',
      exitAnimationDuration: 1000,
      enterAnimationDuration: 1000,
    });
  }

  updateDialog(cid: any) {
    this.dialog.open(UpdateCategoryComponent, {
      // hasBackdrop: false,
      width: '1000px',
      direction: 'ltr',
      exitAnimationDuration: 1000,
      enterAnimationDuration: 1000,
      data: {
        cid: cid,
      },
    });
  }
  categories: any = [];

  deleteCategory(cid: any) {
    Swal.fire({
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      title: 'Are you sure, want to delete this category ? ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.category.deleteCategory(cid).subscribe(
          (data: any) => {
            Swal.fire('Success', 'Category deleted successfully', 'success');
            this.categories = this.categories.filter(
              (c: { cid: any }) => c.cid != cid
            );
          },
          (error) => {
            Swal.fire('Error', 'Error while deleting category !!!', 'error');
          }
        );
      }
    });
  }
}
