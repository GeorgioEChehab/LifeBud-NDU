import { Component, ViewChild, OnInit, ProviderToken} from '@angular/core';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

import { IonicSelectableModule } from '@ionic-selectable/angular';
import { identity } from 'rxjs';

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
  date = new Date(); //gets today's date and used later for ion-datetime
  start: string = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60000).toISOString(); //convert date format
  start_minus_one : any; //equal to start time minus 1 minute
  event_source: any [] = []; //array where event will first be saved
  event = { title: '', amount: '', start: ''};
  backup: any [] = []; //array serves as backup for list
  income: number = 0; //user's income
  is_income: boolean = false; //in order to send only 1 alert
  count: number = 26; //used in disable()
  temp: string = 'false'; //used in disable to store the value of getTask()

  //id for the tasks
  property_tax_id: boolean = false;
  mechanic_tax_id: boolean = false;
  municipality_tax_id: boolean = false;
  car_insurance_fees_id: boolean = false;
  cable_bill_id: boolean = false;
  internet_bill_id: boolean = false;
  electricity_bill_id: boolean = false;
  generator_bill_id: boolean = false;
  grocery_bill_id: boolean = false;
  fuel_bill_id: boolean = false;
  water_dispenser_bill_id: boolean = false;
  phone_bill_id: boolean = false;
  heating_bill_id: boolean = false;
  bank_fees_id: boolean = false;
  credit_card_fees_id: boolean = false;
  school_fees_id: boolean = false;
  university_fees_id: boolean = false;
  car_maintenance_fees_id: boolean = false;
  car_periodic_maintenance_fees_id: boolean = false;
  rent_fees_id: boolean = false;
  veterinarian_fees_id: boolean = false;
  pet_food_bill_id: boolean = false;
  new_car_bill_id: boolean = false;
  new_house_bill_id: boolean = false;
  vacation_bill_id: boolean = false;
  paint_house_fees_id: boolean = false;
  other_id: boolean = false;
  //END variables

  deleteIncome()
  {
    console.log(this.income);
    this.data_service.removeAmount('income');
    console.log(this.income);
  }

  stopNot()
  {
    this.local_notifications.cancel(11);

  }


  car1: string;
  saveText() {
    const itemsRef = this.afdata_base.list('cars');
    itemsRef.push({ car: this.car1 });
    this.car1 = '';
  }

  saveOnCloud(input: string)
  {
    this.afdata_base.list('/Test1').push(
      {
      value: input
      });
  }
  
  
  addOnCloud(event: string)
  {
    const itemsRef = this.afdata_base.list(event);
    itemsRef.push({ Amount: this.amount_output });
    //this.saveOnCloud(this.title_output);
    this.amount_output = '';

  }

  async addInSec(event: string, id: number, money: any, money_type: string) //add mehtod with notification in seconds
  {
    if((this.start > this.start_minus_one) && (money > 0))
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

      this.event_source.push(event_copy);
      this.resetEvent();

    }
    else
      if((this.start < this.start_minus_one) || (money <= 0))
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


    await this.data_service.add(`Task Type: ${event} Date: ${this.day} - ${this.month} - ${this.year} - ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output}`);
    await this.data_service.addDataBackup(`Task Type: ${event} Date: ${this.day} - ${this.month} - ${this.year} - ${this.hour} - ${this.minute} Title: ${this.title_output} Amount: ${this.amount_output}`);

    

    this.data_service.setTask(event, 'true');
    this.data_service.setAmount(money_type, money);

    this.data_service.setRepeat('repeat', this.output);
    this.data_service.setRepeat('property_tax_repeat', true);

    this.addOnCloud(event);
    

    /*if(this.output == 'daily')
    {
      this.local_notifications.schedule(
        {
          id: 11,
          title: `${this.title_output}`,
          text: `${event}`,
          data: { mydata: 'My title this is'},
          trigger: {every: ELocalNotificationTriggerUnit.MINUTE}
  
        })
    }*/
    
    /*this.local_notifications.schedule(
      {
        id: 11,
        title: `${this.title_output}`,
        text: `${event}`,
        data: { mydata: 'My title this is'},
        trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND}

      }
    )*/

    this.output = '';
    this.loadEvents();

  }

  
  output: any = 'output';
  handleChange(e: any)
  {
    if(e.detail.value == 'daily')
      {
        console.log(this.output);
        this.output = e.detail.value;
        console.log(this.output);
        
      }
    else
      if(e.detail.value == 'monthly')
      {
        console.log(this.output);
        this.output = e.detail.value;
        console.log(this.output);
        
      }
      else
        if(e.detail.value == 'yearly')
        {
          console.log(this.output);
          this.output = e.detail.value;
          console.log(this.output);
          
        }
        else
        if(e.detail.value == 'none')
        {
          console.log(this.output);
          this.output = '';
          console.log(this.output);

        }

  }

  //Finished Code
  //START constructor()
  constructor(private data_service: DataService, private alert_controller: AlertController,
              private local_notifications: LocalNotifications, private plt: Platform,
              private afdata_base: AngularFireDatabase, private loading_controller: LoadingController)
  {
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
    this.loadScreen();
    
    setInterval(async () => 
    {
      this.list = await this.data_service.getData();
      this.backup = await this.data_service.getDataBackup();
      this.disableEvent();
      this.getIncome();
      //this.testP();
      

      if((this.list[0] == null) && (this.list[1] == null))
        this.list[0] = "Enter a New Reminder"; //if array is null then display msg
      else
        if((this.list[1] != null) && (this.list[0] == 'Enter a New Reminder'))
          this.list[0] == null; //used to remove the previous msg

    }, 1000);

    setInterval(async () =>
    {
      this.alertIncome();

    }, 3600000)

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
        duration: 2000
      });

    loading.present();
  }
  //END loadScreen

  //--------------------------------------------------------------------------------------------------------------------------------

  async addEvent(event: string) //method that adds the user's event
  {
    if((this.start > this.start_minus_one))
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

      this.event_source.push(event_copy);
      this.resetEvent();

    }
    else
      if((this.start < this.start_minus_one))
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

    await this.data_service.add(`Event: ${event} Title: ${this.title_output} on: ${this.day}- ${this.month}- ${this.year} -${this.hour}- ${this.minute}`);
    await this.data_service.addDataBackup(`Title: ${this.title_output} on: ${this.day}-
                                ${this.month}- ${this.year} -${this.hour}-${this.minute}`);

    

    this.data_service.setTask(event, 'true');
    
    //this.scheduleTest(event);

    this.loadEvents();

  }


  scheduleTest(event: string, id: number)
  {
    if(event == 'property_tax')
      {
        this.local_notifications.schedule(
          {
            id: id,
            title: `${this.title_output}`,
            text: `${this.start_output}`,
            data: { mydata: 'My title this is'},
            trigger: {in: 10, unit: ELocalNotificationTriggerUnit.SECOND}
    
          }
        )
      }
    else
      if(event == 'mechanic_tax')
      {
        this.local_notifications.schedule(
          {
            id: 1,
            title: `${this.title_output}`,
            text: `${this.start_output}`,
            data: { mydata: 'My title this is'},
            trigger: {in: 22, unit: ELocalNotificationTriggerUnit.SECOND}
    
          }
        )
      }
  }

  async deleteEvent(index: number)
  {
    this.data_service.remove(index);
    this.list.splice(index, 1);

  }

  //Later on add this method to add() method!!!!!!!!!!!!!!!!!!!!!!

  scheduleNot()
  {
    var month_temp;
    //this.addEvent();

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
    //this.addEvent();

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
                    cssClass: 'ok-button'

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
            this.property_tax_id = true;
          else
            this.property_tax_id = false;
          break;

        case 2:
          this.data_service.disableTask('mechanic_tax');
          this.temp = this.data_service.get_mechanic_tax;
          if(this.temp == 'true')
            this.mechanic_tax_id = true;
          else
            this.mechanic_tax_id = false;
          break;

        case 3:
          this.data_service.disableTask('municipality_tax');
          this.temp = this.data_service.get_municipality_tax;
          if(this.temp == 'true')
            this.municipality_tax_id = true;
          else
            this.municipality_tax_id = false;
          break;

        case 4:
          this.data_service.disableTask('car_insurance');
          this.temp = this.data_service.get_car_insurance_fees;
          if(this.temp == 'true')
            this.car_insurance_fees_id = true;
          else
            this.car_insurance_fees_id = false;
          break;

        case 5:
          this.data_service.disableTask('cable_bill');
          this.temp = this.data_service.get_cable_bill;
          if(this.temp == 'true')
            this.cable_bill_id = true;
          else
            this.cable_bill_id = false;
          break;

        case 6:
          this.data_service.disableTask('internet_bill');
          this.temp = this.data_service.get_internet_bill;
          if(this.temp == 'true')
            this.internet_bill_id = true;
          else
            this.internet_bill_id = false;
          break;

        case 7:
          this.data_service.disableTask('electricity_bill');
          this.temp = this.data_service.get_electricity_bill;
          if(this.temp == 'true')
            this.electricity_bill_id = true;
          else
            this.electricity_bill_id = false;
          break;

        case 8:
          this.data_service.disableTask('generator_bill');
          this.temp = this.data_service.get_generator_bill;
          if(this.temp == 'true')
            this.generator_bill_id = true;
          else
            this.generator_bill_id = false;
          break;

        case 9:
          this.data_service.disableTask('grocery_bill');
          this.temp = this.data_service.get_grocery_bill;
          if(this.temp == 'true')
            this.grocery_bill_id = true;
          else
            this.grocery_bill_id = false;
          break;

        case 10:
          this.data_service.disableTask('fuel_bill');
          this.temp = this.data_service.get_fuel_bill;
          if(this.temp == 'true')
            this.fuel_bill_id = true;
          else
            this.fuel_bill_id = false;
          break;

        case 11:
          this.data_service.disableTask('water_dispenser_bill');
          this.temp = this.data_service.get_water_dispenser_bill;
          if(this.temp == 'true')
            this.water_dispenser_bill_id = true;
          else
            this.water_dispenser_bill_id = false;
          break;

        case 12:
          this.data_service.disableTask('phone_bill');
          this.temp = this.data_service.get_phone_bill;
          if(this.temp == 'true')
            this.phone_bill_id = true;
          else
            this.phone_bill_id = false;
          break;

        case 13:
          this.data_service.disableTask('heating_bill');
          this.temp = this.data_service.get_heating_bill;
          if(this.temp == 'true')
            this.heating_bill_id = true;
          else
            this.heating_bill_id = false;
          break;

        case 14: 
        this.data_service.disableTask('bank_fees');
        this.temp = this.data_service.get_bank_fees;
        if(this.temp == 'true')
          this.bank_fees_id = true;
        else
          this.bank_fees_id = false;
        break;

        case 15:
          this.data_service.disableTask('credit_card_fees');
          this.temp = this.data_service.get_credit_card_fees;
          if(this.temp == 'true')
            this.credit_card_fees_id = true;
          else
            this.credit_card_fees_id = false;
          break;

        case 16:
          this.data_service.disableTask('school_fees');
          this.temp = this.data_service.get_school_fees;
          if(this.temp == 'true')
            this.school_fees_id = true;
          else
            this.school_fees_id = false;
          break;

        case 17:
          this.data_service.disableTask('university_fees');
          this.temp = this.data_service.get_university_fees;
          if(this.temp == 'true')
            this.university_fees_id = true;
          else
            this.university_fees_id = false;
          break;

        case 18:
          this.data_service.disableTask('car_maintenance_fees');
          this.temp = this.data_service.get_car_maintenance_fees;
          if(this.temp == 'true')
            this.car_maintenance_fees_id = true;
          else
            this.car_maintenance_fees_id = false;
          break;


        case 19:
          this.data_service.disableTask('car_periodic_maintenance_fees');
          this.temp = this.data_service.get_car_periodic_maintenance_fees;
          if(this.temp == 'true')
            this.car_periodic_maintenance_fees_id = true;
          else
            this.car_periodic_maintenance_fees_id = false;
          break;


        case 20:
          this.data_service.disableTask('rent_fees');
          this.temp = this.data_service.get_rent_fees;
          if(this.temp == 'true')
            this.rent_fees_id = true;
          else
            this.rent_fees_id = false;
          break;

        case 21:
          this.data_service.disableTask('veterinarian_fees');
          this.temp = this.data_service.get_veterinarian_fees;
          if(this.temp == 'true')
            this.veterinarian_fees_id = true;
          else
            this.veterinarian_fees_id = false;
          break;

        case 22:
          this.data_service.disableTask('pet_food_bill');
          this.temp = this.data_service.get_pet_food_bill;
          if(this.temp == 'true')
            this.pet_food_bill_id = true;
          else
            this.pet_food_bill_id = false;
          break;

        case 23:
          this.data_service.disableTask('new_house_bill');
          this.temp = this.data_service.get_new_house_bill;
          if(this.temp == 'true')
            this.new_house_bill_id = true;
          else
            this.new_house_bill_id = false;
          break;

        case 24:
          this.data_service.disableTask('new_car_bill');
          this.temp = this.data_service.get_new_car_bill;
          if(this.temp == 'true')
            this.new_car_bill_id = true;
          else
            this.new_car_bill_id = false;
          break;

        case 25:
          this.data_service.disableTask('vacation_bill');
          this.temp = this.data_service.get_vacation_bill;
          if(this.temp == 'true')
            this.vacation_bill_id = true;
          else
            this.vacation_bill_id = false;
          break;

        case 26:
          this.data_service.disableTask('paint_house_fees');
          this.temp = this.data_service.get_paint_house_fees;
          if(this.temp == 'true')
            this.paint_house_fees_id = true;
          else
            this.paint_house_fees_id = false;
          break;

      }
    }
  }
  //END disableEvent()

  //--------------------------------------------------------------------------------------------------------------------------------

}
