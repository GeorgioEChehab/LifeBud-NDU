import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit 
{
  list: any [] = [];
  str: any = 'str';

  constructor(private data_service: DataService, private router: Router, private local_notifications: LocalNotifications) 
  {
    this.loadEvents();

  }

  add() //Jumps to add page
  {
    this.router.navigate(['tabs/add'])
  }

  async loadEvents() //method that load previous events that are saved on the memory
  {
    //this.data_service.getType('property_task');

    setInterval(async () => 
    {
      this.list = await this.data_service.getData();

      //this.calculate();


      if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "Enter a New Reminder"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'Enter a New Reminder'))
        this.list[0] == null; //used to remove the previous msg
      
    }, 1000)

  }

  test1: string = 'test1';
  test()
  {
    this.test1 = new Date().toISOString();

    this.splitDate();

  }

  output1: string = 'output1';
  output2: string = 'output2';
  output3: string = 'output3';
  output4: string = 'output4';
  output5: string = 'output5';
  output6: string = 'output6';
  output7: string = 'output7';
  output8: string = 'output8';
  output9: string = 'output9';
  output10: string = 'output10';
  check(index: number)
  {
    this.test();

    this.output1 = this.list[index];

    var format1 = this.output1.split(' ')[0];
    var format2 = this.output1.split(' ')[1];
    var format3 = this.output1.split(' ')[2];
    var format4 = this.output1.split(' ')[3];
    var format5 = this.output1.split(' ')[4];
    var format6 = this.output1.split(' ')[5];
    var format7 = this.output1.split(' ')[6];
    var format8 = this.output1.split(' ')[7];
    var format9 = this.output1.split(' ')[8];
    var format10 = this.output1.split(' ')[9];


    this.output1 = format1;
    this.output2 = format2;
    this.output3 = format3;
    this.output4 = format4;
    this.output5 = format5;
    this.output6 = format6;
    this.output7 = format7;
    this.output8 = format8;
    this.output9 = format9;
    this.output10 = format10;

  }

  calculate()
  {
    console.log('START0');
    this.test1 = new Date().toISOString();
    console.log('START1');
    this.splitDate();
    console.log('START2');
    if(this.list[0] != 'Enter a New Reminder')
    {
      console.log('START3');
      for(let i = 0; i+1 != null; i++)
      {
        console.log('START4');
        this.check(i);
        console.log('START5');
        if(this.output10 < this.minute)
          {
            console.log('START6');
            this.deleteEvent(i);
            console.log('START7');
          }
      }
    }
  }

  date_format: any;
  time_format: any;
  year: any;
  month: any;
  day: any;
  hour: any;
  minute: any;



  splitDate()
  {
    this.date_format = this.test1;
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

  async deleteEvent(index: number)
  {
    this.str = this.list[index];

    var format = this.str.split(' ')[1];
    this.str = format;

    switch(this.str)
    {
      case "property_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        
        this.data_service.removeTask(this.str)
        this.local_notifications.cancel(0);
        this.loadEvents();
        break;

      case "mechanic_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(5);
        this.loadEvents();
        break;

      case "municipality_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(10);
        this.loadEvents();
        break;

      case "car_insurance":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(15);
        this.loadEvents();
        break;

      case "cable_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(20);
        this.loadEvents();
        break;

      case "internet_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(25);
        this.loadEvents();
        break;

      case "electricity_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(30);
        this.loadEvents();
        break;

      case "generator_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(35);
        this.loadEvents();
        break;

      case "grocery_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(40);
        this.loadEvents();
        break;

      case "fuel_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(45);
        this.loadEvents();
        break;
      
      case "water_dispenser_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(50);
        this.loadEvents();
        break;

      case "phone_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(55);
        this.loadEvents();
        break;

      case "heating_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(60);
        this.loadEvents();
        break;

      case "bank_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(65);
        this.loadEvents();
        break;

      case "credit_card_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(70);
        this.loadEvents();
        break;

      case "education":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(75);
        this.loadEvents();
        break;

      case "car_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(80);
        this.loadEvents();
        break;

      case "car_periodic_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(85);
        this.loadEvents();
        break;

      case "rent_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(90);
        this.loadEvents();
        break;

      case "veterinarian_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(95);
        this.loadEvents();
        break;

      case "pet_food_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(100);
        this.loadEvents();
        break;

      case "new_house_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(105);
        this.loadEvents();
        break;

      case "new_car_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(110);
        this.loadEvents();
        break;

      case "paint_house_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(115);
        this.loadEvents();
        break;

      case "vacation_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.local_notifications.cancel(120);
        this.loadEvents();
        break;
        
    }
  }

  ngOnInit() 
  {

  }

}
