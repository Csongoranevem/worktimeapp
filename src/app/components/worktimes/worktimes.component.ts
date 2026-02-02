import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { WorkTime } from '../../interfaces/worktimes';
import { ApiService } from '../../services/api.service';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import moment from 'moment';


@Component({
  selector: 'app-worktimes',
  standalone: true,
  imports: [FloatLabel, FormsModule, DropdownModule, DatePickerModule, ButtonModule, DialogModule, CommonModule],
  templateUrl: './worktimes.component.html',
  styleUrls: ['./worktimes.component.scss']
})
export class WorktimesComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  isEditMode: boolean = false;

  users: User[] = [];
  selectedUser: User | null = null;
  newWorkTime: WorkTime = {
    id: 0,
    userId: 0,
    startTime: (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')),
    endTime: (moment(new Date()).format('YYYY-MM-DD HH:mm:ss')),
    duration: 0
  };
  showDialog: boolean = false;

  worktimes: WorkTime[] = [];



  getUsers() {
    this.api.selectAll('users').subscribe({
      next: (res) => {
        this.users = res as User[];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

    this.getWorkTimes();
  }

  getWorkTimes() {
    this.api.selectAll('worktimes').subscribe({
      next: (res) => {
        this.worktimes = res as WorkTime[];
      },
      error: (error) => {
        console.error('Error fetching work times:', error);
      }
    });
  }


  createNewWorkTime() {

    // Open dialog here
    this.showDialog = true;

    if (this.selectedUser) {
      this.newWorkTime.userId = this.selectedUser!.id;
    }


  }



  saveWorkTime() {
    if (this.newWorkTime && !this.isEditMode) {
      this.api.insert('worktimes', this.newWorkTime).subscribe({
        next: (res) => {
          this.worktimes.push(res as WorkTime);
        },
        error: (error) => {
          console.error('Error creating work time:', error);
        }
      });
    if (this.newWorkTime && this.isEditMode) {
        this.api.update('worktimes', this.newWorkTime).subscribe({
          next: (res) => {
            const index = this.worktimes.findIndex(w => w.id === this.newWorkTime.id);
            if (index !== -1) {
              this.worktimes[index] = res as WorkTime;
            }
          },
          error: (error) => {
            console.error('Error updating work time:', error);
          }
        });
      }
    }

    this.closeModal();
  }

  closeModal() {
    this.showDialog = false;
    this.newWorkTime = {
      id: 0,
      userId: 0,
      startTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      duration: 0
    };

    this.ngOnInit();
  }



  deleteWorkTime(id: number) {
    this.api.delete('worktimes', id).subscribe({
      next: () => {
        this.worktimes = this.worktimes.filter(w => w.id !== id);
      },
      error: (error) => {
        console.error('Error deleting work time:', error);
      }
    });
  }

  editWorkTime(workTime: WorkTime) {
    this.newWorkTime = { ...workTime };
    this.showDialog = true;
    this.isEditMode = true;
  }

}
