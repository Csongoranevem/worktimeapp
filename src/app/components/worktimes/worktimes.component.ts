import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel"
import { User } from '../../interfaces/user';
import { Worktime } from '../../interfaces/worktime';
import { ApiService } from '../../services/api.service';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-worktimes',
  standalone: true,
  imports: [
    DropdownModule,
    FloatLabelModule,
    FormsModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './worktimes.component.html',
  styleUrl: './worktimes.component.scss'
})

export class WorktimesComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  filterValue: string = '';
  filterFields: string[] = ['name', 'email'];

  users: User[] = [];
  selectedUser: string | null = null;

  worktimes: Worktime[] = [];

  constructor(
    private api: ApiService,
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
        this.getWorktimes(null);

      },
      error: (err)=>{
        console.log(err.error.error)
      }
    });
  }

  changeUser(){
    if (this.selectedUser){
      this.getWorktimes(this.selectedUser);
    } else {
      this.getWorktimes(null)
    }
  }

  getWorktimes(id: string | null){
    console.log(id)
    if (id){
      this.api.selectByField('worktimes', 'userId', 'eq', id).subscribe({
        next: (res) =>{
          this.worktimes = res as Worktime[];
          this.worktimes.forEach(worktime => {
            worktime.date = moment(worktime.date).format('YYYY-MM-DD');
            worktime.user = this.users.find(u => u.id == worktime.userId) || null;
          });
        },
        error: (err) => {
          console.log(err.error.error);
        }
      });
    } else {
      this.api.selectAll('worktimes').subscribe({
        next: (res) =>{
          this.worktimes = res as Worktime[];
          this.worktimes.forEach(worktime => {
            worktime.date = moment(worktime.date).format('YYYY-MM-DD');
            worktime.user = this.users.find(u => u.id == worktime.userId) || null;
          });
        },
        error: (err) => {
          console.log(err.error.error);
        }
      });
    }
  }

  delete(id: string){

  }

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value;
    this.dt.filterGlobal((this.filterValue), 'contains');
  }

}
