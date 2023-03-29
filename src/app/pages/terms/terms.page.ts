import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(private platform: Platform, private router: Router) 
  { }

  ngOnInit() 
  {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.router.navigate(['tabs/settings'])
    });

  }

}
