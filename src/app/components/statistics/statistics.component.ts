import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';

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

  constructor(
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42]
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          data: [41, 52, 24, 74, 23, 21, 32]
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

  refreshChart() {
    this.getMonthDays(this.date);
    this.getAvgWorkTimes(this.date);
    this.getUsers();
    this.users.forEach(user => {
      this.getUserWorkTimes(this.date, user.id);
    });
  }

  getMonthDays(date: Date) {}

  getAvgWorkTimes(date: Date) {}

  getUserWorkTimes(date: Date, userId: string) {}

  getUsers() {
    this.api.selectByField('users', 'status', 'eq', '1').subscribe(users => {
      this.users = users;
    });
  }
}
