import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table'; 


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  users:any = [];

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {}


  ngOnInit(): void {
    this.getUsers()
    console.log(this.users);
  }


  getUsers() {
    this.api.selectAll('users').subscribe({
      next: (u) => {
        this.users = u as User[];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
