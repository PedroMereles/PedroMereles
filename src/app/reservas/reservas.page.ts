import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Reserva } from '../models/reserva';
import { AuthService } from '../services/auth.service';
import { ServiciosService } from '../services/servicios.service';
import * as moment from 'moment';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservaModel: any = [{ id: '', data: {} as Reserva }];
  reserva: Reserva;
  reservas: Reserva[];
  reservasOriginal: Reserva[];
  event = {
    title: '',
    startTime: '',
    endTime: '',
  };
  minDate = new Date().toISOString();

  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      },
    },
  };
  /*
  calendar = {
    mode :'week',
    currenDate: new Date()
  }*/
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    @Inject(LOCALE_ID)
    private locale: string,
    private auth: AuthService,
    public alertController: AlertController,
    private firestoreService: ServiciosService,
    private toastr: ToastController
  ) {
    this.reserva = {
      cliente: '',
      grupo: '',
      horario: '',
      id: null,
      servicio: '',
      fecha: new Date(),
    };
  }

  ngOnInit() {
    this.getReservas();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  async getReservas() {
    await this.firestoreService.consultar('reserva').subscribe((result) => {
      this.reservasOriginal = [];
      result.forEach((datos: any) => {
        let reserva = {
          id: datos.payload.doc.id,
          cliente: datos.payload.doc.data().cliente,
          grupo: datos.payload.doc.data().grupo,
          horario: datos.payload.doc.data().horario,
          servicio: datos.payload.doc.data().servicio,
          fecha: datos.payload.doc.data().fecha,
        } as Reserva;
        this.reservasOriginal.push(reserva);
      });

      this.reservas = this.reservasOriginal;
      this.loadEvents();
      console.log(this.reservas);
    });
  }
  getReservaModel() {
    this.firestoreService.consultar('reserva').subscribe((result) => {
      this.reservaModel = [];
      result.forEach((datos: any) => {
        this.reservaModel.push({
          id: datos.payload.doc.id,
          data: datos.payload.doc.data(),
        });
        console.log(datos.payload.doc.data());
      });
      //this.reservas = this.reservasOriginal;
    });
  }

 
  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log(
      'Selected time: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    var events = [];
    this.reservas.forEach((datos: any) => {
     // debugger;
      var date = new Date();

      var startDay = datos.fecha.toDate();
      var day = startDay.getDay();
      var endDay = day;

      var startTime;
      var endTime;
      var eventType = '';
      // startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() ));
      console.log('FECHAAAA');
      console.log(day);
      console.log('-----------');
      startTime = new Date(
        Date.UTC(
          startDay.getUTCFullYear(),
          startDay.getUTCMonth(),
          startDay.getUTCDate(),
          startDay.getUTCHours(),
        )
      );
      /* startTime = new Date(
        Date.UTC(
          startDay.getUTCFullYear(),
          startDay.getUTCMonth(),
          startDay.getUTCDate()+ day
        )
      );*/
      //endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() ))
      endTime = new Date(
        Date.UTC(
          startDay.getUTCFullYear(),
          startDay.getUTCMonth(),
          startDay.getUTCDate(),
          startDay.getUTCHours()+1,
        )
      );
      console.log('startTime');

      console.log(startTime);
      console.log('-------------------');
      console.log(endTime);
      events.push({
        title: datos.servicio,
        startTime: startTime,
        endTime: endTime,
        allDay: false,
      });
    });
    console.log(events);
    return events;
  }

  onRangeChanged(ev) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  principal() {
    this.router.navigate(['./home']);
  }
}
