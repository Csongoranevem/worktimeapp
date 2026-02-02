import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  items: MenuItem[] | undefined = [];
  isLoggedIn: boolean = false;

  ngOnInit() {

    this.auth.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      setTimeout(() => {
        this.setUpMenu();
      }, 50);

      if (loggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }


  setUpMenu() {
    this.items = [
      //always visible
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      // visible only when not logged in
      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: '/login'
      },

      {
        label: 'Registration',
        icon: 'pi pi-fw pi-user-plus',
        routerLink: '/registration'
      },

      // visible only when logged in

      ...(this.isLoggedIn) ? [{
        label: 'Statistics',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: '/statistics'
      },


      {
        label: 'Worktimes',
        icon: 'pi pi-fw pi-clock',
        routerLink: '/worktimes'
      },

      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        routerLink: '/users'
      },

      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: '/logout'
      }] : []
    ]

  }

}
