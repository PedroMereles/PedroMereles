
import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  event ={
    title : '',
    startTime: ''
  }
  minDate = new Date().toISOString();
  eventSource= [];
  calendar = {
    mode :'week',
    currenDate: new Date()
  }
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) 
    private locale: string) { }

  ngOnInit() {
    this.resetEvent();
  }
  resetEvent() {
    this.event = {
      title: '',
      startTime: new Date().toISOString()
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime)
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }
 
  onEventSelected(){

  }
  onViewTitleChanged(){

  }
  onTimeSelected(){

  }


}
