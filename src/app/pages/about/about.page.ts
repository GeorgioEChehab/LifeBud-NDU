import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private platform: Platform, private router: Router) { }

  ngOnInit() 
  {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.router.navigate(['tabs/settings'])
    });

  }

}
