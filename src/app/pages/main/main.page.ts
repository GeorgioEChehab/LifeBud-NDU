import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { types } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit 
{
  list: any [] = []; //array to store events and display output from
  str: any = 'str'; //used to store value of list[i]
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
  remaining: number = 0; //used in wallet, to show remaining money from income
  income_str: string = '0'; //the user's income in string format
  income: number = 0; //the user's income
  money = { income: ''}; //used to add income
  money_source: any [] = []; //saves income
  types = ["property_tax_money", "mechanic_tax_money", "municipality_tax_money",
  "car_insurance_fees_money", "cable_bill_money", "internet_bill_money",
  "electricity_bill_money", "generator_bill_money", "grocery_bill_money",
  "fuel_bill_money", "water_dispenser_bill_money", "phone_bill_money",
  "heating_bill_money", "bank_fees_money", "credit_card_fees_money",
  "school_fees_money", "university_fees_money", "car_maintenance_fees_money",
  "car_periodic_maintenance_fees_money", "rent_fees_money", "veterinarian_fees_money",
  "pet_food_bill_money", "new_house_bill_money", "new_car_bill_money", "vacation_bill_money",
  "paint_house_fees_money"]; //used in compute to get amount of task
  
  //amount of task to be paid
  property_tax_money: number = 0; 
  mechanic_tax_money: number = 0; 
  municipality_tax_money: number = 0;
  car_insurance_fees_money: number = 0;
  cable_bill_money: number = 0;
  internet_bill_money: number = 0;
  electricity_bill_money: number = 0; 
  generator_bill_money: number = 0;
  grocery_bill_money: number = 0;
  fuel_bill_money: number = 0; 
  water_dispenser_bill_money: number = 0; 
  phone_bill_money: number = 0; 
  heating_bill_money: number = 0; 
  bank_fees_money: number = 0; 
  credit_card_fees_money: number = 0; 
  school_fees_money: number = 0; 
  university_fees_money: number = 0; 
  car_maintenance_fees_money: number = 0; 
  car_periodic_maintenance_fees_money: number = 0; 
  rent_fees_money: number = 0; 
  veterinarian_fees_money: number = 0; 
  pet_food_bill_money: number = 0; 
  new_car_bill_money: number = 0; 
  new_house_bill_money: number = 0; 
  vacation_bill_money: number = 0; 
  paint_house_fees_money: number = 0; 

  addIncome()
  {
    let money_copy = {income: this.money.income}

    this.income_str = this.money.income;

    this.money_source.push(money_copy);
    this.reset();

    this.data_service.setAmount('income', this.income_str);

    this.loadEvents();

  }

  getI()
  {
    this.data_service.getMoney('income');
    this.income_str = this.data_service.get_income;

    //this.data_service.getPropertyMoney('property_tax_money');
    //this.property_tax_money = this.data_service.get_property_money;

  }

  deleteP()
  {
   
    this.data_service.removeAmount('income');
    this.loadEvents();

  }

  reset()
  {
    this.money =
    {
      income: ''

    };
  }
  
  

  getMoney()
  {
    /*case "property_tax":
      this.data_service.remove(index);
      this.list.splice(index, 1);
      
      this.data_service.removeTask(this.str)
      this.local_notifications.cancel(0);
      this.loadEvents();
      break;*/
  }
  
  async computeTest()
  {
    //this.data_service.getAmount('property_money');
    console.log(this.property_tax_money);
    this.property_tax_money = this.data_service.get_output;
    console.log(this.property_tax_money);

    this.details.push(this.income_str);
    await this.data_service.addDetails(`Income= ${this.income_str}`);
    this.details.push(this.property_tax_money);
    await this.data_service.addDetails(`Property Money= ${this.property_tax_money}`);

    //this.remaining = this.income - this.property_tax_money;

    this.loadEvents();

  }

  constructor(private data_service: DataService, private router: Router, private local_notifications: LocalNotifications) 
  {
    this.loadEvents();

  }

  add() //Jumps to add page
  {
    this.router.navigate(['tabs/add'])
  }

  async loadEvents() //Method that load previous events that are saved on the memory
  {
    setInterval(async () => 
    {
      this.list = await this.data_service.getData();
      //this.autoDelete(); REMOVE COMMENT THIS LINE LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      this.getI();

      this.compute();

      if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "Enter a New Task"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'Enter a New Task'))
        this.list[0] == null; //used to remove the previous msg
      
    }, 500) //adjust time to 100 or 50 later on instead of 500!!!!!!!!!!!!!!!!!!

  }

  details: any [] = [];

  autoDelete() //Auto Deletes Events after their due date
  {
    this.date_format = new Date().toISOString();
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

  check(index: number) //Gets the time variables from the list
  {
    this.date_format = new Date().toISOString();
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

  splitDate() //converts date_format from ****-**-**T**:**:** to single variables for day, year, etc.
  {
    this.date_format = new Date().toISOString();
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

  async compute() //calculate all available amounts to be paid and outputs remaining balance
  {
    for(let i = 0; i < this.types.length; i++)
    {
      switch(this.types[i])
      {
        case "property_tax_money":
          this.data_service.getMoney('property_tax_money');
          this.property_tax_money = this.data_service.get_property_money;
          break;

        case "mechanic_tax_money":
          this.data_service.getMoney('mechanic_tax_money');
          this.mechanic_tax_money = this.data_service.get_mechanic_tax_money;
          break;
        
        case "municipality_tax_money":
          this.data_service.getMoney('municipality_tax_money');
          this.municipality_tax_money = this.data_service.get_municipality_tax_money;
          break;

        case "car_insurance_fees_money":
          this.data_service.getMoney('car_insurance_fees_money');
          this.car_insurance_fees_money = this.data_service.get_car_insurance_fees_money;
          break;

        case "cable_bill_money":
          this.data_service.getMoney('cable_bill_money');
          this.cable_bill_money = this.data_service.get_cable_bill_money;
          break;

        case "internet_bill_money":
          this.data_service.getMoney('internet_bill_money');
          this.internet_bill_money = this.data_service.get_internet_bill_money;
          break;

        case "electricity_bill_money":
          this.data_service.getMoney('electricity_bill_money');
          this.electricity_bill_money = this.data_service.get_electricity_bill_money;
          break;

        case "generator_bill_money":
          this.data_service.getMoney('generator_bill_money');
          this.generator_bill_money = this.data_service.get_generator_bill_money;
          break;

        case "grocery_bill_money":
          this.data_service.getMoney('grocery_bill_money');
          this.grocery_bill_money = this.data_service.get_grocery_bill_money;
          break;

        case "fuel_bill_money":
          this.data_service.getMoney('fuel_bill_money');
          this.fuel_bill_money = this.data_service.get_fuel_bill_money;
          break;

        case "water_dispenser_bill_money":
          this.data_service.getMoney('water_dispenser_bill_money');
          this.water_dispenser_bill_money = this.data_service.get_water_dispenser_bill_money;
          break;

        case "phone_bill_money":
          this.data_service.getMoney('phone_bill_money');
          this.phone_bill_money = this.data_service.get_phone_bill_money;
          break;

        case "heating_bill_money":
          this.data_service.getMoney('heating_bill_money');
          this.heating_bill_money = this.data_service.get_heating_bill_money;
          break;

        case "bank_fees_money":
          this.data_service.getMoney('bank_fees_money');
          this.bank_fees_money = this.data_service.get_bank_fees_money;
          break;

        case "credit_card_fees_money":
          this.data_service.getMoney('credit_card_fees_money');
          this.credit_card_fees_money = this.data_service.get_credit_card_fees_money;
          break;

        case "school_fees_money":
          this.data_service.getMoney('school_fees_money');
          this.school_fees_money = this.data_service.get_school_fees_money;
          break;

        case "university_fees_money":
          this.data_service.getMoney('university_fees_money');
          this.university_fees_money = this.data_service.get_university_fees_money;
          break;

        case "car_maintenance_fees_money":
          this.data_service.getMoney('car_maintenance_fees_money');
          this.car_maintenance_fees_money = this.data_service.get_car_maintenance_fees_money;
          break;

        case "car_periodic_maintenance_fees_money":
          this.data_service.getMoney('car_periodic_maintenance_fees_money');
          this.car_periodic_maintenance_fees_money = this.data_service.get_car_periodic_maintenance_fees_money;
          break;

        case "rent_fees_money":
          this.data_service.getMoney('rent_fees_money');
          this.rent_fees_money = this.data_service.get_rent_fees_money;
          break;

        case "veterinarian_fees_money":
          this.data_service.getMoney('veterinarian_fees_money');
          this.veterinarian_fees_money = this.data_service.get_veterinarian_fees_money;
          break;

        case "pet_food_bill_money":
          this.data_service.getMoney('pet_food_bill_money');
          this.pet_food_bill_money = this.data_service.get_pet_food_bill_money;
          break;

        case "new_house_bill_money":
          this.data_service.getMoney('new_house_bill_money');
          this.new_house_bill_money = this.data_service.get_new_house_bill_money;
          break;

        case "new_car_bill_money":
          this.data_service.getMoney('new_car_bill_money');
          this.new_car_bill_money = this.data_service.get_new_car_bill_money;
          break;

        case "vacation_bill_money":
          this.data_service.getMoney('vacation_bill_money');
          this.vacation_bill_money = this.data_service.get_vacation_bill_money;
          break;

        case "paint_house_fees_money":
          this.data_service.getMoney('paint_house_fees_money');
          this.paint_house_fees_money = this.data_service.get_paint_house_fees_money;
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
        this.remaining = this.income - (this.property_tax_money + this.mechanic_tax_money +
                                        this.municipality_tax_money + this.car_insurance_fees_money +
                                        this.cable_bill_money + this.internet_bill_money +
                                        this.electricity_bill_money + this.generator_bill_money +
                                        this.grocery_bill_money + this.fuel_bill_money +
                                        this.water_dispenser_bill_money + this.phone_bill_money +
                                        this.heating_bill_money + this.bank_fees_money +
                                        this.credit_card_fees_money + this.school_fees_money +
                                        this.university_fees_money + this.car_maintenance_fees_money +
                                        this.car_periodic_maintenance_fees_money + this.rent_fees_money +
                                        this.veterinarian_fees_money +  this.pet_food_bill_money +
                                        this.new_house_bill_money + this.new_car_bill_money +
                                        this.vacation_bill_money + this.paint_house_fees_money);
      }
  }

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
        this.data_service.removeAmount('property_tax_money');
        this.local_notifications.cancel(0);
        this.loadEvents();
        break;

      case "mechanic_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('mechanic_tax_money');
        this.local_notifications.cancel(5);
        this.loadEvents();
        break;

      case "municipality_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('municipality_tax_money');
        this.local_notifications.cancel(10);
        this.loadEvents();
        break;

      case "car_insurance":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('car_insurance_fees_money');
        this.local_notifications.cancel(15);
        this.loadEvents();
        break;

      case "cable_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('cable_bill_money');
        this.local_notifications.cancel(20);
        this.loadEvents();
        break;

      case "internet_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('internet_bill_money');
        this.local_notifications.cancel(25);
        this.loadEvents();
        break;

      case "electricity_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('electricity_bill_money');
        this.local_notifications.cancel(30);
        this.loadEvents();
        break;

      case "generator_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('generator_bill_money');
        this.local_notifications.cancel(35);
        this.loadEvents();
        break;

      case "grocery_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('grocery_bill_money');
        this.local_notifications.cancel(40);
        this.loadEvents();
        break;

      case "fuel_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('fuel_bill_money');
        this.local_notifications.cancel(45);
        this.loadEvents();
        break;
      
      case "water_dispenser_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('water_dispenser_bill_money');
        this.local_notifications.cancel(50);
        this.loadEvents();
        break;

      case "phone_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('phone_bill_money');
        this.local_notifications.cancel(55);
        this.loadEvents();
        break;

      case "heating_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('heating_bill_money');
        this.local_notifications.cancel(60);
        this.loadEvents();
        break;

      case "bank_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('bank_fees_money');
        this.local_notifications.cancel(65);
        this.loadEvents();
        break;

      case "credit_card_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('credit_card_fees_money');
        this.local_notifications.cancel(70);
        this.loadEvents();
        break;

      case "school_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('school_fees_money');
        this.local_notifications.cancel(75);
        this.loadEvents();
        break;

      case "university_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('university_fees_money');
        this.local_notifications.cancel(80);
        this.loadEvents();
        break;

      case "car_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('car_maintenance_bill_money');
        this.local_notifications.cancel(85);
        this.loadEvents();
        break;

      case "car_periodic_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('car_periodic_maintenance_money');
        this.local_notifications.cancel(90);
        this.loadEvents();
        break;

      case "rent_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('rent_fees_money');
        this.local_notifications.cancel(95);
        this.loadEvents();
        break;

      case "veterinarian_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('veterianrian_fees_money');
        this.local_notifications.cancel(100);
        this.loadEvents();
        break;

      case "pet_food_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('pet_food_bill_money');
        this.local_notifications.cancel(105);
        this.loadEvents();
        break;

      case "new_house_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('new_house_bill_money');
        this.local_notifications.cancel(110);
        this.loadEvents();
        break;

      case "new_car_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('new_car_bill_money');
        this.local_notifications.cancel(115);
        this.loadEvents();
        break;

      case "vacation_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('vacation_bill_money');
        this.local_notifications.cancel(120);
        this.loadEvents();
        break;

      case "paint_house_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.data_service.removeAmount('paint_house_fees_money');
        this.local_notifications.cancel(125);
        this.loadEvents();
        break;
        
    }
  }

  ngOnInit() 
  {

  }

}
