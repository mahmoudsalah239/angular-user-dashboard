import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, SpinnerComponent, NgIf],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  IsLoading: boolean = false;
  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.IsLoading = true;
    this.dataService.getUsers(this.currentPage).subscribe({
      next: (data: any) => {
        this.IsLoading = false;
        this.users = data.data;
        this.filteredUsers = this.users;
        this.totalPages = data.total_pages;
        this.paginatedUsers = this.users;
      },
      error: (error: any) => {
        this.IsLoading = false;
        console.error('Error fetching users:', error);
      },
    });
  }

  navigateToUser(id: number): void {
    this.router.navigate(['/user', id]);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers();
    }
  }
}
