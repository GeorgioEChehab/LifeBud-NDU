import { Component, ViewChild, OnInit, ProviderToken} from '@angular/core';
import { AlertController, Platform, LoadingController, NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

import { IonicSelectableModule } from '@ionic-selectable/angular';
import { identity, min } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit
{
  //START variables
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
  amount_output: any; //amount to be used in output
  event_amount_output: any; //task amount
  event_cloud_output: any; //title to be uploaded to cloud
  speed: any; //to store what is the internet speed
  date: any; //gets today's date and used later for ion-datetime
  start: string //convert date format
  start_minus_one : any; //equal to start time minus 1 minute
  event_source: any [] = []; //array where event will first be saved
  event = { title: '', amount: '', start: ''};
  backup: any [] = []; //array serves as backup for list
  income: number = 0; //user's income
  is_income: boolean = false; //in order to send only 1 alert
  count: number = 26; //used in disable()
  temp: string = 'false'; //used in disable to store the value of getTask()
  id: number; //used to assign id to task for notification
  repeat_type: any = 'output'; //used to know if user requested a repeat

  //to see if it is disabled
  property_tax_disable: boolean = false;
  mechanic_tax_disable: boolean = false;
  municipality_tax_disable: boolean = false;
  car_insurance_fees_disable: boolean = false;
  cable_bill_disable: boolean = false;
  internet_bill_disable: boolean = false;
  electricity_bill_disable: boolean = false;
  generator_bill_disable: boolean = false;
  grocery_bill_disable: boolean = false;
  fuel_bill_disable: boolean = false;
  water_dispenser_bill_disable: boolean = false;
  phone_bill_disable: boolean = false;
  heating_bill_disable: boolean = false;
  bank_fees_disable: boolean = false;
  credit_card_fees_disable: boolean = false;
  school_fees_disable: boolean = false;
  university_fees_disable: boolean = false;
  car_maintenance_fees_disable: boolean = false;
  car_periodic_maintenance_fees_disable: boolean = false;
  rent_fees_disable: boolean = false;
  veterinarian_fees_disable: boolean = false;
  pet_food_bill_disable: boolean = false;
  new_car_bill_disable: boolean = false;
  new_house_bill_disable: boolean = false;
  vacation_bill_disable: boolean = false;
  paint_house_fees_disable: boolean = false;
  other_disable: boolean = false;

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
  credit_card_fees_id: number = 70;
  school_fees_id: number = 75;
  university_fees_id: number = 80;
  car_maintenance_fees_id: number = 85;
  car_periodic_maintenance_fees_id: number = 90;
  rent_fees_id: number = 95;
  veterinarian_fees_id: number = 100;
  pet_food_bill_id: number = 105;
  new_car_bill_id: number = 110;
  new_house_bill_id: number = 115;
  vacation_bill_id: number = 120;
  paint_house_fees_id: number = 125;
  other_id: number = 130;

  //END variables


  //START TESTING METHODS 
  //TO BE DELETED LATER IF WRONG


  //END TESTING METHODS

  //Finished Code
  //START constructor()
  constructor(private data_service: DataService, private alert_controller: AlertController,
              private local_notifications: LocalNotifications, private plt: Platform,
              private afdata_base: AngularFireDatabase, private loading_controller: LoadingController, private nav: NavController)
  {
    this.date = new Date();
    this.is_income = false;
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
  //END constructor

  //START loadEvents()
  async loadEvents() //method that load previous events that are saved on the memory
  {
    //this.loadScreen(7000);
    
    setInterval(async () => 
    {
      this.disableEvent();
      this.getIncome();

    }, 4000);

    setInterval(async () =>
    {
      this.alertIncome();

    }, 60000)

  }
  //END loadEvents()

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

  //START willRepeat(...)
  async willRepeat(event: any) //Checks if the user will repeat the task and add the task
  {
    if(this.repeat_type == 'daily')
    {
      this.splitDate();
      await this.data_service.add(`Task Type: ${event} Date: Every Day At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
      await this.data_service.addDataBackup(`Task Type: ${event} Date: Every Day At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
      this.data_service.setTask(event, 'true');
      this.data_service.setAmount(this.event_amount_output, this.amount_output);

      this.event_cloud_output = event;
      this.event_cloud_output += this.speed;
      this.addOnCloud(this.event_cloud_output);
      this.dailyNotification(event);
      this.data_service.setRepeat(event + '_repeat_daily', true);

    }
    else
      if(this.repeat_type == 'monthly')
      {
        this.splitDate();
        await this.data_service.add(`Task Type: ${event} Date: Every ${this.day}th At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
        await this.data_service.addDataBackup(`Task Type: ${event} Date: Every ${this.day}th At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
        this.data_service.setTask(event, 'true');
        this.data_service.setAmount(this.event_amount_output, this.amount_output);

        this.event_cloud_output = event;
        this.event_cloud_output += this.speed;
        this.addOnCloud(this.event_cloud_output);
        this.monthlyNotification(event);
        this.data_service.setRepeat(event + '_repeat_monthly', true);

      }
      else
        if(this.repeat_type == 'yearly')
        {
          this.splitDate();
          await this.data_service.add(`Task Type: ${event} Every: ${this.day} - ${this.month} - ${this.year} At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
          await this.data_service.addDataBackup(`Task Type: ${event} Every: ${this.day} - ${this.month} - ${this.year} At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
          this.data_service.setTask(event, 'true');
          this.data_service.setAmount(this.event_amount_output, this.amount_output);

          this.event_cloud_output = event;
          this.event_cloud_output += this.speed;
          this.addOnCloud(this.event_cloud_output);
          this.yearlyNotification(event);
          this.data_service.setRepeat(event + '_repeat_yearly', true);

        }
        else
        {
          this.splitDate();
          await this.data_service.add(`Task Type: ${event} Date: ${this.day} - ${this.month} - ${this.year} At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
          await this.data_service.addDataBackup(`Task Type: ${event} Date: ${this.day} - ${this.month} - ${this.year} At: ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output} $`);
          this.data_service.setTask(event, 'true');
          this.data_service.setAmount(this.event_amount_output, this.amount_output);

          this.event_cloud_output = event;
          this.event_cloud_output += this.speed;
          this.addOnCloud(this.event_cloud_output);
          this.notification(event);

        }
  }
  //END willRepeat(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START addEvent(...)
  async addEvent(event: string) //method that adds the user's event
  {
    if(this.start > this.start_minus_one)
    {
      let event_copy =
      {
        title: this.event.title,
        amount: this.event.amount,
        start: this.start,

      }

      this.title_output = this.event.title;
      this.amount_output = this.event.amount;
      this.start_output = this.start;

      this.event_amount_output = event + '_amount';

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

    this.willRepeat(event);

    this.repeat_type = '';
    this.speed = '';
    this.id = -99;
    this.loadEvents();

    this.loadScreen(5000);

  }
  //END addEvent(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START addOnCloud(...)
  addOnCloud(event: string) //Uploads prices inserted by users to the cloud
  {
    const itemsRef = this.afdata_base.list(event);
    itemsRef.push({ Amount: this.amount_output });
    this.amount_output = '';

  }
  //END addOnCloud(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START resetEvent()
  resetEvent() //reset value of event after adding task
  {
    this.event =
    {
      title: '',
      amount: '',
      start: '',

    };

    this.start = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();
    this.start_minus_one = new Date((this.date.getTime() - 60000) - this.date.getTimezoneOffset() * 60000).toISOString();

  }
  //END resetEvent()

  //--------------------------------------------------------------------------------------------------------------------------------
  
  //START ionViewDidEnter()
  ionViewDidEnter()
  {
    this.loadEvents();
    this.date = new Date();
    this.start = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString();
    
  }
  //END ionViewDidEnter()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START ngOnInit()
  ngOnInit()
  {
    this.resetEvent();

  }
  //END ngOnInit()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START showAlert()
  showAlert(head: any, sub: any, msg: any) //used for alert box
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
  //END showALert()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START handleChange(...)
  handleChange(e: any) //Checks if user chose a repeat value
  {
    if(e.detail.value == 'daily')
      {
        this.repeat_type = e.detail.value;
        
      }
    else
      if(e.detail.value == 'monthly')
      {
        this.repeat_type = e.detail.value;
        
      }
      else
        if(e.detail.value == 'yearly')
        {
          this.repeat_type = e.detail.value;
          
        }
        else
        if(e.detail.value == 'none')
        {
          this.repeat_type = '';

        }
  }
  //END handleChange(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START speedSelected(...)
  speedSelected(e: any) //Used in internet bill to get prices of different bundles
  {
    var temp = e.detail.value;
    switch(temp)
    {
      case '1mbps':
        this.speed = '_' + temp;
        break;

      case '2mbps':
        this.speed = '_' + temp;
        break;
      
      case '4mbps':
        this.speed = '_' + temp;
        break;

      case '6mbps':
        this.speed = '_' + temp;
        break;

      case '8mbps':
        this.speed = '_' + temp;
        break;

      case '10mbps':
        this.speed = '_' + temp;
        break;

    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  
  //START getId(...)
  getId(event: string)
  {
    switch(event)
    {
      case 'property_tax':
        this.id = this.property_tax_id;
        break;

      case 'mechanic_tax':
        this.id = this.mechanic_tax_id;
        break;

      case 'municipality_tax':
        this.id = this.municipality_tax_id;
        break;

      case 'car_insurance_fees':
      this.id = this.car_insurance_fees_id;
      break;

      case 'cable_bill':
      this.id = this.cable_bill_id;
      break;

      case 'internet_bill':
      this.id = this.internet_bill_id;
      break;

      case 'electricity_bill':
      this.id = this.electricity_bill_id;
      break;

      case 'generator_bill':
      this.id = this.generator_bill_id;
      break;

      case 'grocery_bill':
      this.id = this.grocery_bill_id;
      break;

      case 'fuel_bill':
      this.id = this.fuel_bill_id;
      break;

      case 'water_dispenser_bill':
      this.id = this.water_dispenser_bill_id;
      break;

      case 'phone_bill':
      this.id = this.phone_bill_id;
      break;

      case 'heating_bill':
      this.id = this.heating_bill_id;
      break;

      case 'bank_fees':
      this.id = this.bank_fees_id;
      break;

      case 'credit_card_fees':
      this.id = this.credit_card_fees_id;
      break;

      case 'school_fees':
      this.id = this.school_fees_id;
      break;

      case 'university_fees':
      this.id = this.university_fees_id;
      break;

      case 'car_maintenance_fees':
      this.id = this.car_maintenance_fees_id;
      break;

      case 'car_periodic_maintenance_fees':
      this.id = this.car_periodic_maintenance_fees_id;
      break;

      case 'rent_fees':
      this.id = this.rent_fees_id;
      break;

      case 'veterinarian_fees':
      this.id = this.veterinarian_fees_id;
      break;

      case 'pet_food_bill':
      this.id = this.pet_food_bill_id;
      break;

      case 'new_house_bill':
      this.id = this.internet_bill_id;
      break;

      case 'new_car_bill':
      this.id = this.new_car_bill_id;
      break;

      case 'vacation_bill':
      this.id = this.vacation_bill_id;
      break;

      case 'paint_house_fees':
      this.id = this.paint_house_fees_id;
      break;

    }
  }
  //END getId(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START Notification(...)
  notification(event: string) //Sends a notification
  {
    var month_temp = this.month - 1;

    this.local_notifications.schedule(
      {
        id: this.id,
        title: `${this.title_output}`,
        text: `${event}`,
        trigger:{at: new Date(this.year, month_temp, this.day, this.hour, this.minute)}

      }
    )
  }
  //END notification(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START dailyNotification(...)
  dailyNotification(event: string) //Sends a daily Notification
  {
    this.local_notifications.schedule(
      {
        id: this.id,
        title: `${this.title_output}`,
        text: `${event}`,
        trigger: {
          every: {
            hour: this.hour,
            minute: this.minute

          }
        }
      })
  }
  //END dailyNotification(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START monthlyNotification(...)
  monthlyNotification(event: string) //Sends a monthly notification
  {
    let time = new Date();
    time.setDate(this.day);
    time.setHours(this.hour);
    time.setMinutes(this.minute);

    this.local_notifications.schedule(
      {
        id: this.id,
        title: `${this.title_output}`,
        text: `${event}`,
        trigger: {every: {month: 1}, firstAt: time}

      })
  }
  //END monthlyNotification(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START yearlyNotification(...)
  yearlyNotification(event: string) //Sends a yearly notification
  {
    let time = new Date();
    time.setDate(this.day);
    time.setMonth(this.month);
    time.setHours(this.hour);
    time.setMinutes(this.minute);

    this.local_notifications.schedule(
      {
        id: this.id,
        title: `${this.title_output}`,
        text: `${event}`,
        trigger: {every: {year: 1}, firstAt: time}

      })
  }
  //END yearlyNotification(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START splitDate()
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
  //END sliptDate()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START addIncome()
  async addIncome() //add icome of user in order to calculate remaining balance after tasks
  {
    const alert = await this.alert_controller.create(
      {
        header: 'Please Enter Your Income',
        cssClass: 'add-income-alert',
        inputs:[
          {
            name: 'income',
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'cancel-button'
          },
          {
            text: 'Submit',
            cssClass: 'submit-button',
            handler: async (alertData) => {
              this.income = alertData.income;
              if(this.income > 0)
              {
                this.data_service.setAmount('income', this.income);

                const alert = await this.alert_controller.create({
                  cssClass: 'add-income-submit-alert',
                  message: 'Income Added',
                  buttons: [{
                    text: 'OK',
                    cssClass: 'ok-button',
                    handler: () => {
                      this.loadScreen(7000);
                    }

                  }],
                });
            
                await alert.present();
              }
              else
                if(this.income < 0)
                {
                  const alert = await this.alert_controller.create({
                    header: 'Error!',
                    cssClass: 'error-income-alert',
                    subHeader: 'Invalid Income',
                    message: 'Income Cannot Be Less Than Zero',
                    buttons: [{
                      text: 'OK',
                      cssClass: 'ok-button',
                      handler: () => {
                        this.addIncome();
                      }
                    }],
                  });
              
                  await alert.present();
                }
              else
                if(this.income == 0)
                {
                  const alert = await this.alert_controller.create({
                    header: 'Error!',
                    cssClass: 'error-income-alert',
                    subHeader: 'Invalid Income',
                    message: 'Income Cannot Be Equal To Zero',
                    buttons: [{
                      text: 'OK',
                      cssClass: 'ok-button',
                      handler: () => {
                        this.addIncome();
                      }
                    }],
                  });
              
                  await alert.present();
                }
                
                
            }
          }
        ]

      });
    await alert.present();
  }
  //END addIncome()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getIncome()
  getIncome() //get income value from storage
  {
    this.data_service.getAmount('income');
    if(this.data_service.get_income != null)
      this.income = this.data_service.get_income;
    else
      if(this.data_service.get_income == null)
        this.income = 0;

  }
  //END getIncome()

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

  //START disableEvent()
  disableEvent() //check if task is already added, and disable it if so
  {
    for(let i = 1; i <= this.count; i++)
    {
      switch(i)
      {
        case 1:
          this.data_service.disableTask('property_tax');
          this.temp = this.data_service.get_property_tax;
          if(this.temp == 'true')
            this.property_tax_disable = true;
          else
            this.property_tax_disable = false;
          break;

        case 2:
          this.data_service.disableTask('mechanic_tax');
          this.temp = this.data_service.get_mechanic_tax;
          if(this.temp == 'true')
            this.mechanic_tax_disable = true;
          else
            this.mechanic_tax_disable = false;
          break;

        case 3:
          this.data_service.disableTask('municipality_tax');
          this.temp = this.data_service.get_municipality_tax;
          if(this.temp == 'true')
            this.municipality_tax_disable = true;
          else
            this.municipality_tax_disable = false;
          break;

        case 4:
          this.data_service.disableTask('car_insurance_fees');
          this.temp = this.data_service.get_car_insurance_fees;
          if(this.temp == 'true')
            this.car_insurance_fees_disable = true;
          else
            this.car_insurance_fees_disable = false;
          break;

        case 5:
          this.data_service.disableTask('cable_bill');
          this.temp = this.data_service.get_cable_bill;
          if(this.temp == 'true')
            this.cable_bill_disable = true;
          else
            this.cable_bill_disable = false;
          break;

        case 6:
          this.data_service.disableTask('internet_bill');
          this.temp = this.data_service.get_internet_bill;
          if(this.temp == 'true')
            this.internet_bill_disable = true;
          else
            this.internet_bill_disable = false;
          break;

        case 7:
          this.data_service.disableTask('electricity_bill');
          this.temp = this.data_service.get_electricity_bill;
          if(this.temp == 'true')
            this.electricity_bill_disable = true;
          else
            this.electricity_bill_disable = false;
          break;

        case 8:
          this.data_service.disableTask('generator_bill');
          this.temp = this.data_service.get_generator_bill;
          if(this.temp == 'true')
            this.generator_bill_disable = true;
          else
            this.generator_bill_disable = false;
          break;

        case 9:
          this.data_service.disableTask('grocery_bill');
          this.temp = this.data_service.get_grocery_bill;
          if(this.temp == 'true')
            this.grocery_bill_disable = true;
          else
            this.grocery_bill_disable = false;
          break;

        case 10:
          this.data_service.disableTask('fuel_bill');
          this.temp = this.data_service.get_fuel_bill;
          if(this.temp == 'true')
            this.fuel_bill_disable = true;
          else
            this.fuel_bill_disable = false;
          break;

        case 11:
          this.data_service.disableTask('water_dispenser_bill');
          this.temp = this.data_service.get_water_dispenser_bill;
          if(this.temp == 'true')
            this.water_dispenser_bill_disable = true;
          else
            this.water_dispenser_bill_disable = false;
          break;

        case 12:
          this.data_service.disableTask('phone_bill');
          this.temp = this.data_service.get_phone_bill;
          if(this.temp == 'true')
            this.phone_bill_disable = true;
          else
            this.phone_bill_disable = false;
          break;

        case 13:
          this.data_service.disableTask('heating_bill');
          this.temp = this.data_service.get_heating_bill;
          if(this.temp == 'true')
            this.heating_bill_disable = true;
          else
            this.heating_bill_disable = false;
          break;

        case 14: 
        this.data_service.disableTask('bank_fees');
        this.temp = this.data_service.get_bank_fees;
        if(this.temp == 'true')
          this.bank_fees_disable = true;
        else
          this.bank_fees_disable = false;
        break;

        case 15:
          this.data_service.disableTask('credit_card_fees');
          this.temp = this.data_service.get_credit_card_fees;
          if(this.temp == 'true')
            this.credit_card_fees_disable = true;
          else
            this.credit_card_fees_disable = false;
          break;

        case 16:
          this.data_service.disableTask('school_fees');
          this.temp = this.data_service.get_school_fees;
          if(this.temp == 'true')
            this.school_fees_disable = true;
          else
            this.school_fees_disable = false;
          break;

        case 17:
          this.data_service.disableTask('university_fees');
          this.temp = this.data_service.get_university_fees;
          if(this.temp == 'true')
            this.university_fees_disable = true;
          else
            this.university_fees_disable = false;
          break;

        case 18:
          this.data_service.disableTask('car_maintenance_fees');
          this.temp = this.data_service.get_car_maintenance_fees;
          if(this.temp == 'true')
            this.car_maintenance_fees_disable = true;
          else
            this.car_maintenance_fees_disable = false;
          break;


        case 19:
          this.data_service.disableTask('car_periodic_maintenance_fees');
          this.temp = this.data_service.get_car_periodic_maintenance_fees;
          if(this.temp == 'true')
            this.car_periodic_maintenance_fees_disable = true;
          else
            this.car_periodic_maintenance_fees_disable = false;
          break;


        case 20:
          this.data_service.disableTask('rent_fees');
          this.temp = this.data_service.get_rent_fees;
          if(this.temp == 'true')
            this.rent_fees_disable = true;
          else
            this.rent_fees_disable = false;
          break;

        case 21:
          this.data_service.disableTask('veterinarian_fees');
          this.temp = this.data_service.get_veterinarian_fees;
          if(this.temp == 'true')
            this.veterinarian_fees_disable = true;
          else
            this.veterinarian_fees_disable = false;
          break;

        case 22:
          this.data_service.disableTask('pet_food_bill');
          this.temp = this.data_service.get_pet_food_bill;
          if(this.temp == 'true')
            this.pet_food_bill_disable = true;
          else
            this.pet_food_bill_disable = false;
          break;

        case 23:
          this.data_service.disableTask('new_house_bill');
          this.temp = this.data_service.get_new_house_bill;
          if(this.temp == 'true')
            this.new_house_bill_disable = true;
          else
            this.new_house_bill_disable = false;
          break;

        case 24:
          this.data_service.disableTask('new_car_bill');
          this.temp = this.data_service.get_new_car_bill;
          if(this.temp == 'true')
            this.new_car_bill_disable = true;
          else
            this.new_car_bill_disable = false;
          break;

        case 25:
          this.data_service.disableTask('vacation_bill');
          this.temp = this.data_service.get_vacation_bill;
          if(this.temp == 'true')
            this.vacation_bill_disable = true;
          else
            this.vacation_bill_disable = false;
          break;

        case 26:
          this.data_service.disableTask('paint_house_fees');
          this.temp = this.data_service.get_paint_house_fees;
          if(this.temp == 'true')
            this.paint_house_fees_disable = true;
          else
            this.paint_house_fees_disable = false;
          break;

      }
    }
  }
  //END disableEvent()

  //--------------------------------------------------------------------------------------------------------------------------------

}
