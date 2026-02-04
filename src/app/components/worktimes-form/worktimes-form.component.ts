import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { Worktime } from '../../interfaces/worktime';
import { ApiService } from '../../services/api.service';
import moment from 'moment';

@Component({
  selector: 'app-worktimes-form',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    DropdownModule,
    FloatLabelModule,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './worktimes-form.component.html',
  styleUrl: './worktimes-form.component.scss'
})

export class WorktimesFormComponent implements OnInit{
  users: User[] = [];

  worktime: Worktime = {
    id: '',
    userId: '',
    date: new Date(),
    start: '08:00',
    end: '16:00'
  }

  constructor(
    private api: ApiService
  ){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.api.selectAll('users').subscribe({
      next: (res) => {
        this.users = res as User[];
        this.users.forEach(user => {
          user.name = user.name + ' (' + user.email + ')';
        });

        this.users.sort((a,b) => a.name.localeCompare(b.name));

      },
      error: (err)=>{
        console.log(err.error.error)
      }
    });
  }

  save(){
    let data:Worktime = {
      userId: this.worktime.userId,
      date:  moment(this.worktime.date).format('YYYY-MM-DD'),
      start: moment(this.worktime.start).format('HH:mm'),
      end: moment(this.worktime.end).format('HH:mm')
    }

    this.api.insert('worktimes', data).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err.error.error);
      }
    });
  }
}
