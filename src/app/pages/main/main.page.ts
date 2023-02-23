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
  month_list: number = 0; //month of list[i]
  year_list: string = 'year_list'; //year of list[i]
  hour_list: string = 'hour_list'; //hour of list[i]
  minute_list: string = 'minute_list'; //minute of list[i]
  remaining: number = 0; //used in wallet, to show remaining amount from income
  remaining_second_month: number = 0; // used in wallet 2
  income_str: string = '0'; //the user's income in string format
  income: number = 0; //the user's income
  amount = { income: ''}; //used to add income
  amount_source: any [] = []; //saves income
  month_plus_1: number = 0; //Current month + 1
  month_plus_2: number = 0; //Current month + 2
  year_plus_1: number = 0; //Current year + 1
  
  //amount of task to be paid this month
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

  //amount of task to be paid the following month
  property_tax_amount_2: number = 0; 
  mechanic_tax_amount_2: number = 0; 
  municipality_tax_amount_2: number = 0;
  car_insurance_fees_amount_2: number = 0;
  cable_bill_amount_2: number = 0;
  internet_bill_amount_2: number = 0;
  electricity_bill_amount_2: number = 0; 
  generator_bill_amount_2: number = 0;
  grocery_bill_amount_2: number = 0;
  fuel_bill_amount_2: number = 0; 
  water_dispenser_bill_amount_2: number = 0; 
  phone_bill_amount_2: number = 0; 
  heating_bill_amount_2: number = 0; 
  bank_fees_amount_2: number = 0; 
  credit_card_fees_amount_2: number = 0; 
  school_fees_amount_2: number = 0; 
  university_fees_amount_2: number = 0; 
  car_maintenance_fees_amount_2: number = 0; 
  car_periodic_maintenance_fees_amount_2: number = 0; 
  rent_fees_amount_2: number = 0; 
  veterinarian_fees_amount_2: number = 0; 
  pet_food_bill_amount_2: number = 0; 
  new_car_bill_amount_2: number = 0; 
  new_house_bill_amount_2: number = 0; 
  vacation_bill_amount_2: number = 0; 
  paint_house_fees_amount_2: number = 0;

  //Variables to know if the amount should be printed this month or no
  property_tax_amount_postpone: boolean = true;
  mechanic_tax_amount_postpone: boolean = true;
  municipality_tax_amount_postpone: boolean = true;
  car_insurance_amount_postpone: boolean = true;
  cable_bill_amount_postpone: boolean = true;
  internet_bill_amount_postpone: boolean = true;
  electricity_bill_amount_postpone: boolean = true;
  generator_bill_amount_postpone: boolean = true;
  grocery_bill_amount_postpone: boolean = true;
  fuel_bill_amount_postpone: boolean = true;
  water_dispenser_bill_amount_postpone: boolean = true;
  phone_bill_amount_postpone: boolean = true;
  heating_bill_amount_postpone: boolean = true;
  bank_fees_amount_postpone: boolean = true;
  credit_card_fees_amount_postpone: boolean = true;
  school_fees_amount_postpone: boolean = true;
  university_fees_amount_postpone: boolean = true;
  car_maintenance_fees_amount_postpone: boolean = true;
  car_periodic_maintenance_fees_amount_postpone: boolean = true;
  rent_fees_amount_postpone: boolean = true;
  veterinarian_fees_amount_postpone: boolean = true;
  pet_food_bill_amount_postpone: boolean = true;
  new_house_bill_amount_postpone: boolean = true;
  new_car_bill_amount_postpone: boolean = true;
  vacation_bill_amount_postpone: boolean = true;
  paint_house_fees_amount_postpone: boolean = true;

  //Variables to know if the amount should be printed next month or no
  property_tax_amount_postpone_2: boolean = true;
  mechanic_tax_amount_postpone_2: boolean = true;
  municipality_tax_amount_postpone_2: boolean = true;
  car_insurance_amount_postpone_2: boolean = true;
  cable_bill_amount_postpone_2: boolean = true;
  internet_bill_amount_postpone_2: boolean = true;
  electricity_bill_amount_postpone_2: boolean = true;
  generator_bill_amount_postpone_2: boolean = true;
  grocery_bill_amount_postpone_2: boolean = true;
  fuel_bill_amount_postpone_2: boolean = true;
  water_dispenser_bill_amount_postpone_2: boolean = true;
  phone_bill_amount_postpone_2: boolean = true;
  heating_bill_amount_postpone_2: boolean = true;
  bank_fees_amount_postpone_2: boolean = true;
  credit_card_fees_amount_postpone_2: boolean = true;
  school_fees_amount_postpone_2: boolean = true;
  university_fees_amount_postpone_2: boolean = true;
  car_maintenance_fees_amount_postpone_2: boolean = true;
  car_periodic_maintenance_fees_amount_postpone_2: boolean = true;
  rent_fees_amount_postpone_2: boolean = true;
  veterinarian_fees_amount_postpone_2: boolean = true;
  pet_food_bill_amount_postpone_2: boolean = true;
  new_house_bill_amount_postpone_2: boolean = true;
  new_car_bill_amount_postpone_2: boolean = true;
  vacation_bill_amount_postpone_2: boolean = true;
  paint_house_fees_amount_postpone_2: boolean = true;

  slide_options =  //For slides
  {
    initialSlide: 0,
    speed: 400
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
  async loadEvents() //Method that load previous events that are saved on the memory
  {
    //this.loadScreen();
    
    setInterval(async () => 
    {
      this.list = await this.data_service.getData();
      //this.autoDelete(); REMOVE COMMENT THIS LINE LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.getIncome();
      this.getNextMonth();
      this.compute();
      this.computeNextMonth();

      

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

  //START nextMonth()
  getNextMonth() //Gets the current month and adds 1 and 2
  {
    this.splitDate();
    if(this.month < 12 && this.month_plus_1 == 0)
    {
      this.month_plus_1 = parseInt(this.month) + 1;
      this.year_plus_1 = this.year;
    }
    else
      if(this.month == 12)
      {
        this.month_plus_1 = 1;
        this.month_plus_2 = 2;
        this.year_plus_1 = parseInt(this.year) + 1;

      }

    if(this.month < 11)
    {
      this.month_plus_2 = parseInt(this.month) + 2;
      this.year_plus_1 = this.year;
    }
    else
      if(this.month == 11)
      {
        this.month_plus_2 = 1;
        this.year_plus_1 = parseInt(this.year) + 1;

      }
  }
  //END nextMonth()

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

  //START computeS()
  computeS(index: number) //computes balance to pay current month
  {
    var format = this.list[index];
    format = format.split(' ')[2];
    switch(format)
      {
        case "property_tax":
        this.data_service.getAmount('property_tax_amount');
        this.property_tax_amount = this.data_service.get_property_tax_amount
        this.property_tax_amount_postpone = false;
        break;

        case "mechanic_tax":
          this.data_service.getAmount('mechanic_tax_amount');
          this.mechanic_tax_amount = this.data_service.get_mechanic_tax_amount;
          this.mechanic_tax_amount_postpone = false;
          break;
        
        case "municipality_tax":
          this.data_service.getAmount('municipality_tax_amount');
          this.municipality_tax_amount = this.data_service.get_municipality_tax_amount;
          this.municipality_tax_amount_postpone = false;
          break;

        case "car_insurance_fees":
          this.data_service.getAmount('car_insurance_fees_amount');
          this.car_insurance_fees_amount = this.data_service.get_car_insurance_fees_amount;
          this.car_insurance_amount_postpone = false;
          break;

        case "cable_bill":
          this.data_service.getAmount('cable_bill_amount');
          this.cable_bill_amount = this.data_service.get_cable_bill_amount;
          this.cable_bill_amount_postpone = false;
          break;

        case "internet_bill":
          this.data_service.getAmount('internet_bill_amount');
          this.internet_bill_amount = this.data_service.get_internet_bill_amount;
          this.internet_bill_amount_postpone = false;
          break;

        case "electricity_bill":
          this.data_service.getAmount('electricity_bill_amount');
          this.electricity_bill_amount = this.data_service.get_electricity_bill_amount;
          this.electricity_bill_amount_postpone = false;
          break;

        case "generator_bill":
          this.data_service.getAmount('generator_bill_amount');
          this.generator_bill_amount = this.data_service.get_generator_bill_amount;
          this.generator_bill_amount_postpone = false;
          break;

        case "grocery_bill":
          this.data_service.getAmount('grocery_bill_amount');
          this.grocery_bill_amount = this.data_service.get_grocery_bill_amount;
          this.grocery_bill_amount_postpone = false;
          break;

        case "fuel_bill":
          this.data_service.getAmount('fuel_bill_amount');
          this.fuel_bill_amount = this.data_service.get_fuel_bill_amount;
          this.fuel_bill_amount_postpone = false;
          break;

        case "water_dispenser_bill":
          this.data_service.getAmount('water_dispenser_bill_amount');
          this.water_dispenser_bill_amount = this.data_service.get_water_dispenser_bill_amount;
          this.water_dispenser_bill_amount_postpone = false;
          break;

        case "phone_bill":
          this.data_service.getAmount('phone_bill_amount');
          this.phone_bill_amount = this.data_service.get_phone_bill_amount;
          this.phone_bill_amount_postpone = false;
          break;

        case "heating_bill":
          this.data_service.getAmount('heating_bill_amount');
          this.heating_bill_amount = this.data_service.get_heating_bill_amount;
          this.heating_bill_amount_postpone = false;
          break;

        case "bank_fees":
          this.data_service.getAmount('bank_fees_amount');
          this.bank_fees_amount = this.data_service.get_bank_fees_amount;
          this.bank_fees_amount_postpone = false;
          break;

        case "credit_card_fees":
          this.data_service.getAmount('credit_card_fees_amount');
          this.credit_card_fees_amount = this.data_service.get_credit_card_fees_amount;
          this.credit_card_fees_amount_postpone = false;
          break;

        case "school_fees":
          this.data_service.getAmount('school_fees_amount');
          this.school_fees_amount = this.data_service.get_school_fees_amount;
          this.school_fees_amount_postpone = false;
          break;

        case "university_fees":
          this.data_service.getAmount('university_fees_amount');
          this.university_fees_amount = this.data_service.get_university_fees_amount;
          this.university_fees_amount_postpone = false;
          break;

        case "car_maintenance_fees":
          this.data_service.getAmount('car_maintenance_fees_amount');
          this.car_maintenance_fees_amount = this.data_service.get_car_maintenance_fees_amount;
          this.car_maintenance_fees_amount_postpone = false;
          break;

        case "car_periodic_maintenance_fees":
          this.data_service.getAmount('car_periodic_maintenance_fees_amount');
          this.car_periodic_maintenance_fees_amount = this.data_service.get_car_periodic_maintenance_fees_amount;
          this.car_periodic_maintenance_fees_amount_postpone = false;
          break;

        case "rent_fees":
          this.data_service.getAmount('rent_fees_amount');
          this.rent_fees_amount = this.data_service.get_rent_fees_amount;
          this.rent_fees_amount_postpone = false;
          break;

        case "veterinarian_fees":
          this.data_service.getAmount('veterinarian_fees_amount');
          this.veterinarian_fees_amount = this.data_service.get_veterinarian_fees_amount;
          this.veterinarian_fees_amount_postpone = false;
          break;

        case "pet_food_bill":
          this.data_service.getAmount('pet_food_bill_amount');
          this.pet_food_bill_amount = this.data_service.get_pet_food_bill_amount;
          this.pet_food_bill_amount_postpone = false;
          break;

        case "new_house_bill":
          this.data_service.getAmount('new_house_bill_amount');
          this.new_house_bill_amount = this.data_service.get_new_house_bill_amount;
          this.new_house_bill_amount_postpone = false;
          break;

        case "new_car_bill":
          this.data_service.getAmount('new_car_bill_amount');
          this.new_car_bill_amount = this.data_service.get_new_car_bill_amount;
          this.new_car_bill_amount_postpone = false;
          break;

        case "vacation_bill":
          this.data_service.getAmount('vacation_bill_amount');
          this.vacation_bill_amount = this.data_service.get_vacation_bill_amount;
          this.vacation_bill_amount_postpone = false;
          break;

        case "paint_house_fees":
          this.data_service.getAmount('paint_house_fees_amount');
          this.paint_house_fees_amount = this.data_service.get_paint_house_fees_amount;
          this.paint_house_fees_amount_postpone = false;
          break;

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
  //END computeS()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START compute()
  compute()
  {
    this.splitDate();
    for(let i = 0; i < this.list.length; i++)
    {
      this.check(i);

      if(this.month_list == this.month)
      {
        this.computeS(i);
        
      }   
    }
  }
  //END compute()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START computeNextMonth()
  computeNextMonthS(index: number) //Computes balance to pay following month
  {
    var format = this.list[index];
    format = format.split(' ')[2];
    switch(format)
      {
        case "property_tax":
        this.data_service.getAmount('property_tax_amount');
        this.property_tax_amount_2 = this.data_service.get_property_tax_amount
        this.property_tax_amount_postpone_2 = false;
        break;

        case "mechanic_tax":
          this.data_service.getAmount('mechanic_tax_amount');
          this.mechanic_tax_amount_2 = this.data_service.get_mechanic_tax_amount;
          this.mechanic_tax_amount_postpone_2 = false
          break;
        
        case "municipality_tax":
          this.data_service.getAmount('municipality_tax_amount');
          this.municipality_tax_amount_2 = this.data_service.get_municipality_tax_amount;
          this.municipality_tax_amount_postpone_2 = false;
          break;

        case "car_insurance_fees":
          this.data_service.getAmount('car_insurance_fees_amount');
          this.car_insurance_fees_amount_2 = this.data_service.get_car_insurance_fees_amount;
          this.car_insurance_amount_postpone_2 = false;
          break;

        case "cable_bill":
          this.data_service.getAmount('cable_bill_amount');
          this.cable_bill_amount_2 = this.data_service.get_cable_bill_amount;
          this.cable_bill_amount_postpone_2 = false;
          break;

        case "internet_bill":
          this.data_service.getAmount('internet_bill_amount');
          this.internet_bill_amount_2 = this.data_service.get_internet_bill_amount;
          this.internet_bill_amount_postpone_2 = false;
          break;

        case "electricity_bill":
          this.data_service.getAmount('electricity_bill_amount');
          this.electricity_bill_amount_2 = this.data_service.get_electricity_bill_amount;
          this.electricity_bill_amount_postpone_2 = false;
          break;

        case "generator_bill":
          this.data_service.getAmount('generator_bill_amount');
          this.generator_bill_amount_2 = this.data_service.get_generator_bill_amount;
          this.generator_bill_amount_postpone_2 = false;
          break;

        case "grocery_bill":
          this.data_service.getAmount('grocery_bill_amount');
          this.grocery_bill_amount_2 = this.data_service.get_grocery_bill_amount;
          this.grocery_bill_amount_postpone_2 = false;
          break;

        case "fuel_bill":
          this.data_service.getAmount('fuel_bill_amount');
          this.fuel_bill_amount_2 = this.data_service.get_fuel_bill_amount;
          this.fuel_bill_amount_postpone_2 = false;
          break;

        case "water_dispenser_bill":
          this.data_service.getAmount('water_dispenser_bill_amount');
          this.water_dispenser_bill_amount_2 = this.data_service.get_water_dispenser_bill_amount;
          this.water_dispenser_bill_amount_postpone_2 = false;
          break;

        case "phone_bill":
          this.data_service.getAmount('phone_bill_amount');
          this.phone_bill_amount_2 = this.data_service.get_phone_bill_amount;
          this.phone_bill_amount_postpone_2 = false;
          break;

        case "heating_bill":
          this.data_service.getAmount('heating_bill_amount');
          this.heating_bill_amount_2 = this.data_service.get_heating_bill_amount;
          this.heating_bill_amount_postpone_2 = false;
          break;

        case "bank_fees":
          this.data_service.getAmount('bank_fees_amount');
          this.bank_fees_amount_2 = this.data_service.get_bank_fees_amount;
          this.bank_fees_amount_postpone_2 = false;
          break;

        case "credit_card_fees":
          this.data_service.getAmount('credit_card_fees_amount');
          this.credit_card_fees_amount_2 = this.data_service.get_credit_card_fees_amount;
          this.credit_card_fees_amount_postpone_2 = false;
          break;

        case "school_fees":
          this.data_service.getAmount('school_fees_amount');
          this.school_fees_amount_2 = this.data_service.get_school_fees_amount;
          this.school_fees_amount_postpone_2 = false;
          break;

        case "university_fees":
          this.data_service.getAmount('university_fees_amount');
          this.university_fees_amount_2 = this.data_service.get_university_fees_amount;
          this.university_fees_amount_postpone_2 = false;
          break;

        case "car_maintenance_fees":
          this.data_service.getAmount('car_maintenance_fees_amount');
          this.car_maintenance_fees_amount_2 = this.data_service.get_car_maintenance_fees_amount;
          this.car_maintenance_fees_amount_postpone_2 = false;
          break;

        case "car_periodic_maintenance_fees":
          this.data_service.getAmount('car_periodic_maintenance_fees_amount');
          this.car_periodic_maintenance_fees_amount_2 = this.data_service.get_car_periodic_maintenance_fees_amount;
          this.car_periodic_maintenance_fees_amount_postpone_2 = false;
          break;

        case "rent_fees":
          this.data_service.getAmount('rent_fees_amount');
          this.rent_fees_amount_2 = this.data_service.get_rent_fees_amount;
          this.rent_fees_amount_postpone_2 = false;
          break;

        case "veterinarian_fees":
          this.data_service.getAmount('veterinarian_fees_amount');
          this.veterinarian_fees_amount_2 = this.data_service.get_veterinarian_fees_amount;
          this.veterinarian_fees_amount_postpone_2 = false;
          break;

        case "pet_food_bill":
          this.data_service.getAmount('pet_food_bill_amount');
          this.pet_food_bill_amount_2 = this.data_service.get_pet_food_bill_amount;
          this.pet_food_bill_amount_postpone_2 = false;
          break;

        case "new_house_bill":
          this.data_service.getAmount('new_house_bill_amount');
          this.new_house_bill_amount_2 = this.data_service.get_new_house_bill_amount;
          this.new_house_bill_amount_postpone_2 = false;
          break;

        case "new_car_bill":
          this.data_service.getAmount('new_car_bill_amount');
          this.new_car_bill_amount_2 = this.data_service.get_new_car_bill_amount;
          this.new_car_bill_amount_postpone_2 = false;
          break;

        case "vacation_bill":
          this.data_service.getAmount('vacation_bill_amount');
          this.vacation_bill_amount_2 = this.data_service.get_vacation_bill_amount;
          this.vacation_bill_amount_postpone_2 = false;
          break;

        case "paint_house_fees":
          this.data_service.getAmount('paint_house_fees_amount');
          this.paint_house_fees_amount_2 = this.data_service.get_paint_house_fees_amount;
          this.paint_house_fees_amount_postpone_2 = false;
          break;

      }
    
      this.income = parseFloat(this.income_str); //parseFloat is to convert from string to number
      if(this.income <= 0)
      {
        this.remaining_second_month = 0;
  
      }
      else
        if(this.income > 0)
        {
          this.remaining_second_month = this.income - (this.property_tax_amount_2 + this.mechanic_tax_amount_2 +
                                          this.municipality_tax_amount_2 + this.car_insurance_fees_amount_2 +
                                          this.cable_bill_amount_2 + this.internet_bill_amount_2 +
                                          this.electricity_bill_amount_2 + this.generator_bill_amount_2 +
                                          this.grocery_bill_amount_2 + this.fuel_bill_amount_2 +
                                          this.water_dispenser_bill_amount_2 + this.phone_bill_amount_2 +
                                          this.heating_bill_amount_2 + this.bank_fees_amount_2 +
                                          this.credit_card_fees_amount_2 + this.school_fees_amount_2 +
                                          this.university_fees_amount_2 + this.car_maintenance_fees_amount_2 +
                                          this.car_periodic_maintenance_fees_amount_2 + this.rent_fees_amount_2 +
                                          this.veterinarian_fees_amount_2 +  this.pet_food_bill_amount_2 +
                                          this.new_house_bill_amount_2 + this.new_car_bill_amount_2 +
                                          this.vacation_bill_amount_2 + this.paint_house_fees_amount_2);
        }
  }
  //END computeNextMonth()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START computeNextMonth()
  computeNextMonth() //Checks what month we are and computes if month is true
  {
    this.splitDate();
    for(let i = 0; i < this.list.length; i++)
    {
      this.check(i);

      if(this.month_list == (parseInt(this.month) + 1))
      {
        this.computeNextMonthS(i);
        
      }   
    }
  }
  //END computeNextMonth()

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
