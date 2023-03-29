import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categories: any;
  public sidebarShow: boolean = true;

  constructor(private _cat: CategoryService) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error', 'Error while loading categories !!!', 'error');
      }
    );
  }
}
