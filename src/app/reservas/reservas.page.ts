
import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  event ={
    title : '',
    startTime: '',
    endTime: ''
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
    private router: Router,
    @Inject(LOCALE_ID) 
    private locale: string) { }

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      title: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    /*let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime:  new Date(this.event.startTime)
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();*/
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime)
    }
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();

  }
 // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 

  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();

  }
  onViewTitleChanged(){

  }
 // Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}

principal()
{
  this.router.navigate(['./home']);
}

}
