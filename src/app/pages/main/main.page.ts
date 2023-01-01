import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit 
{
  list: any [] = [];

  constructor(private data_service: DataService) 
  {
    this.loadEvents();

  }

  async loadEvents() //method that load previous events that are saved on the memory
  {
    setInterval(async () => 
    {
      this.list = await this.data_service.getData();
      if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "Enter a New Reminder"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'Enter a New Reminder'))
        this.list[0] == null; //used to remove the previous msg
      
    }, 1000)

  }

  async deleteEvent(index: number)
  {
    this.data_service.remove(index);
    this.list.splice(index, 1);

    this.loadEvents();
  }


  ngOnInit() 
  {

  }

}
