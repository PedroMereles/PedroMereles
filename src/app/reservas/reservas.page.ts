import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }
  eventSource= [];
  calendar = {
    mode :'week',
    currenDate: new Date()
  }
  onEventSelected(){

  }
  onViewTitleChanged(){

  }
  onTimeSelected(){

  }


}
