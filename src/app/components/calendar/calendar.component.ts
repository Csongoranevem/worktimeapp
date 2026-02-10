import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from '@fullcalendar/list';
import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Holiday } from '../../interfaces/holiday';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  calendarEl: HTMLElement | null = null;
  calendar?: Calendar;
  workTimeData: any[] = [];
  userId: string | null = null;
  users: User[] = [];

  holidays: Holiday[] = [];

  ngOnInit(): void {
    this.renderCalendar();
    this.getHolidays();
    console.log(this.holidays);
    this.getUsers();
    this.getWorkTimesForUsers(this.userId);
  }

  renderCalendar(): void {
    this.calendarEl = document.getElementById('calendar');
    if (this.calendarEl) {
      this.calendar = new Calendar(this.calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listWeek,multiMonthYear'
        },
        events: this.holidays.map(holiday => ({
          title: holiday.name,
          start: new Date(holiday.date),
          allDay: true,
          description: holiday.name,
        })),
        eventContent(renderProps, createElement) {
          const { event } = renderProps;
          const title = event.title || '';
          const start = event.start ? event.start.toLocaleString() : '';
          const end = event.end ? event.end.toLocaleString() : '';
          return createElement('div', { class: 'event-content' }, [
            createElement('strong', {}, title),
            createElement('div', {}, `Start: ${start}`),
            createElement('div', {}, `End: ${end}`)
          ]);
        },

      });

      this.calendar.render();
    }
  }

  getWorkTimesForUsers(userId: string | null) {
    if (userId) {
      this.api.selectByField('worktimes', 'userId', 'eq', userId).subscribe({
        next: (res) => {
          this.workTimeData = JSON.parse(JSON.stringify(res));
        },
        error: (err) => {
          console.log(err.error.error);
        }
      });
    }
  }

  getUsers() {
    this.api.selectByField('users', 'status', 'eq', '1').subscribe({
      next: (res) => {
        this.users = res as User[];

      },
      error: (err) => {
        console.log(err.error.error);
      }
    });
  }

  getHolidays() {
    this.api.getHolidays().subscribe({
      next: res => {
        for (let holiday of res as Holiday[]) {
          this.holidays.push({
            date: holiday.date,
            name: holiday.name,
            type: holiday.type,
            weekday: new Date(holiday.date).getDay()
          });
        }
      },
      error: (err) => {
        console.log(err.error.error);
      }
    });
  }
}





