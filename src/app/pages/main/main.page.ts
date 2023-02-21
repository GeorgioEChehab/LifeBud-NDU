import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { types } from 'util';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit 
{
  list: any [] = []; //array to store events and display output from
  str: any = 'str'; //used to store value of list[i]
  date: any; //gets today's date and used later for ion-datetime
  start: string; //convert date format
  date_format: any; //convert output from YYYY-MMDDTHH:mm to YYYY-MM-DD
  time_format: any; //convert output from YYYY-MMDDTHH:mm to HH:mm
  year: any; //year from date_format and used for output
  month: any; //month from date_format and used for output
  day: any; //day from date_format and used for output
  hour: any; //hour from time_format and used for output
  minute: any; //minute from time_format and used for output
  day_list: string = 'day_list'; //day of list[i]
  month_list: string = 'month_list'; //month of list[i]
  year_list: string = 'year_list'; //year of list[i]
  hour_list: string = 'hour_list'; //hour of list[i]
  minute_list: string = 'minute_list'; //minute of list[i]
  remaining: number = 0; //used in wallet, to show remaining amount from income
  income_str: string = '0'; //the user's income in string format
  income: number = 0; //the user's income
  amount = { income: ''}; //used to add income
  amount_source: any [] = []; //saves income
  types = ["property_tax_amount", "mechanic_tax_amount", "municipality_tax_amount",
  "car_insurance_fees_amount", "cable_bill_amount", "internet_bill_amount",
  "electricity_bill_amount", "generator_bill_amount", "grocery_bill_amount",
  "fuel_bill_amount", "water_dispenser_bill_amount", "phone_bill_amount",
  "heating_bill_amount", "bank_fees_amount", "credit_card_fees_amount",
  "school_fees_amount", "university_fees_amount", "car_maintenance_fees_amount",
  "car_periodic_maintenance_fees_amount", "rent_fees_amount", "veterinarian_fees_amount",
  "pet_food_bill_amount", "new_house_bill_amount", "new_car_bill_amount", "vacation_bill_amount",
  "paint_house_fees_amount"]; //used in compute to get amount of task
  
  //amount of task to be paid
  property_tax_amount: number = 0; 
  mechanic_tax_amount: number = 0; 
  municipality_tax_amount: number = 0;
  car_insurance_fees_amount: number = 0;
  cable_bill_amount: number = 0;
  internet_bill_amount: number = 0;
  electricity_bill_amount: number = 0; 
  generator_bill_amount: number = 0;
  grocery_bill_amount: number = 0;
  fuel_bill_amount: number = 0; 
  water_dispenser_bill_amount: number = 0; 
  phone_bill_amount: number = 0; 
  heating_bill_amount: number = 0; 
  bank_fees_amount: number = 0; 
  credit_card_fees_amount: number = 0; 
  school_fees_amount: number = 0; 
  university_fees_amount: number = 0; 
  car_maintenance_fees_amount: number = 0; 
  car_periodic_maintenance_fees_amount: number = 0; 
  rent_fees_amount: number = 0; 
  veterinarian_fees_amount: number = 0; 
  pet_food_bill_amount: number = 0; 
  new_car_bill_amount: number = 0; 
  new_house_bill_amount: number = 0; 
  vacation_bill_amount: number = 0; 
  paint_house_fees_amount: number = 0; 

  output_property: boolean = false;
  output_repeat: string = 'output_repeat';
  output_type: string = 'output_get';
  output_title: string = 'output_title';
  output_amount: number = -99;
  o: string = 'o';
  flag: boolean = false;

  property_postpone: boolean = false;
  mechanic_postpone: boolean = false;
  municipality_postpone: boolean = false;
  temp_amount: number;


  hide()
  {
    this.splitDate();
    for(let i = 0; i < this.list.length; i++)
    {
      this.check(i);
      if(this.day_list > this.day)
      {
        this.getType(i);
        this.getAddition(i);
        if(this.type == 'property_tax')
        {
          this.property_postpone = true;
        }
        else
          if(this.type == 'mechanic_tax')
          {
            this.mechanic_postpone = true;
          }
      }
      else
        if(this.day_list <= this.day)
        {
          this.getType(i);
          this.getAddition(i);
        if(this.type == 'property_tax')
        {
          this.property_postpone = false;
        }
        else
          if(this.type == 'mechanic_tax')
          {
            this.mechanic_postpone = false;
          }
        }
    }
  }

 
  hide2()
  {
    this.splitDate();
    for(let i = 0; i < this.list.length; i++)
    {
      this.check(i);
      if(this.day_list > this.day)
      {
        this.getType(i);
        this.getAddition(i);
        if(this.type == 'property_tax')
        {
          this.property_postpone = true;
        }
        else
          if(this.type == 'mechanic_tax')
          {
            this.mechanic_postpone = true;
          }
      }
     
      if(this.minute_list > this.minute)
      {
        this.getType(i);
        this.getAddition(i);
        if(this.type == 'municipality_tax')
        {
          //console.log('1')
          this.municipality_postpone = false;
        } 
      }
      else
        if(this.minute_list <= this.minute)
        {
          this.getType(i);
          this.getAddition(i);
          if(this.type == 'municipality_tax')
          {
            
            //console.log('2');
            this.municipality_postpone = true;
            //console.log(this.municipality_postpone);
          }
            
        }
    }}

    
  //----
  ptest: number = 0;
  mtest: number = 0;
  mutest: number = 0;
  remaining2: number = 0;
  async calculate() //calculate all available amounts to be paid and outputs remaining balance
  {
    this.hide2();
    this.data_service.getAmount('remaining2');
    this.remaining2 = this.data_service.remaining2;
    for(let i = 0; i < this.types.length; i++)
    {
      switch(this.types[i])
      {
        case "property_tax_amount":
        this.data_service.getAmount('property_tax_amount');
        if(this.property_postpone == false)
          this.ptest = this.data_service.get_property_tax_amount;
        break;

        case "mechanic_tax_amount":
          this.data_service.getAmount('mechanic_tax_amount');
          if(this.mechanic_postpone == false)
            this.mtest = this.data_service.get_mechanic_tax_amount;
          break;
        
        case "municipality_tax_amount":
          this.data_service.getAmount('municipality_tax_amount');
          if(this.municipality_postpone == false)
            this.mutest = this.data_service.get_municipality_tax_amount;
      }

          this.income = parseFloat(this.income_str); //parseFloat is to convert from string to number
          if(this.income <= 0)
          {
            this.remaining = 0;
      
          }
          else
            if(this.income > 0)
            {
              this.remaining2 = this.income - (this.ptest + this.mtest + this.mutest);
              this.data_service.removeAmount('remaining2');
              this.data_service.setAmount('remaining2', this.remaining2);
            }
          }
  }

  type: string = 'type';
  getType(index: number) //gets event's type
  {
    this.type = this.list[index];

    var format1 = this.type.split(' ')[2];
    this.type = format1;
  }

  addition: any = 0;
  getAddition(index: number)
  {
    this.addition = this.list[index];
    
    var format1 = this.addition.split(' ')[16];
    this.addition = format1;

  }

  pp()
  {
    console.log(this.type);
    this.getType(1);
    console.log(this.mechanic_postpone);
    /*console.log(this.start);
    console.log(this.hour);
    this.splitDate();
    console.log(this.hour);*/

  }

 

  test()
  {
    this.date_format = new Date().toISOString();
    this.splitDate();
    if(this.list[0] != 'Enter a New Reminder')
    {
      for(let i = 0; i < this.list.length; i++)
      {
        this.check(i);
        this.output_property = this.data_service.property_tax_repeat;
        if(this.output_property == false)
        {
          if(this.minute_list < this.minute)
            this.deleteEvent(i);
        }
        else
          if(this.output_property == true)
          {
            this.output_repeat = this.data_service.repeat;
            if((this.minute_list < this.minute) && (this.output_repeat == 'daily'))
            {
              this.getT2(i);
              this.deleteEvent(i);
              if(this.output_type == 'property_tax')
              {
                this.data_service.removeRepeat('repeat');
                this.data_service.removeRepeat('property_tax_repeat');
                this.property_repeat = 1;
              }
              else
                if(this.output_type == 'mechanic_tax')
                {
                  this.data_service.removeRepeat('repeat');
                  this.data_service.removeRepeat('mechanic_tax_repeat');
                  this.mechanic_repeat = 1;
                }
              
              //this.data_service.removeRepeat('mechanic_tax_repeat');
              //this.addTest(this.output_type, 0, this.output_amount, 'property_tax_amount');

            }
            
          }
      }
    }
  } 

  property_repeat: number = 0;
  mechanic_repeat: number = 0;
  testA()
  {
    if(this.property_repeat == 1)
    {
      this.addTest('property_tax', 0, this.output_amount, 'property_tax_amount');
      this.property_repeat = 0;
      console.log(this.output_title);
      this.output_title = 'output_title';
      console.log(this.output_title);

    }
    else
      if(this.mechanic_repeat == 1)
      {
        this.addTest('mechanic_tax', 0, this.output_amount, 'mechanic_tax_amount');
        this.mechanic_repeat = 0;
      }
  }

  property_tax_title: string = 'property_tax_title';
  mechanic_tax_title: string = 'mechanic_tax_title';
  getT2(index: number)
  {
    this.output_type = this.list[index];
    var format1 = this.output_type.split(' ')[2];
    this.output_type = format1;

    this.output_title = this.list[index];
    var format1 = this.output_title.split(' ')[14];
    this.output_title = format1;
    if(this.output_type == 'property_tax')
    {
      this.property_tax_title = this.output_title;

    }
    else
      if(this.output_type == 'mechanic_tax')
      {
        this.mechanic_tax_title = this.output_title;

      }

    this.o = this.list[index];
    var format1 = this.o.split(' ')[16];
    var format2 = parseFloat(format1);
    this.output_amount = format2;
    if(this.output_type == 'property_tax')
    {
      //this.property_tax_amount2 = this.output_amount;
      this.output_amount = -99;

    }
    else
      if(this.output_type == 'mechanic_tax')
      {
        //this.mechanic_tax_amount2 = this.output_amount;
        this.output_amount == -99;

      }
  }


  async addTest(event: string, id: number, money: any, money_type: string) //add mehtod with notification in seconds
  {
    var minute_temp = parseInt(this.minute_list);
    minute_temp += 1;
    await this.data_service.add(`Task Type: ${event} Date: ${this.day_list} - ${this.month_list} - ${this.year_list} - ${this.hour_list} - ${minute_temp} Title: ${this.output_title} Amount: ${this.output_amount}`);
    //await this.data_service.addDataBackup(`Task Type: ${event} Date: ${this.day} - ${this.month} - ${this.year} - ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output}`);

    

    this.data_service.setTask(event, 'true');
    this.data_service.setAmount(money_type, money);

    this.data_service.setRepeat('repeat', this.output_repeat);
    if(event == 'property_tax')
      this.data_service.setRepeat('property_tax_repeat', true);
    else
      if(event == 'mechanic_tax')
      this.data_service.setRepeat('mechanic_tax_repeat', true);

    //this.loadEvents();

  }

  //START constructor(...)
  constructor(private data_service: DataService, private router: Router,
              private local_notifications: LocalNotifications, private loading_controller: LoadingController) 
  {
    this.loadEvents();

  }
  //END constructor(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START add()
  add() //Jumps to add page
  {
    this.router.navigate(['tabs/add'])
  }
  //END add()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START loadEvents()
  dd: any = 321456987;
  ss: any = 789654123;
  pT()
    {
      console.log(this.dd);
      this.dd = new Date();
      console.log(this.dd);
      console.log('------------------------------------------')
      console.log(this.ss);
      this.ss = new Date(this.dd.getTime() - this.dd.getTimezoneOffset() * 60000).toISOString();
      //console.log(this.ss);
      this.splitDate();
      var temp = '29'
      if(temp <= this.minute)
        console.log();
      else
        if(temp > this.minute)
        {
          console.log('2');
          console.log(this.minute);
        }
          
    }
  async loadEvents() //Method that load previous events that are saved on the memory
  {
    this.loadScreen();
    
    setInterval(async () => 
    {
      this.list = await this.data_service.getData();
      //this.autoDelete(); REMOVE COMMENT THIS LINE LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      this.getIncome();
      this.compute();

      //this.deleteT();
      this.hide();
      this.hide2();
      this.calculate();

      //this.pT();

      this.data_service.getRepeat('property_tax_repeat');
      this.data_service.getRepeat('repeat');

      if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "Enter a New Task"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'Enter a New Task'))
        this.list[0] == null; //used to remove the previous msg
      
    }, 500) //adjust time to 100 or 50 later on instead of 500!!!!!!!!!!!!!!!!!!

  }
  //END loadEvents()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START loadScreen()
  async loadScreen() 
  {
    const loading = await this.loading_controller.create(
      {
        message: 'Please Wait...',
        spinner: 'crescent',
        cssClass: 'loading-screen',
        duration: 500
      });

    loading.present();
  }
  //END loadScreen

  //--------------------------------------------------------------------------------------------------------------------------------

  //START autoDelete()
  autoDelete() //Auto Deletes Events after their due date
  {
    this.date = new Date();
    this.date_format = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();;
    this.splitDate();
    if(this.list[0] != 'Enter a New Reminder')
    {
      for(let i = 0; i < this.list.length; i++)
      {
        this.check(i);
        if((this.day_list < this.day) && (this.month_list <= this.month) && (this.year_list <= this.year))
          this.deleteEvent(i);

      }
    }
  }
  //END autoDelete()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START check(...)
  check(index: number) //Gets the time variables from the list
  {
    this.date = new Date();
    this.date_format = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();;
    this.splitDate();

    this.str = this.list[index];

    var format1 = this.str.split(' ')[4];
    var format2 = this.str.split(' ')[6];
    var format3 = this.str.split(' ')[8];
    var format4 = this.str.split(' ')[10];
    var format5 = this.str.split(' ')[12];


    this.day_list = format1;
    this.month_list = format2;
    this.year_list = format3;
    this.hour_list = format4;
    this.minute_list = format5;

  }
  //END check(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START splitDate()
  
  splitDate() //converts date_format from ****-**-**T**:**:** to single variables for day, year, etc.
  {
    this.date = new Date()
    this.date_format = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();;
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
  //END splitDate()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getIncome()
  getIncome() //check if income has a value > 0
  {
    this.data_service.getAmount('income');
    this.income_str = this.data_service.get_income;

  }
  //END getIncome()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START compute()
  async compute() //calculate all available amounts to be paid and outputs remaining balance
  {
    for(let i = 0; i < this.types.length; i++)
    {
      switch(this.types[i])
      {
        case "property_tax_amount":
        this.data_service.getAmount('property_tax_amount');
        this.property_tax_amount = this.data_service.get_property_tax_amount
        break;

        case "mechanic_tax_amount":
          this.data_service.getAmount('mechanic_tax_amount');
          this.mechanic_tax_amount = this.data_service.get_mechanic_tax_amount;
          break;
        
        case "municipality_tax_amount":
          this.data_service.getAmount('municipality_tax_amount');
          this.municipality_tax_amount = this.data_service.get_municipality_tax_amount;
          break;

        case "car_insurance_fees_amount":
          this.data_service.getAmount('car_insurance_fees_amount');
          this.car_insurance_fees_amount = this.data_service.get_car_insurance_fees_amount;
          break;

        case "cable_bill_amount":
          this.data_service.getAmount('cable_bill_amount');
          this.cable_bill_amount = this.data_service.get_cable_bill_amount;
          break;

        case "internet_bill_amount":
          this.data_service.getAmount('internet_bill_amount');
          this.internet_bill_amount = this.data_service.get_internet_bill_amount;
          break;

        case "electricity_bill_amount":
          this.data_service.getAmount('electricity_bill_amount');
          this.electricity_bill_amount = this.data_service.get_electricity_bill_amount;
          break;

        case "generator_bill_amount":
          this.data_service.getAmount('generator_bill_amount');
          this.generator_bill_amount = this.data_service.get_generator_bill_amount;
          break;

        case "grocery_bill_amount":
          this.data_service.getAmount('grocery_bill_amount');
          this.grocery_bill_amount = this.data_service.get_grocery_bill_amount;
          break;

        case "fuel_bill_amount":
          this.data_service.getAmount('fuel_bill_amount');
          this.fuel_bill_amount = this.data_service.get_fuel_bill_amount;
          break;

        case "water_dispenser_bill_amount":
          this.data_service.getAmount('water_dispenser_bill_amount');
          this.water_dispenser_bill_amount = this.data_service.get_water_dispenser_bill_amount;
          break;

        case "phone_bill_amount":
          this.data_service.getAmount('phone_bill_amount');
          this.phone_bill_amount = this.data_service.get_phone_bill_amount;
          break;

        case "heating_bill_amount":
          this.data_service.getAmount('heating_bill_amount');
          this.heating_bill_amount = this.data_service.get_heating_bill_amount;
          break;

        case "bank_fees_amount":
          this.data_service.getAmount('bank_fees_amount');
          this.bank_fees_amount = this.data_service.get_bank_fees_amount;
          break;

        case "credit_card_fees_amount":
          this.data_service.getAmount('credit_card_fees_amount');
          this.credit_card_fees_amount = this.data_service.get_credit_card_fees_amount;
          break;

        case "school_fees_amount":
          this.data_service.getAmount('school_fees_amount');
          this.school_fees_amount = this.data_service.get_school_fees_amount;
          break;

        case "university_fees_amount":
          this.data_service.getAmount('university_fees_amount');
          this.university_fees_amount = this.data_service.get_university_fees_amount;
          break;

        case "car_maintenance_fees_amount":
          this.data_service.getAmount('car_maintenance_fees_amount');
          this.car_maintenance_fees_amount = this.data_service.get_car_maintenance_fees_amount;
          break;

        case "car_periodic_maintenance_fees_amount":
          this.data_service.getAmount('car_periodic_maintenance_fees_amount');
          this.car_periodic_maintenance_fees_amount = this.data_service.get_car_periodic_maintenance_fees_amount;
          break;

        case "rent_fees_amount":
          this.data_service.getAmount('rent_fees_amount');
          this.rent_fees_amount = this.data_service.get_rent_fees_amount;
          break;

        case "veterinarian_fees_amount":
          this.data_service.getAmount('veterinarian_fees_amount');
          this.veterinarian_fees_amount = this.data_service.get_veterinarian_fees_amount;
          break;

        case "pet_food_bill_amount":
          this.data_service.getAmount('pet_food_bill_amount');
          this.pet_food_bill_amount = this.data_service.get_pet_food_bill_amount;
          break;

        case "new_house_bill_amount":
          this.data_service.getAmount('new_house_bill_amount');
          this.new_house_bill_amount = this.data_service.get_new_house_bill_amount;
          break;

        case "new_car_bill_amount":
          this.data_service.getAmount('new_car_bill_amount');
          this.new_car_bill_amount = this.data_service.get_new_car_bill_amount;
          break;

        case "vacation_bill_amount":
          this.data_service.getAmount('vacation_bill_amount');
          this.vacation_bill_amount = this.data_service.get_vacation_bill_amount;
          break;

        case "paint_house_fees_amount":
          this.data_service.getAmount('paint_house_fees_amount');
          this.paint_house_fees_amount = this.data_service.get_paint_house_fees_amount;
          break;

      } 
    }

    this.income = parseFloat(this.income_str); //parseFloat is to convert from string to number
    if(this.income <= 0)
    {
      this.remaining = 0;

    }
    else
      if(this.income > 0)
      {
        this.remaining = this.income - (this.property_tax_amount + this.mechanic_tax_amount +
                                        this.municipality_tax_amount + this.car_insurance_fees_amount +
                                        this.cable_bill_amount + this.internet_bill_amount +
                                        this.electricity_bill_amount + this.generator_bill_amount +
                                        this.grocery_bill_amount + this.fuel_bill_amount +
                                        this.water_dispenser_bill_amount + this.phone_bill_amount +
                                        this.heating_bill_amount + this.bank_fees_amount +
                                        this.credit_card_fees_amount + this.school_fees_amount +
                                        this.university_fees_amount + this.car_maintenance_fees_amount +
                                        this.car_periodic_maintenance_fees_amount + this.rent_fees_amount +
                                        this.veterinarian_fees_amount +  this.pet_food_bill_amount +
                                        this.new_house_bill_amount + this.new_car_bill_amount +
                                        this.vacation_bill_amount + this.paint_house_fees_amount);
      }
  }
  //END compute()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START deleteEvent(...)
  async deleteEvent(index: number) //Deletes event from my tasks
  {
    this.str = this.list[index];

    var format = this.str.split(' ')[2];
    this.str = format;

    switch(this.str)
    {
      case "property_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('property_tax_amount');
        this.local_notifications.cancel(0);
        this.loadEvents();
        break;

      case "mechanic_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('mechanic_tax_amount');
        this.local_notifications.cancel(5);
        this.loadEvents();
        break;

      case "municipality_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('municipality_tax_amount');
        this.local_notifications.cancel(10);
        this.loadEvents();
        break;

      case "car_insurance":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('car_insurance_fees_amount');
        this.local_notifications.cancel(15);
        this.loadEvents();
        break;

      case "cable_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('cable_bill_amount');
        this.local_notifications.cancel(20);
        this.loadEvents();
        break;

      case "internet_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('internet_bill_amount');
        this.local_notifications.cancel(25);
        this.loadEvents();
        break;

      case "electricity_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('electricity_bill_amount');
        this.local_notifications.cancel(30);
        this.loadEvents();
        break;

      case "generator_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('generator_bill_amount');
        this.local_notifications.cancel(35);
        this.loadEvents();
        break;

      case "grocery_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('grocery_bill_amount');
        this.local_notifications.cancel(40);
        this.loadEvents();
        break;

      case "fuel_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('fuel_bill_amount');
        this.local_notifications.cancel(45);
        this.loadEvents();
        break;
      
      case "water_dispenser_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('water_dispenser_bill_amount');
        this.local_notifications.cancel(50);
        this.loadEvents();
        break;

      case "phone_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('phone_bill_amount');
        this.local_notifications.cancel(55);
        this.loadEvents();
        break;

      case "heating_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('heating_bill_amount');
        this.local_notifications.cancel(60);
        this.loadEvents();
        break;

      case "bank_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('bank_fees_amount');
        this.local_notifications.cancel(65);
        this.loadEvents();
        break;

      case "credit_card_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('credit_card_fees_amount');
        this.local_notifications.cancel(70);
        this.loadEvents();
        break;

      case "school_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('school_fees_amount');
        this.local_notifications.cancel(75);
        this.loadEvents();
        break;

      case "university_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('university_fees_amount');
        this.local_notifications.cancel(80);
        this.loadEvents();
        break;

      case "car_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('car_maintenance_bill_amount');
        this.local_notifications.cancel(85);
        this.loadEvents();
        break;

      case "car_periodic_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('car_periodic_maintenance_amount');
        this.local_notifications.cancel(90);
        this.loadEvents();
        break;

      case "rent_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('rent_fees_amount');
        this.local_notifications.cancel(95);
        this.loadEvents();
        break;

      case "veterinarian_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('veterianrian_fees_amount');
        this.local_notifications.cancel(100);
        this.loadEvents();
        break;

      case "pet_food_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('pet_food_bill_amount');
        this.local_notifications.cancel(105);
        this.loadEvents();
        break;

      case "new_house_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('new_house_bill_amount');
        this.local_notifications.cancel(110);
        this.loadEvents();
        break;

      case "new_car_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('new_car_bill_amount');
        this.local_notifications.cancel(115);
        this.loadEvents();
        break;

      case "vacation_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('vacation_bill_amount');
        this.local_notifications.cancel(120);
        this.loadEvents();
        break;

      case "paint_house_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('paint_house_fees_amount');
        this.local_notifications.cancel(125);
        this.loadEvents();
        break;
        
    }
  }
  //END deleteEvent(...)

  ngOnInit() 
  {

  }

}
