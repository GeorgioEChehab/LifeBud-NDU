import { Component } from '@angular/core';
import { DataService } from './services/data.service';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private data_service: DataService) 
  {
    this.data_service.init();
    
  }
}
