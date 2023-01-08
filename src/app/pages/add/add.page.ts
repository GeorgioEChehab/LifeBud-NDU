import { Component, ViewChild, OnInit, ProviderToken} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

import { IonicSelectableModule } from '@ionic-selectable/angular';
import { identity } from 'rxjs';

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
  property_tax_id: boolean = false;
  mechanic_tax_id: boolean = false;
  municipality_tax_id: boolean = false;
  car_insurance_id: boolean = false;
  cable_fees_id: boolean = false;
  internet_fees_id: boolean = false;
  electricity_fees_id: boolean = false;
  generator_id: boolean = false;
  grocery_id: boolean = false;
  fuel_id: boolean = false;
  water_dispenser_id: boolean = false;
  phone_bill_id: boolean = false;
  heating_id: boolean = false;
  bank_fees_id: boolean = false;
  credit_card_fees_id: boolean = false;
  school_university_fees_id: boolean = false;
  car_maintenance_id: boolean = false;
  car_periodic_maintenance_id: boolean = false;
  rent_fees_id: boolean = false;
  pet_veterinarian_fees_id: boolean = false;
  pet_food_fees_id: boolean = false;
  new_car_fees_id: boolean = false;
  new_house_fees_id: boolean = false;
  vacation_fees_id: boolean = false;
  paint_house_fees_id: boolean = false;
  other_id: boolean = false;

  property_test: number = 1;
  mechanic_test: number = 2;


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
    setInterval(async () => 
    {
      this.list = await this.data_service.getData();
      this.backup = await this.data_service.getDataBackup();
      
      this.callDisable();

      if((this.list[0] == null) && (this.list[1] == null))
        this.list[0] = "Enter a New Reminder"; //if array is null then display msg
      else
        if((this.list[1] != null) && (this.list[0] == 'Enter a New Reminder'))
          this.list[0] == null; //used to remove the previous msg

    }, 1000)
  }

  async addEvent(event: string) //method that adds the user's event
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

    await this.data_service.add(`Event: ${event} Title: ${this.title_output} on: ${this.day}-
                                ${this.month}- ${this.year} -${this.hour}- ${this.minute}`);
    await this.data_service.addDataBackup(`Title: ${this.title_output} on: ${this.day}-
                                ${this.month}- ${this.year} -${this.hour}-${this.minute}`);

    

    this.data_service.setTask(event, 'true');
    
    //this.scheduleTest(event);

    this.loadEvents();

  }

  async addInSec(event: string, id: number) //add mehtod with notification in seconds
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

    await this.data_service.add(`Event: ${event} Title: ${this.title_output} on: ${this.day}- ${this.month}- ${this.year} -${this.hour}- ${this.minute}`);
    await this.data_service.addDataBackup(`Title: ${this.title_output} on: ${this.day}- ${this.month}- ${this.year} -${this.hour}-${this.minute}`);

    

    this.data_service.setTask(event, 'true');
    
    this.scheduleTest(event, id);

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
            id: this.mechanic_test,
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

  callDisable() //Calls all methods disable of all the ids
  {
    this.disableProperty();
      this.disableMechanic();
      this.disableMuniciplaity();
      this.disableCarInsurance();
      this.disableCableFees();
      this.disableInternetFees();
      this.disableEletricityFees();
      this.disableGenerator();
      this.disableGrocery();
      this.disableFuel();
      this.disableWaterDispenser();
      this.disablePhoneBill();
      this.disableHeating();
      this.disableBankFees();
      this.disableCreditCard();
      this.disableEducation();
      this.disableCarMaintenance();
      this.disableCarPeriodicMaintenance();
      this.disableRentFees();
      this.disablePetVeterinarian();
      this.disablePetFood();
      this.disableNewCar();
      this.disableNewHouse();
      this.disableVacation();
      this.disablePaintHouse();

  }

  //Disable Accordions Methods
  disableProperty()
  {
    this.data_service.disableProperty('property_tax');
    const temp = this.data_service.property_tax;
    if(temp == 'true')
      this.property_tax_id = true;
    else
      this.property_tax_id = false;
  }

  disableMechanic()
  {
    this.data_service.disableMechanic('mechanic_tax');
    const temp = this.data_service.mechanic_tax;
    if(temp == 'true')
      this.mechanic_tax_id = true;
    else
      this.mechanic_tax_id = false;
  }

  disableMuniciplaity()
  {
    this.data_service.disableMuniciplality('municipality_tax');
    const temp = this.data_service.municipality;
    if(temp == 'true')
      this.municipality_tax_id = true;
    else
      this.municipality_tax_id = false;
  }

  disableCarInsurance()
  {
    this.data_service.disableCarInsurance('car_insurance');
    const temp = this.data_service.car_insurance;
    if(temp == 'true')
      this.car_insurance_id = true;
    else
      this.car_insurance_id = false;
  }

  disableCableFees()
  {
    this.data_service.disableCable('cable_fees');
    const temp = this.data_service.cable_fees;
    if(temp == 'true')
      this.cable_fees_id = true;
    else
      this.cable_fees_id = false;
  }

  disableInternetFees()
  {
    this.data_service.disableInternet('internet_fees');
    const temp = this.data_service.internet_fees;
    if(temp == 'true')
      this.internet_fees_id = true;
    else
      this.internet_fees_id = false;
  }

  disableEletricityFees()
  {
    this.data_service.disableElectricity('electricity_bill');
    const temp = this.data_service.electricity_fees;
    if(temp == 'true')
      this.electricity_fees_id = true;
    else
      this.electricity_fees_id = false;
  }

  disableGenerator()
  {
    this.data_service.disableGenerator('generator_bill');
    const temp = this.data_service.generator;
    if(temp == 'true')
      this.generator_id = true;
    else
      this.generator_id = false;
  }

  disableGrocery()
  {
    this.data_service.disableGrocery('grocery_bill');
    const temp = this.data_service.grocery;
    if(temp == 'true')
      this.grocery_id = true;
    else
      this.grocery_id = false;
  }

  disableFuel()
  {
    this.data_service.disableFuel('fuel_bill');
    const temp = this.data_service.fuel;
    if(temp == 'true')
      this.fuel_id = true;
    else
      this.fuel_id = false;
  }

  disableWaterDispenser()
  {
    this.data_service.disableWaterDispenser('water_dispenser_bill');
    const temp = this.data_service.water_dispenser;
    if(temp == 'true')
      this.water_dispenser_id = true;
    else
      this.water_dispenser_id = false;
  }

  disablePhoneBill()
  {
    this.data_service.disablePhoneBill('phone_bill');
    const temp = this.data_service.phone_bill;
    if(temp == 'true')
      this.phone_bill_id = true;
    else
      this.phone_bill_id = false;
  }

  disableHeating()
  {
    this.data_service.disableHeating('heating_bill');
    const temp = this.data_service.heating;
    if(temp == 'true')
      this.heating_id = true;
    else
      this.heating_id = false;
  }

  disableBankFees()
  {
    this.data_service.disableBankFees('bank_fees');
    const temp = this.data_service.bank_fees;
    if(temp == 'true')
      this.bank_fees_id = true;
    else
      this.bank_fees_id = false;
  }

  disableCreditCard()
  {
    this.data_service.disableCredirCardFees('credit_card_fees');
    const temp = this.data_service.credit_card_fees;
    if(temp == 'true')
      this.credit_card_fees_id = true;
    else
      this.credit_card_fees_id = false;
  }

  disableEducation()
  {
    this.data_service.disableEducation('education');
    const temp = this.data_service.school_university_fees;
    if(temp == 'true')
      this.school_university_fees_id = true;
    else
      this.school_university_fees_id = false;
  }

  disableCarMaintenance()
  {
    this.data_service.disableCarMaintenance('car_maintenance');
    const temp = this.data_service.car_maintenance;
    if(temp == 'true')
      this.car_maintenance_id = true;
    else
      this.car_maintenance_id = false;
  }

  disableCarPeriodicMaintenance()
  {
    this.data_service.disableCarPeriodicMaintenance('car_periodic_maintenance');
    const temp = this.data_service.car_periodic_maintenance;
    if(temp == 'true')
      this.car_periodic_maintenance_id = true;
    else
      this.car_periodic_maintenance_id = false;
  }

  disableRentFees()
  {
    this.data_service.disableRentFees('rent_fees');
    const temp = this.data_service.rent_fees;
    if(temp == 'true')
      this.rent_fees_id = true;
    else
      this.rent_fees_id = false;
  }

  disablePetVeterinarian()
  {
    this.data_service.disablePetVeterinarian('veterinarian_bill');
    const temp = this.data_service.pet_veterinarian_fees;
    if(temp == 'true')
      this.pet_veterinarian_fees_id = true;
    else
      this.pet_veterinarian_fees_id = false;
  }

  disablePetFood()
  {
    this.data_service.disablePetFood('pet_food_bill');
    const temp = this.data_service.pet_food;
    if(temp == 'true')
      this.pet_food_fees_id = true;
    else
      this.pet_food_fees_id = false;
  }

  disableNewCar()
  {
    this.data_service.disableNewCar('new_car_fees');
    const temp = this.data_service.new_car_fees;
    if(temp == 'true')
      this.new_car_fees_id = true;
    else
      this.new_car_fees_id = false;
  }

  disableNewHouse()
  {
    this.data_service.disableNewHouse('new_house_fees');
    const temp = this.data_service.new_house_fees;
    if(temp == 'true')
      this.new_house_fees_id = true;
    else
      this.new_house_fees_id = false;
  }

  disableVacation()
  {
    this.data_service.disableVacation('vacation_bill');
    const temp = this.data_service.vacation_fees;
    if(temp == 'true')
      this.vacation_fees_id = true;
    else
      this.vacation_fees_id = false;
  }

  disablePaintHouse()
  {
    this.data_service.disablePaintHouse('paint_house_bill');
    const temp = this.data_service.paint_house_fees;
    if(temp == 'true')
      this.paint_house_fees_id = true;
    else
      this.paint_house_fees_id = false;
  }

}
