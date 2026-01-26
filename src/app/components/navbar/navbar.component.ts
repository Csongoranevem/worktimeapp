import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.readAll('users').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);  
      }
    });
  }

}
