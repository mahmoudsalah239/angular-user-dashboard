import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.getUserDetails(userId);
  }

  getUserDetails(id: number): void {
    this.dataService.getUserDetails(id).subscribe({
     next:(data: any) => {
        this.user = data.data;
      },
     error: (error: any) => {
        console.error('Error fetching user details:', error);
      }
    }
      
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
 
}
