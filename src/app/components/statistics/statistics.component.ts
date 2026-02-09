import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';
import moment from 'moment';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [ChartModule, CommonModule, FormsModule, CalendarModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  data: any;
  options: any;
  date: Date = new Date();
  users: User[] = [];

  monthDays: string[] = [];

  avgWorkTimesPerDays: number[] = [];

  countUsersWithDataPerDay: number[] = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.getUsers();
    this.getMonthDays(this.date);
    this.getAvgWorkTimes(this.date, this.users.map(user => user.id)[0]);
    this.renderChart();
    this.users.forEach(user => {
      this.getUserWorkTimes(this.date, user.id);
    });
  }

  renderChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.monthDays,
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: this.avgWorkTimesPerDays
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [],
          borderColor: 'white',
          borderWidth: 2
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: []
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

  }

  getMonthDays(date: Date) {
    this.monthDays = [];
    const y = date.getFullYear();
    const m = date.getMonth();

    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);



    for (let d = first; d <= last; d.setDate(d.getDate() + 1)) {
      this.monthDays.push(moment(d).format('MM-DD'));

    }


    console.log(this.monthDays);


  }

  getAvgWorkTimes(date: Date, userId: string) {
    this.api.selectByField('worktimes', 'userId', 'eq', userId).subscribe({
      next: (worktimes) => {
        this.avgWorkTimesPerDays = worktimes.map(w => w.duration);
      }
    });

  }

  getUserWorkTimes(date: Date, userId: string) {
    this.api.selectByField('worktimes', 'userId', 'eq', userId).subscribe({
      next: (worktimes) => {
      }
    });
  }

  getUsers() {
    this.api.selectByField('users', 'status', 'eq', '1').subscribe(users => {
      this.users = users as User[];
    });
  }
}
