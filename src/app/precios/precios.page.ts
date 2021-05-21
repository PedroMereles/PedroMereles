import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.page.html',
  styleUrls: ['./precios.page.scss'],
})
export class PreciosPage implements OnInit {

  constructor(  
    private router: Router
  ) { }

  ngOnInit() {
  }
  principal()
  {
    this.router.navigate(['./home']);
  }

}
