import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
  
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchId:string='';
  @Output() searchUserEvent = new EventEmitter<string>();



  searchUser(event:any): void {
    
    this.searchUserEvent.emit(this.searchId);
  }
}
