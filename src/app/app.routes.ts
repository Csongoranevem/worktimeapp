import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { WorktimesComponent } from './components/worktimes/worktimes.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'home', component: HomeComponent},
    {path: 'statistics', component: StatisticsComponent},
    {path: 'worktimes', component: WorktimesComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'users', component: UsersComponent},
    {path: 'worktimes', component: WorktimesComponent,
        children: [
            {path: ':id', component: WorktimesComponent}
        ]
    },

    {path: '', redirectTo: 'login', pathMatch: 'full'}
];
