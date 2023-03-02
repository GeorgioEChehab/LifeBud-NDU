import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.page.html',
  styleUrls: ['./contribute.page.scss'],
})
export class ContributePage implements OnInit 
{

  constructor(private nav_controller: NavController, private storage: Storage) 
  { 

  }

  

  ngOnInit() {
  }

}
