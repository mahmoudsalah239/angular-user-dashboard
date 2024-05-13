import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
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
    this.dataService.getUsers(this.currentPage).subscribe({
      next: (data: any) => {
        this.users = data.data;
        this.filteredUsers = this.users;
        this.totalPages = data.total_pages;
        this.paginatedUsers = this.users;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  navigateToUser(id: number): void {
    this.router.navigate(['/user', id]);
  }

  searchUsers(event: any): void {
    let id = event.target.value;
    this.filteredUsers = this.users.filter((user) =>
      user.id.toString().includes(id)
    );
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
