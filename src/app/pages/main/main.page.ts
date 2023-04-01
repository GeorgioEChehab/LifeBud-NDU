import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LoadingController, NavController, Platform, AlertController } from '@ionic/angular';



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
  search_results: any = []; //displays result from search
  hide_results: number = 0; //if the users searches display result if not hide it
  daily_day: number; //to compute amount of everyday tasks of current month
  daily_day_2: number; //to compute amount of everyday tasks of next month
  is_income: boolean = false; //in order to send only 1 alert
  navigator_any: any = navigator; //to exit app
  
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
  school_fees_amount: number = 0; 
  university_fees_amount: number = 0;
  car_periodic_maintenance_fees_amount: number = 0; 
  rent_fees_amount: number = 0; 
  veterinarian_fees_amount: number = 0; 
  pet_food_bill_amount: number = 0; 
  vacation_bill_amount: number = 0;

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
  school_fees_amount_2: number = 0; 
  university_fees_amount_2: number = 0;
  car_periodic_maintenance_fees_amount_2: number = 0; 
  rent_fees_amount_2: number = 0; 
  veterinarian_fees_amount_2: number = 0; 
  pet_food_bill_amount_2: number = 0; 
  vacation_bill_amount_2: number = 0;

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
  school_fees_amount_postpone: boolean = true;
  university_fees_amount_postpone: boolean = true;
  car_periodic_maintenance_fees_amount_postpone: boolean = true;
  rent_fees_amount_postpone: boolean = true;
  veterinarian_fees_amount_postpone: boolean = true;
  pet_food_bill_amount_postpone: boolean = true;
  vacation_bill_amount_postpone: boolean = true;

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
  school_fees_amount_postpone_2: boolean = true;
  university_fees_amount_postpone_2: boolean = true;
  car_periodic_maintenance_fees_amount_postpone_2: boolean = true;
  rent_fees_amount_postpone_2: boolean = true;
  veterinarian_fees_amount_postpone_2: boolean = true;
  pet_food_bill_amount_postpone_2: boolean = true;
  vacation_bill_amount_postpone_2: boolean = true;

  //Id for tasks
  property_tax_id: number = 0;
  mechanic_tax_id: number = 5;
  municipality_tax_id: number = 10;
  car_insurance_fees_id: number = 15;
  cable_bill_id: number = 20;
  internet_bill_id: number = 25;
  electricity_bill_id: number = 30;
  generator_bill_id: number = 35;
  grocery_bill_id: number = 40;
  fuel_bill_id: number = 45;
  water_dispenser_bill_id: number = 50;
  phone_bill_id: number = 55;
  heating_bill_id: number = 60;
  bank_fees_id: number = 65;
  school_fees_id: number = 75;
  university_fees_id: number = 80;
  car_periodic_maintenance_fees_id: number = 90;
  rent_fees_id: number = 95;
  veterinarian_fees_id: number = 100;
  pet_food_bill_id: number = 105;
  vacation_bill_id: number = 120;
  other_id: number = 130;

  slide_options =  //For slides
  {
    initialSlide: 0,
    speed: 400
  }

  //START TESTING METHODS
  //TO BE DELETED LATER IF WRONG

  
  
  //END TESTING METHODS

  //START constructor(...)
  constructor(private data_service: DataService, private router: Router,
              private cd: ChangeDetectorRef, private local_notifications: LocalNotifications,
              private loading_controller: LoadingController, private navCtrl: NavController,
              private platform: Platform, private alert_controller: AlertController) 
  {
    this.loadEvents();
    this.is_income = false;
    this.local_notifications.on('click').subscribe(notification => {
      this.showAlert(notification.data.head, notification.data.message);

    })

  }
  //END constructor(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START add()
  GoToadd() //Jumps to add page
  {
    this.router.navigate(['tabs/add']);
  }
  //END add()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START loadEvents()
  async loadEvents() //Method that load previous events that are saved on the memory
  {
    this.loadScreen(5000);
    
    
    setInterval(async () => 
    {
      this.autoDelete();
      this.getIncome();
      this.getNextMonth();
      this.computeCurrentMonth();
      this.computeNextMonth();

      this.list = await this.data_service.getData();
      

      if((this.list[0] == null) && (this.list[1] == null))
      {
        this.list[0] = null;
        this.list[0] = "No Tasks"; //if array is null then display msg
      }
    else
      if((this.list[1] != null) && (this.list[0] == 'No Tasks'))
        this.list[0] == null; //used to remove the previous msg
      
    }, 3000) //adjust time to 100 or 50 later on instead of 500!!!!!!!!!!!!!!!!!!

    setInterval(async () =>
    {
      this.alertIncome();

    }, 30000)

  }
  //END loadEvents()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START ionViewDidEnter()
  ionViewWillEnter()
  {
    this.loadEvents();
    this.getIncome();
    
  }
  //END ionViewDidEnter()

  //--------------------------------------------------------------------------------------------------------------------------------
  
  //START refreshPage($event)
  refreshPage(event: any) //Refreshes the whole page when the user pulls down
  {
    setTimeout(() => 
    {
      location.reload();

      event.target.complete();

    }, 2000);
  }
  //END refreshPage($event)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START loadScreen()
  async loadScreen(duration_time: number) 
  {
    const loading = await this.loading_controller.create(
      {
        message: 'Please Wait...',
        spinner: 'crescent',
        cssClass: 'loading-screen',
        duration: duration_time
      });

    loading.present();
  }
  //END loadScreen

  //--------------------------------------------------------------------------------------------------------------------------------

  //START showAlert(...)
  showAlert(head: any, msg: any) //used for alert box
  {
    this.alert_controller.create(
      {
        header: head,
        message: msg,
        cssClass: 'notification-alert',
        buttons: ['OK']
      }
    ).then(alert => alert.present());

  }
  //END showALert(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START alertIncome()
  async alertIncome()
  {
    if(this.income == 0)
    {
      if(!this.is_income)
      {
        this.is_income = true;

        const alert = await this.alert_controller.create({
          header: 'Alert',
          cssClass: 'alert-income-alert',
          subHeader: 'No Income',
          message: 'Please Add Your Income To Activate Wallet Function',
          buttons: [{
            text: 'OK',
            cssClass: 'ok-button',
            handler: () => {
              this.is_income = false
            }
          }],
        });
    
        await alert.present();
      }
    }
  }
  //END alertIncome()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START handleChange(...)
  handleChange(event: any)
  {
    this.search_results = [...this.list];
    const query = event.target.value.toLowerCase();
    if(query != '')
    {
      this.hide_results = 1;
      this.search_results = this.list.filter(d => d.toLowerCase().indexOf(query) > -1);
    }
    else
    {
      this.hide_results = 0;
      this.search_results = [];
    }
  }
  //END handleChange(...)

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
        var temp1 = this.list[i];
        var temp2 = temp1.split(' ')[4];
        if((temp2 != 'Every') || (temp2 != 'Every:'))
        {
          this.check(i);
          if(this.day == 1)
            if((this.day_list <= this.day) && (this.month_list < this.month) && (this.year_list <= this.year))
              this.deleteEvent(i);
        }
      }
    }
  }
  //END autoDelete()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START check(...)
  check(index: number) //Gets the time variables from the list
  {
    this.str = this.list[index];

    var format1, format2, format3, format4;
    var temp_month, temp1, temp2;

    format1 = this.str.split(' ')[4]; //to check if it's 'Every'
    temp_month = this.str.split(' ')[8]; //to get date;
    temp_month = temp_month.split('-')[1];
    temp1 = parseInt(this.month);
    temp2 = parseInt(temp_month);
    format4 = this.str.split(' ')[7]; //to get month of task from list
    if(format1 == 'Every')
    {
      format2 = this.str.split(' ')[5]; //to check if it's 'Day'
      format3 = this.str.split(' ')[9]; //to check if it's 'At:'
      if((format2 == 'Day') && (temp_month == this.month))
        this.month_list = this.month;
      else
        if(temp2 == temp1+1)
          this.month_list = temp2;
        else
          if((format2 != 'Day') && (format3 == 'At:')) 
            this.month_list = this.month;
    }
    else
      if(format1 == 'Every:')
        this.month_list = format4;
      else
      {
        this.str = this.list[index];

        var format5 = this.str.split(' ')[4];
        var format6 = this.str.split(' ')[6];
        var format7 = this.str.split(' ')[8];
        var format8 = this.str.split(' ')[10];
        var format9 = this.str.split(' ')[12];


        this.day_list = format5;
        this.month_list = format6;
        this.year_list = format7;
        this.hour_list = format8;
        this.minute_list = format9;
      }
  }
  //END check(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START check2(...)
  check2(index: number) //Used to add daily and monthly tasks to wallet2
  {
    this.date = new Date();
    this.date_format = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();;
    this.splitDate();

    this.str = this.list[index];

    var format1, format2, format3, format4;

    format1 = this.str.split(' ')[4]; //to check if it's 'Every'
    if(format1 == 'Every')
    {
      format2 = this.str.split(' ')[5]; //to check if it's 'Day'
      format3 = parseInt(this.month);
      format4 = this.str.split(' ')[6]; //to check if it's 'Starting'
      if(format2 == 'Day')
        this.month_list = format3 + 1;
      else
        if((format2 != 'Day') && (format4 == 'Starting'))
          this.month_list = format3 + 1;
          
    }
  }
  //END check2(...)

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
    this.income = parseFloat(this.income_str);

  }
  //END getIncome()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getAmountCurrent(...)
  getAmountCurrent(index: number) //gets amount of tasks for current month
  {
    var format = this.list[index];
    format = format.split(' ')[2];
    switch(format)
      {
        case "property_tax":
          this.data_service.getAmount('property_tax_amount');
          this.property_tax_amount = this.data_service.get_property_tax_amount;
          this.property_tax_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "mechanic_tax":
          this.data_service.getAmount('mechanic_tax_amount');
          this.mechanic_tax_amount = this.data_service.get_mechanic_tax_amount;
          this.mechanic_tax_amount_postpone = false;
          this.cd.detectChanges();
          break;
        
        case "municipality_tax":
          this.data_service.getAmount('municipality_tax_amount');
          this.municipality_tax_amount = this.data_service.get_municipality_tax_amount;
          this.municipality_tax_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "car_insurance_fees":
          this.data_service.getAmount('car_insurance_fees_amount');
          this.car_insurance_fees_amount = this.data_service.get_car_insurance_fees_amount;
          this.car_insurance_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "cable_bill":
          this.data_service.getAmount('cable_bill_amount');
          this.cable_bill_amount = this.data_service.get_cable_bill_amount;
          this.cable_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "internet_bill":
          this.data_service.getAmount('internet_bill_amount');
          this.internet_bill_amount = this.data_service.get_internet_bill_amount;
          this.internet_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "electricity_bill":
          this.data_service.getAmount('electricity_bill_amount');
          this.electricity_bill_amount = this.data_service.get_electricity_bill_amount;
          this.electricity_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "generator_bill":
          this.data_service.getAmount('generator_bill_amount');
          this.generator_bill_amount = this.data_service.get_generator_bill_amount;
          this.generator_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "grocery_bill":
          this.data_service.getAmount('grocery_bill_amount');
          this.grocery_bill_amount = this.data_service.get_grocery_bill_amount;
          this.grocery_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "fuel_bill":
          this.data_service.getAmount('fuel_bill_amount');
          this.fuel_bill_amount = this.data_service.get_fuel_bill_amount;
          this.fuel_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "water_dispenser_bill":
          this.data_service.getAmount('water_dispenser_bill_amount');
          this.water_dispenser_bill_amount = this.data_service.get_water_dispenser_bill_amount;
          this.water_dispenser_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "phone_bill":
          this.data_service.getAmount('phone_bill_amount');
          this.phone_bill_amount = this.data_service.get_phone_bill_amount;
          this.phone_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "heating_bill":
          this.data_service.getAmount('heating_bill_amount');
          this.heating_bill_amount = this.data_service.get_heating_bill_amount;
          this.heating_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "bank_fees":
          this.data_service.getAmount('bank_fees_amount');
          this.bank_fees_amount = this.data_service.get_bank_fees_amount;
          this.bank_fees_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "school_fees":
          this.data_service.getAmount('school_fees_amount');
          this.school_fees_amount = this.data_service.get_school_fees_amount;
          this.school_fees_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "university_fees":
          this.data_service.getAmount('university_fees_amount');
          this.university_fees_amount = this.data_service.get_university_fees_amount;
          this.university_fees_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "car_periodic_maintenance_fees":
          this.data_service.getAmount('car_periodic_maintenance_fees_amount');
          this.car_periodic_maintenance_fees_amount = this.data_service.get_car_periodic_maintenance_fees_amount;
          this.car_periodic_maintenance_fees_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "rent_fees":
          this.data_service.getAmount('rent_fees_amount');
          this.rent_fees_amount = this.data_service.get_rent_fees_amount;
          this.rent_fees_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "veterinarian_fees":
          this.data_service.getAmount('veterinarian_fees_amount');
          this.veterinarian_fees_amount = this.data_service.get_veterinarian_fees_amount;
          this.veterinarian_fees_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "pet_food_bill":
          this.data_service.getAmount('pet_food_bill_amount');
          this.pet_food_bill_amount = this.data_service.get_pet_food_bill_amount;
          this.pet_food_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

        case "vacation_bill":
          this.data_service.getAmount('vacation_bill_amount');
          this.vacation_bill_amount = this.data_service.get_vacation_bill_amount;
          this.vacation_bill_amount_postpone = false;
          this.cd.detectChanges();
          break;

      }
      this.cd.detectChanges();
  }
  //END getAmountCurrent(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  
  //START getDay(...)
  getDay(index: number)
  {
  this.splitDate(); 
  for(let i = 0; i < this.list.length; i++)
    {
      this.str = this.list[index];

      var format1, format2
      var temp_month, temp_year, temp_day, temp1;

      format1 = this.str.split(' ')[4]; //to check if it's 'Every'
      temp_day = this.str.split(' ')[8]; //to get date;
      temp_month = this.str.split('-')[1]; 
      temp_year = this.str.split('-')[2];
      temp_year = temp_year.split(' ')[0];
      temp_day = temp_day.split('-')[0];
      var temp_days = new Date(this.year, this.month, 0).getDate(); //gets how many days in current month
      temp1 = parseInt(temp_day);
      if(format1 == 'Every')
      {
        format2 = this.str.split(' ')[5]; //to check if it's 'Day'
        if(format2 == 'Day')
        {
          if((temp_month == this.month) && (temp_year == this.year))
          this.daily_day = temp_days - temp1 + 1;
          else
            this.daily_day = temp_days;
          
        }
      }
    }
  }
  //END getDay(...)

  //--------------------------------------------------------------------------------------------------------------------------------
  
   //START computeDailyAmount(...)
  computeDailyAmount(index: number) //Multiply amount to be paid if it's daily
  {
    this.splitDate();
    this.str = this.list[index];

    var temp_task = this.str.split(' ')[2];
    var temp_amount = this.str.split(' ')[5];
    this.getDay(index);
    if(temp_amount == 'Day')
    {
      switch(temp_task)
      {
        case "property_tax":
          this.property_tax_amount = this.property_tax_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "mechanic_tax":
          this.mechanic_tax_amount = this.mechanic_tax_amount * this.daily_day;
          this.cd.detectChanges();
          break;
        
        case "municipality_tax":
          this.municipality_tax_amount = this.municipality_tax_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "car_insurance_fees":
          this.car_insurance_fees_amount = this.car_insurance_fees_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "cable_bill":
          this.cable_bill_amount = this.cable_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "internet_bill":
          this.internet_bill_amount = this.internet_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "electricity_bill":
          this.electricity_bill_amount = this.electricity_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "generator_bill":
          this.generator_bill_amount = this.generator_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "grocery_bill":
          this.grocery_bill_amount = this.grocery_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "fuel_bill":
          this.fuel_bill_amount = this.fuel_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "water_dispenser_bill":
          this.water_dispenser_bill_amount = this.water_dispenser_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "phone_bill":
          this.phone_bill_amount = this.phone_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "heating_bill":
          this.heating_bill_amount = this.heating_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "bank_fees":
          this.bank_fees_amount = this.bank_fees_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "school_fees":
          this.school_fees_amount = this.school_fees_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "university_fees":
          this.university_fees_amount = this.university_fees_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "car_periodic_maintenance_fees":
          this.car_periodic_maintenance_fees_amount = this.car_periodic_maintenance_fees_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "rent_fees":
          this.rent_fees_amount = this.rent_fees_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "veterinarian_fees":
          this.veterinarian_fees_amount = this.veterinarian_fees_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "pet_food_bill":
          this.pet_food_bill_amount = this.pet_food_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

        case "vacation_bill":
          this.vacation_bill_amount = this.vacation_bill_amount * this.daily_day;
          this.cd.detectChanges();
          break;

      }
    }
  }
  //END computeDailyAmount(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START computeCurrent()
  computeCurrentMonth() //computes balance to pay current month
  {
    this.splitDate();
    for(let i = 0; i < this.list.length; i++)
    {
      this.check(i);

      if(this.month_list == this.month)
      {
        this.getAmountCurrent(i);
        this.computeDailyAmount(i);
        
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
                                        this.school_fees_amount + this.university_fees_amount +
                                        this.car_periodic_maintenance_fees_amount + this.rent_fees_amount +
                                        this.veterinarian_fees_amount +  this.pet_food_bill_amount +
                                        this.vacation_bill_amount);
      }
  }
  //END computeCurrent()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getAmountNextMonth(...)
  getAmountNextMonth(index: number) //gets amount of tasks for next month
  {
    var format = this.list[index];
    format = format.split(' ')[2];
    switch(format)
      {
        case "property_tax":
        this.data_service.getAmount('property_tax_amount');
        this.property_tax_amount_2 = this.data_service.get_property_tax_amount
        this.property_tax_amount_postpone_2 = false;
        this.cd.detectChanges();
        break;

        case "mechanic_tax":
          this.data_service.getAmount('mechanic_tax_amount');
          this.mechanic_tax_amount_2 = this.data_service.get_mechanic_tax_amount;
          this.mechanic_tax_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;
        
        case "municipality_tax":
          this.data_service.getAmount('municipality_tax_amount');
          this.municipality_tax_amount_2 = this.data_service.get_municipality_tax_amount;
          this.municipality_tax_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "car_insurance_fees":
          this.data_service.getAmount('car_insurance_fees_amount');
          this.car_insurance_fees_amount_2 = this.data_service.get_car_insurance_fees_amount;
          this.car_insurance_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "cable_bill":
          this.data_service.getAmount('cable_bill_amount');
          this.cable_bill_amount_2 = this.data_service.get_cable_bill_amount;
          this.cable_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "internet_bill":
          this.data_service.getAmount('internet_bill_amount');
          this.internet_bill_amount_2 = this.data_service.get_internet_bill_amount;
          this.internet_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "electricity_bill":
          this.data_service.getAmount('electricity_bill_amount');
          this.electricity_bill_amount_2 = this.data_service.get_electricity_bill_amount;
          this.electricity_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "generator_bill":
          this.data_service.getAmount('generator_bill_amount');
          this.generator_bill_amount_2 = this.data_service.get_generator_bill_amount;
          this.generator_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "grocery_bill":
          this.data_service.getAmount('grocery_bill_amount');
          this.grocery_bill_amount_2 = this.data_service.get_grocery_bill_amount;
          this.grocery_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "fuel_bill":
          this.data_service.getAmount('fuel_bill_amount');
          this.fuel_bill_amount_2 = this.data_service.get_fuel_bill_amount;
          this.fuel_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "water_dispenser_bill":
          this.data_service.getAmount('water_dispenser_bill_amount');
          this.water_dispenser_bill_amount_2 = this.data_service.get_water_dispenser_bill_amount;
          this.water_dispenser_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "phone_bill":
          this.data_service.getAmount('phone_bill_amount');
          this.phone_bill_amount_2 = this.data_service.get_phone_bill_amount;
          this.phone_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "heating_bill":
          this.data_service.getAmount('heating_bill_amount');
          this.heating_bill_amount_2 = this.data_service.get_heating_bill_amount;
          this.heating_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "bank_fees":
          this.data_service.getAmount('bank_fees_amount');
          this.bank_fees_amount_2 = this.data_service.get_bank_fees_amount;
          this.bank_fees_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "school_fees":
          this.data_service.getAmount('school_fees_amount');
          this.school_fees_amount_2 = this.data_service.get_school_fees_amount;
          this.school_fees_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "university_fees":
          this.data_service.getAmount('university_fees_amount');
          this.university_fees_amount_2 = this.data_service.get_university_fees_amount;
          this.university_fees_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "car_periodic_maintenance_fees":
          this.data_service.getAmount('car_periodic_maintenance_fees_amount');
          this.car_periodic_maintenance_fees_amount_2 = this.data_service.get_car_periodic_maintenance_fees_amount;
          this.car_periodic_maintenance_fees_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "rent_fees":
          this.data_service.getAmount('rent_fees_amount');
          this.rent_fees_amount_2 = this.data_service.get_rent_fees_amount;
          this.rent_fees_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "veterinarian_fees":
          this.data_service.getAmount('veterinarian_fees_amount');
          this.veterinarian_fees_amount_2 = this.data_service.get_veterinarian_fees_amount;
          this.veterinarian_fees_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "pet_food_bill":
          this.data_service.getAmount('pet_food_bill_amount');
          this.pet_food_bill_amount_2 = this.data_service.get_pet_food_bill_amount;
          this.pet_food_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

        case "vacation_bill":
          this.data_service.getAmount('vacation_bill_amount');
          this.vacation_bill_amount_2 = this.data_service.get_vacation_bill_amount;
          this.vacation_bill_amount_postpone_2 = false;
          this.cd.detectChanges();
          break;

      }
  }
  //END getAmountNextMonth(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getDay2(...)
  getDay2(index: number)
  {
    this.splitDate();
    for(let i = 0; i < this.list.length; i++)
    {
      this.str = this.list[index];

      var format1, format2
      var temp_month, temp_year, temp_day, temp1, month1;

      format1 = this.str.split(' ')[4]; //to check if it's 'Every'
      temp_day = this.str.split(' ')[8]; //to get date;
      temp_month = this.str.split('-')[1]; 
      temp_year = this.str.split('-')[2];
      temp_year = temp_year.split(' ')[0];
      temp_day = temp_day.split('-')[0];
      month1 = parseInt(this.month);
      month1 += 1;
      var temp_days = new Date(this.year, month1, 0).getDate(); //gets how many days in next month
      temp1 = parseInt(temp_day);
      
      if(format1 == 'Every')
      {
        format2 = this.str.split(' ')[5]; //to check if it's 'Day'
        if(format2 == 'Day')
        {
          if((temp_month == month1) && (temp_year <= this.year))
            this.daily_day_2 = temp_days - temp1 + 1;
          else
            if((temp_month < month1) && (temp_year <= this.year))
              this.daily_day_2 = temp_days;
          
        }
      }
    }
  }
  //END getDay2(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START computeDailyAmount2(...)
  computeDailyamount2(index: number) //Multiply amount2 to be paid if it's daily for next month
  {
    this.splitDate();
    this.str = this.list[index];
    var temp_task = this.str.split(' ')[2];
    var temp_amount = this.str.split(' ')[5];
    this.getDay2(index)
    if(temp_amount == 'Day')
    {
      switch(temp_task)
      {
        case "property_tax":
          this.property_tax_amount_2 = this.property_tax_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "mechanic_tax":
          this.mechanic_tax_amount_2 = this.mechanic_tax_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;
        
        case "municipality_tax":
          this.municipality_tax_amount_2 = this.municipality_tax_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "car_insurance_fees":
          this.car_insurance_fees_amount_2 = this.car_insurance_fees_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "cable_bill":
          this.cable_bill_amount_2 = this.cable_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "internet_bill":
          this.internet_bill_amount_2 = this.internet_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "electricity_bill":
          this.electricity_bill_amount_2 = this.electricity_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "generator_bill":
          this.generator_bill_amount_2 = this.generator_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "grocery_bill":
          this.grocery_bill_amount_2 = this.grocery_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "fuel_bill":
          this.fuel_bill_amount_2 = this.fuel_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "water_dispenser_bill":
          this.water_dispenser_bill_amount_2 = this.water_dispenser_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "phone_bill":
          this.phone_bill_amount_2 = this.phone_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "heating_bill":
          this.heating_bill_amount_2 = this.heating_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "bank_fees":
          this.bank_fees_amount_2 = this.bank_fees_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "school_fees":
          this.school_fees_amount_2 = this.school_fees_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "university_fees":
          this.university_fees_amount_2 = this.university_fees_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "car_periodic_maintenance_fees":
          this.car_periodic_maintenance_fees_amount_2 = this.car_periodic_maintenance_fees_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "rent_fees":
          this.rent_fees_amount_2 = this.rent_fees_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "veterinarian_fees":
          this.veterinarian_fees_amount_2 = this.veterinarian_fees_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "pet_food_bill":
          this.pet_food_bill_amount_2 = this.pet_food_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

        case "vacation_bill":
          this.vacation_bill_amount_2 = this.vacation_bill_amount_2 * this.daily_day_2;
          this.cd.detectChanges();
          break;

      }
    }
  }
  //END computeDailyAmount2(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START computeNextMonth()
  computeNextMonth() //computes balance to pay next month
  {
    this.splitDate();
    for(let i = 0; i < this.list.length; i++)
    {
      this.check(i);
      this.check2(i);

      if(this.month_list == (parseInt(this.month) + 1))
      {
        this.getAmountNextMonth(i);
        this.computeDailyamount2(i);
        
      } 
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
                                        this.school_fees_amount_2 + this.university_fees_amount_2 +
                                        this.car_periodic_maintenance_fees_amount_2 + this.rent_fees_amount_2 +
                                        this.veterinarian_fees_amount_2 +  this.pet_food_bill_amount_2 +
                                        this.vacation_bill_amount_2);
      }
  }
  //END computeNextMonth()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START deleteEvent(...)
  deleteEvent(index: number) //Deletes event from my tasks
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
        this.remaining += this.property_tax_amount;
        this.remaining_second_month += this.property_tax_amount_2;
        this.data_service.removeAmount('property_tax_amount');
        this.property_tax_amount = 0;
        this.property_tax_amount_2 = 0;
        this.property_tax_amount_postpone = true;
        this.property_tax_amount_postpone_2 = true;
        this.local_notifications.cancel(this.property_tax_id);
        this.loadScreen(5000);
        this.loadEvents();
        break;

      case "mechanic_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.mechanic_tax_amount;
        this.remaining_second_month += this.mechanic_tax_amount_2;
        this.data_service.removeAmount('mechanic_tax_amount');
        this.mechanic_tax_amount = 0;
        this.mechanic_tax_amount_2 = 0;
        this.mechanic_tax_amount_postpone = true;
        this.mechanic_tax_amount_postpone_2 = true;
        this.local_notifications.cancel(this.mechanic_tax_id);
        this.loadEvents();
        break;

      case "municipality_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.municipality_tax_amount;
        this.remaining_second_month += this.municipality_tax_amount_2;
        this.data_service.removeAmount('municipality_tax_amount');
        this.municipality_tax_amount = 0;
        this.municipality_tax_amount_2 = 0;
        this.municipality_tax_amount_postpone = true;
        this.municipality_tax_amount_postpone_2 = true;
        this.local_notifications.cancel(this.municipality_tax_id);
        this.loadEvents();
        break;

      case "car_insurance_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.car_insurance_fees_amount;
        this.remaining_second_month += this.car_insurance_fees_amount_2;
        this.data_service.removeAmount('car_insurance_fees_amount');
        this.car_insurance_fees_amount = 0;
        this.car_insurance_fees_amount_2 = 0;
        this.car_insurance_amount_postpone = true;
        this.car_insurance_amount_postpone_2 = true;
        this.local_notifications.cancel(this.car_insurance_fees_id);
        this.loadEvents();
        break;

      case "cable_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.cable_bill_amount;
        this.remaining_second_month += this.cable_bill_amount_2;
        this.data_service.removeAmount('cable_bill_amount');
        this.cable_bill_amount = 0;
        this.cable_bill_amount_2 = 0;
        this.cable_bill_amount_postpone = true;
        this.cable_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.cable_bill_id);
        this.loadEvents();
        break;

      case "internet_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.internet_bill_amount;
        this.remaining_second_month += this.internet_bill_amount_2;
        this.data_service.removeAmount('internet_bill_amount');
        this.internet_bill_amount = 0;
        this.internet_bill_amount_2 = 0;
        this.internet_bill_amount_postpone = true;
        this.internet_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.internet_bill_id);
        this.loadEvents();
        break;

      case "electricity_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.electricity_bill_amount;
        this.remaining_second_month += this.electricity_bill_amount_2;
        this.data_service.removeAmount('electricity_bill_amount');
        this.electricity_bill_amount = 0;
        this.electricity_bill_amount_2 = 0;
        this.electricity_bill_amount_postpone = true;
        this.electricity_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.electricity_bill_id);
        this.loadEvents();
        break;

      case "generator_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.generator_bill_amount;
        this.remaining_second_month += this.generator_bill_amount_2;
        this.data_service.removeAmount('generator_bill_amount');
        this.generator_bill_amount = 0;
        this.generator_bill_amount_2 = 0;
        this.generator_bill_amount_postpone = true;
        this.generator_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.generator_bill_id);
        this.loadEvents();
        break;

      case "grocery_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.grocery_bill_amount;
        this.remaining_second_month += this.grocery_bill_amount_2;
        this.data_service.removeAmount('grocery_bill_amount');
        this.grocery_bill_amount = 0;
        this.grocery_bill_amount_2 = 0;
        this.grocery_bill_amount_postpone = true;
        this.grocery_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.grocery_bill_id);
        this.loadEvents();
        break;

      case "fuel_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.fuel_bill_amount;
        this.remaining_second_month += this.fuel_bill_amount_2;
        this.data_service.removeAmount('fuel_bill_amount');
        this.fuel_bill_amount = 0;
        this.fuel_bill_amount_2 = 0;
        this.fuel_bill_amount_postpone = true;
        this.fuel_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.fuel_bill_id);
        this.loadEvents();
        break;
      
      case "water_dispenser_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.water_dispenser_bill_amount;
        this.remaining_second_month += this.water_dispenser_bill_amount_2;
        this.data_service.removeAmount('water_dispenser_bill_amount');
        this.water_dispenser_bill_amount = 0;
        this.water_dispenser_bill_amount_2 = 0;
        this.water_dispenser_bill_amount_postpone = true;
        this.water_dispenser_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.water_dispenser_bill_id);
        this.loadEvents();
        break;

      case "phone_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.phone_bill_amount;
        this.remaining_second_month += this.phone_bill_amount_2;
        this.data_service.removeAmount('phone_bill_amount');
        this.phone_bill_amount = 0;
        this.phone_bill_amount_2 = 0;
        this.phone_bill_amount_postpone = true;
        this.phone_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.phone_bill_id);
        this.loadEvents();
        break;

      case "heating_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.heating_bill_amount;
        this.remaining_second_month += this.heating_bill_amount_2;
        this.data_service.removeAmount('heating_bill_amount');
        this.heating_bill_amount = 0;
        this.heating_bill_amount_2 = 0;
        this.heating_bill_amount_postpone = true;
        this.heating_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.heating_bill_id);
        this.loadEvents();
        break;

      case "bank_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.bank_fees_amount;
        this.remaining_second_month += this.bank_fees_amount_2;
        this.data_service.removeAmount('bank_fees_amount');
        this.bank_fees_amount = 0;
        this.bank_fees_amount_2 = 0;
        this.bank_fees_amount_postpone = true;
        this.bank_fees_amount_postpone_2 = true;
        this.local_notifications.cancel(this.bank_fees_id);
        this.loadEvents();
        break;

      case "school_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.school_fees_amount;
        this.remaining_second_month += this.school_fees_amount_2;
        this.data_service.removeAmount('school_fees_amount');
        this.school_fees_amount = 0;
        this.school_fees_amount_2 = 0;
        this.school_fees_amount_postpone = true;
        this.school_fees_amount_postpone_2 = true;
        this.local_notifications.cancel(this.school_fees_id);
        this.loadEvents();
        break;

      case "university_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.university_fees_amount;
        this.remaining_second_month += this.university_fees_amount_2;
        this.data_service.removeAmount('university_fees_amount');
        this.university_fees_amount = 0;
        this.university_fees_amount_2 = 0;
        this.university_fees_amount_postpone = true;
        this.university_fees_amount_postpone_2 = true;
        this.local_notifications.cancel(this.university_fees_id);
        this.loadEvents();
        break;

      case "car_periodic_maintenance_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.car_periodic_maintenance_fees_amount;
        this.remaining_second_month += this.car_periodic_maintenance_fees_amount_2;
        this.data_service.removeAmount('car_periodic_maintenance_fees_amount');
        this.car_periodic_maintenance_fees_amount = 0;
        this.car_periodic_maintenance_fees_amount_2 = 0;
        this.car_periodic_maintenance_fees_amount_postpone = true;
        this.car_periodic_maintenance_fees_amount_postpone_2 = true;
        this.local_notifications.cancel(this.car_periodic_maintenance_fees_id);
        this.loadEvents();
        break;

      case "rent_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.rent_fees_amount;
        this.remaining_second_month += this.rent_fees_amount_2;
        this.data_service.removeAmount('rent_fees_amount');
        this.rent_fees_amount = 0;
        this.rent_fees_amount_2 = 0;
        this.rent_fees_amount_postpone = true;
        this.rent_fees_amount_postpone_2 = true;
        this.local_notifications.cancel(this.rent_fees_id);
        this.loadEvents();
        break;

      case "veterinarian_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.veterinarian_fees_amount;
        this.remaining_second_month += this.veterinarian_fees_amount_2;
        this.data_service.removeAmount('veterianrian_fees_amount');
        this.veterinarian_fees_amount = 0;
        this.veterinarian_fees_amount_2 = 0;
        this.veterinarian_fees_amount_postpone = true;
        this.veterinarian_fees_amount_postpone_2 = true;
        this.local_notifications.cancel(this.veterinarian_fees_id);
        this.loadEvents();
        break;

      case "pet_food_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.pet_food_bill_amount;
        this.remaining_second_month += this.pet_food_bill_amount_2;
        this.data_service.removeAmount('pet_food_bill_amount');
        this.pet_food_bill_amount = 0;
        this.pet_food_bill_amount_2 = 0;
        this.pet_food_bill_amount_postpone = true;
        this.pet_food_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.pet_food_bill_id);
        this.loadEvents();
        break;

      case "vacation_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str);
        this.remaining += this.vacation_bill_amount;
        this.remaining_second_month += this.vacation_bill_amount_2;
        this.data_service.removeAmount('vacation_bill_amount');
        this.vacation_bill_amount = 0;
        this.vacation_bill_amount_2 = 0;
        this.vacation_bill_amount_postpone = true;
        this.vacation_bill_amount_postpone_2 = true;
        this.local_notifications.cancel(this.vacation_bill_id);
        this.loadEvents();
        break;
        
    }
  }
  //END deleteEvent(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START confirmExit();
  async confirmExit()
  {
    const alert = await this.alert_controller.create(
      {
        header: 'Are You Sure You Want To Exit?',
        cssClass: 'exit-app-alert',
        buttons: [
          {
            text: 'Cancel',
            cssClass: 'cancel-button', 
            handler: () => {
              return;
              
            }

          },
          {
            text: 'Exit',
            cssClass: 'exit-button',
            handler: () => {
              this.navigator_any.app.exitApp();
              
            }
          }
        ]
      }
    )

    await alert.present();

  }
  //END confirmExit()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START ngOnInit()
  ngOnInit() 
  {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.confirmExit();
    });

  }
  //END ngOnInit()

}
