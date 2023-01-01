import { Component, ViewChild, OnInit, ProviderToken} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

import { IonicSelectableModule } from '@ionic-selectable/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit
{
  date_format: any; //convert output from YYYY-MMDDTHH:mm to YYYY-MM-DD
  time_format: any; //convert output from YYYY-MMDDTHH:mm to HH:mm
  year: any; //year from date_format and used for output
  month: any; //month from date_format and used for output
  day: any; //day from date_format and used for output
  hour: any; //hour from time_format and used for output
  minute: any; //minute from dateformat and used for output
  list: any [] = []; //array to store events and display output from
  title_output: string; //title to be used in output
  start_output: any; //start time to be used in output
  date = new Date(); //gets today's date and used later for ion-datetime
  start: string = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString(); //convert date format
  start_minus_one : any; //equal to start time minus 1 minute
  event_source: any [] = []; //array where event will first be saved
  event = { title: '', start: ''};
  backup: any [] = []; //array serves as backup for list

  //id for the tasks
  property_tax_id: number = 0;
  mechanic_tax_id: number = 5;
  municipality_id: number = 10;
  car_insurance_id: number = 15;
  cable_fees_id: number = 20;
  internet_fees_id: number = 25;
  electricity_fees_id: number = 30;
  generator_id: number = 35;
  grocery_id: number = 40;
  fuel_id: number = 45;
  water_dispenser_id: number = 50;
  phone_bill_id: number = 55;
  heating_id: number = 60;
  bank_fees_id: number = 65;
  credit_card_fees_id: number = 70;
  school_university_fees_id: number = 75;
  car_maintenance_id: number = 80;
  car_periodic_maintenance_id: number = 85;
  rent_fees_id: number = 90;
  pet_veterinarians_fees_id: number = 95;
  pet_food_fees_id: number = 100;
  new_car_fees_id: number = 105;
  new_house_fees_id: number = 110;
  vacation_fees_id: number = 115;
  paint_house_fees_id: number = 120;
  other_id: number = 125;


  //Finished Code
  constructor(private data_service: DataService, private alert_controller: AlertController,
              private local_notifications: LocalNotifications, private plt: Platform)
  {
    this.loadEvents();

    this.plt.ready().then(() => {
      this.local_notifications.on('click').subscribe(res => {
        console.log('click: ', res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);

      });

      this.local_notifications.on('trigger').subscribe(res => {
        console.log('trigger: ', res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);

      });

    });


  }

  async loadEvents() //method that load previous events that are saved on the memory
  {
    this.list = await this.data_service.getData();
    this.backup = await this.data_service.getDataBackup();
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
        start: this.start,

      }

      this.title_output = this.event.title;
      this.start_output = this.start;

      this.event_source.push(event_copy);
      this.resetEvent();

    }
    else
      if(this.start < this.start_minus_one)
      {
        this.alert_controller.create(
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
                                ${this.month}- ${this.year} -${this.hour}-${this.minute}`);
    await this.data_service.addDataBackup(`Event Name: ${this.title_output} on: ${this.day}-
                                ${this.month}- ${this.year} -${this.hour}-${this.minute}`);
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
    this.alert_controller.create(
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

    var format3 = this.time_format.split('.')[0];
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
        text: 'bla bla bla',
        data: { mydata: 'My title this is'},
        trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND}

      }
    )
  }


}
