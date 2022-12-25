import { Component, ViewChild, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit
{
  date_format: any; //convert output from YYYY-MMDDTHH:mm to YYYY-MM-DD
  time_format: any; //convert output from YYYY-MMDDTHH:mm to HH:mm
  year: number; //year from date_format and used for output
  month: number; //month from date_format and used for output
  day: number; //day from date_format and used for output
  hour: number; //hour from time_format and used for output
  minute: number; //minute from dateformat and used for output
  list: any [] = []; //array to store events and display output from
  title_output: string; //title to be used in output
  start_output: any; //start time to be used in output
  date = new Date(); //gets today's date and used later for ion-datetime
  start: string = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString(); //convert date format
  start_minus_one : any; //equal to start time minus 1 minute
  event_source: any [] = []; //array where event will first be saved
  event = { title: '', start: ''};

  constructor(private data_service: DataService, private alert_control: AlertController,
              private local_notifications: LocalNotifications)
  {
    this.loadEvents();

  }

  async loadEvents() //method that load previous events that are saved on the memory
  {
    this.list = await this.data_service.getData();
    if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "Enter a New Reminder"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'Enter a New Reminder'))
        this.list[0] == null; //used to remove the previous msg

  }

  async addEvent() //method that adds the user's event
  {
    if(this.start > this.start_minus_one)
    {
      let event_copy =
      {
        title: this.event.title,
        start: this.event.start,

      }

      this.title_output = this.event.title;
      this.start_output = this.event.start;

      this.event_source.push(event_copy);
      this.resetEvent();

    }
    else
      if(this.start < this.start_minus_one)
      {
        this.alert_control.create(
          {
            header: 'Alert',
            subHeader: 'Error With Time Selected',
            message: 'Fix The Time Entered',
            buttons: ['OK']

          }
        ).then(alert => alert.present());

      }

    this.splitDate();
    await this.data_service.add(`Event Name: ${this.title_output} on: ${this.day}-
                                ${this.month}-${this.year}-${this.hour}-${this.minute}`);
    this.loadEvents();

  }

  async deleteEvent(index: number)
  {
    this.data_service.remove(index);
    this.list.splice(index, 1);

  }

  resetEvent()
  {
    this.event =
    {
      title: '',
      start: '',

    };

    this.start = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();
    this.start_minus_one = new Date((this.date.getTime() - 60000) - this.date.getTimezoneOffset() * 60000).toISOString();

  }
  
  ngOnInit()
  {
    this.resetEvent();

  }

  showAlert(head: any, sub: any, msg: any)
  {
    this.alert_control.create(
      {
        header: head,
        subHeader: sub,
        message: msg,
        buttons: ['OK']
      }
    ).then(alert => alert.present());

  }

  splitDate()
  {
    this.date_format = this.start_output;
    var format1 = this.date_format.split('T')[0];
    var format2 = this.date_format.split('T')[1];
    this.date_format = format1;
    this.time_format = format2;

    var format3 = this.time_format.split('.');
    this.time_format = format3;

    var format4 = this.date_format.split('-');
    this.year = format4[0];
    this.month = format4[1];
    this.day = format4[2];

    var format5 = this.time_format.split(':');
    this.hour = format5[0];
    this.minute = format5[1];

  }

  //Late on add this method to add() method!!!!!!!!!!!!!!!!!!!!!!

  scheduleNot()
  {
    var month_temp;
    this.addEvent();

    this.splitDate();

    month_temp = this.month - 1;

    this.local_notifications.schedule(
      {
        id: 1,
        title: `${this.title_output}`,
        data: { mydata: 'My title this is'},
        trigger: { at: new Date(this.year, month_temp, this.day, this.hour, this.minute)}

      }
    )
  }

  notInSec()
  {
    this.addEvent();

    this.local_notifications.schedule(
      {
        id: 11,
        title: `${this.title_output}`,
        data: { mydata: 'My title this is'},
        trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
        
      }
    )
  }

}
