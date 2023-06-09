import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-average',
  templateUrl: './average.page.html',
  styleUrls: ['./average.page.scss'],
})
export class AveragePage implements OnInit 
{
  //START Variables

  //Arrays to store the info of each task
  property_arr: any = [];
  mechanic_arr: any = [];
  municipality_tax_arr: any = [];
  car_insurance_arr: any = [];
  cable_arr: any = [];
  internet_arr_1mbps: any = [];
  internet_arr_2mbps: any = [];
  internet_arr_4mbps: any = [];
  internet_arr_6mbps: any = [];
  internet_arr_8mbps: any = [];
  internet_arr_10mbps: any = [];
  electricity_arr: any = [];
  generator_arr: any = [];
  grocery_arr: any = [];
  fuel_arr: any = [];
  water_dispenser_arr: any = [];
  phone_arr: any = [];
  heating_arr: any = [];
  bank_arr: any = [];
  credit_card_arr: any = [];
  school_arr: any = [];
  university_arr: any = [];
  car_maintenance_arr: any = [];
  car_periodic_maintenance_arr: any = [];
  rent_arr: any = [];
  veterinarian_fees_arr: any = [];
  pet_food_arr: any = [];
  new_car_arr: any = [];
  new_house_arr: any = [];
  paint_house_arr: any = [];
  vacation_arr: any = [];

  //--------------------------------------------------------------------------------------------------------------------------------

  //Variables to store element of task array at each index
  property_tax_amount: any = 'str';
  mechanic_tax_amount: any = 'str';
  municipality_tax_amount: any = 'str';
  car_insurance_amount: any = 'str';
  cable_bill_amount: any = 'str';
  internet_bill_1mbps_amount: any = 'str';
  internet_bill_2mbps_amount: any = 'str';
  internet_bill_4mbps_amount: any = 'str';
  internet_bill_6mbps_amount: any = 'str';
  internet_bill_8mbps_amount: any = 'str';
  internet_bill_10mbps_amount: any = 'str';
  electricity_bill_amount: any = 'str';
  generator_bill_amount: any = 'str';
  grocery_bill_amount: any = 'str';
  fuel_bill_amount: any = 'str';
  water_dispenser_bill_amount: any = 'str';
  phone_bill_amount: any = 'str';
  heating_bill_amount: any = 'str';
  bank_fees_amount: any = 'str';
  credit_card_fees_amount: any = 'str';
  school_fees_amount: any = 'str';
  university_fees_amount: any = 'str';
  car_maintenance_fees_amount: any = 'str';
  car_periodic_maintenance_fees_amount: any = 'str';
  rent_fees_amount: any = 'str';
  veterinarian_fees_amount: any = 'str';
  pet_food_bill_amount: any = 'str';
  new_car_bill_amount: any = 'str';
  new_house_bill_amount: any = 'str';
  vacation_bill_amount: any = 'str';
  paint_house_fees_amount: any = 'str';

  //--------------------------------------------------------------------------------------------------------------------------------

  //Variables to store the average of each task
  property_tax_avg: any = 'N/A';
  mechanic_tax_avg: any = 'N/A';
  municipality_tax_avg: any = 'N/A';
  car_insurance_avg: any = 'N/A';
  cable_bill_avg: any = 'N/A';
  internet_bill_1mbps_avg: any = 'N/A';
  internet_bill_2mbps_avg: any = 'N/A';
  internet_bill_4mbps_avg: any = 'N/A';
  internet_bill_6mbps_avg: any = 'N/A';
  internet_bill_8mbps_avg: any = 'N/A';
  internet_bill_10mbps_avg: any = 'N/A';
  electricity_bill_avg: any = 'N/A';
  generator_bill_avg: any = 'N/A';
  grocery_bill_avg: any = 'N/A';
  fuel_bill_avg: any = 'N/A';
  water_dispenser_bill_avg: any = 'N/A';
  phone_bill_avg: any = 'N/A';
  heating_bill_avg: any = 'N/A';
  bank_fees_avg: any = 'N/A';
  credit_card_fees_avg: any = 'N/A';
  school_fees_avg: any = 'N/A';
  university_fees_avg: any = 'N/A';
  car_maintenance_fees_avg: any = 'N/A';
  car_periodic_maintenance_fees_avg: any = 'N/A';
  rent_fees_avg: any = 'N/A';
  veterinarian_fees_avg: any = 'N/A';
  pet_food_bill_avg: any = 'N/A';
  new_car_bill_avg: any = 'N/A';
  new_house_bill_avg: any = 'N/A';
  vacation_bill_avg: any = 'N/A';
  paint_house_fees_avg: any = 'N/A';
  
 

  is_online: boolean = false; //To save if the app has connection or not
  //END Variables

  //--------------------------------------------------------------------------------------------------------------------------------

  //START constructor()
  constructor(private afdata_base: AngularFireDatabase, private loading_controller: LoadingController,
              private router: Router, private network: Network, private platform: Platform,
              private alert_controller: AlertController) 
  {
    this.loadEvents();

    //this.property_tax_avg = 1009;

  }
  //END constructor()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START loadEvents()
  async loadEvents() //Method that load previous events that are saved on the memory
  {
    this.loadScreen(2000);
    this.resetAvg();
    this.getCloudData(); 
    this.getAvg();

    setInterval(async () =>
    {
      this.resetAvg();
      this.getAvg();

    }, 2000);

    setInterval(async() =>
    {
      this.checkConnection();

    }, 8000)

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

  //START ionViewDidEnter()
  ionViewDidEnter()
  {
    this.getCloudData(); 
    this.getAvg();
    this.resetAvg();

    console.log(`!!: ${this.mechanic_tax_avg}`);

    this.network.onDisconnect().subscribe(() => {
      this.is_online = false;

    });

    this.network.onConnect().subscribe(() => {
      this.is_online = true;

    });

    if(!this.network.type)
      this.is_online = false;
    
    setTimeout(() =>
    {
      this.getAvg();
      this.checkConnection();

    }, 2000)
  }
  //END ionViewDidEnter()

  ionViewDidLeave()
  {
    this.is_online = true;

  }

  //--------------------------------------------------------------------------------------------------------------------------------

  //START loadScreen(...)
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
  //END loadScreen(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START resetAvg()
  resetAvg() //resets all the avg to 0
  {
    this.property_tax_avg = 0;
    this.mechanic_tax_avg = 0;
    this.municipality_tax_avg = 0;
    this.car_insurance_avg = 0;
    this.cable_bill_avg = 0;
    this.internet_bill_1mbps_avg = 0;
    this.internet_bill_2mbps_avg = 0;
    this.internet_bill_4mbps_avg = 0;
    this.internet_bill_6mbps_avg = 0;
    this.internet_bill_8mbps_avg = 0;
    this.internet_bill_10mbps_avg = 0;
    this.electricity_bill_avg = 0;
    this.generator_bill_avg = 0;
    this.grocery_bill_avg = 0;
    this.fuel_bill_avg = 0;
    this.water_dispenser_bill_avg = 0;
    this.phone_bill_avg = 0;
    this.heating_bill_avg = 0;
    this.bank_fees_avg = 0;
    this.credit_card_fees_avg = 0;
    this.school_fees_avg = 0;
    this.university_fees_avg = 0;
    this.car_maintenance_fees_avg = 0;
    this.car_periodic_maintenance_fees_avg = 0;
    this.rent_fees_avg = 0;
    this.veterinarian_fees_avg = 0;
    this.pet_food_bill_avg = 0;
    this.new_car_bill_avg = 0;
    this.new_house_bill_avg = 0;
    this.vacation_bill_avg = 0;
    this.paint_house_fees_avg = 0;

  }
  //END resetAvg()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START add()
  add() //Jumps to add page
  {
    this.router.navigate(['tabs/add'])
  }
  //END add()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START checkConnection()
  async checkConnection() //Checks if the app has connection if not display message
  {
    if(this.network.type != 'none')
      this.is_online = true;
    else
    {
      if(this.is_online == false)
      {
        const old_alert = await this.alert_controller.getTop();

        if(!old_alert)
        {
          const alert = await this.alert_controller.create({
            cssClass: 'check-connection-alert',
            header: 'Alert, No Internet Connection',
            message: 'Fix Connection To Have Updated Average Prices',
            buttons: [{
              text: 'OK',
              cssClass: 'connection-ok-button'
    
            }],
          });
    
          await alert.present();
        }
      }
    }
  }
  //END checkConnection

  //--------------------------------------------------------------------------------------------------------------------------------

  //STARt getCloudData
  getCloudData() //Gets users data from firebase
  {
    this.afdata_base.list('property_tax').valueChanges().subscribe(values =>
      {this.property_arr = values});

    this.afdata_base.list('mechanic_tax').valueChanges().subscribe(values =>
      {this.mechanic_arr = values});

    this.afdata_base.list('municipality_tax').valueChanges().subscribe(values =>
      {this.municipality_tax_arr = values});

    this.afdata_base.list('car_insurance_fees').valueChanges().subscribe(values =>
      {this.car_insurance_arr = values});
      
    this.afdata_base.list('cable_bill').valueChanges().subscribe(values =>
      {this.cable_arr = values});

    this.afdata_base.list('internet_bill_1mbps').valueChanges().subscribe(values =>
      {this.internet_arr_1mbps = values});

    this.afdata_base.list('internet_bill_2mbps').valueChanges().subscribe(values =>
      {this.internet_arr_2mbps = values});

    this.afdata_base.list('internet_bill_4mbps').valueChanges().subscribe(values =>
      {this.internet_arr_4mbps = values});

    this.afdata_base.list('internet_bill_6mbps').valueChanges().subscribe(values =>
      {this.internet_arr_6mbps = values});

    this.afdata_base.list('internet_bill_8mbps').valueChanges().subscribe(values =>
      {this.internet_arr_8mbps = values});

    this.afdata_base.list('internet_bill_10mbps').valueChanges().subscribe(values =>
      {this.internet_arr_10mbps = values});

    this.afdata_base.list('electricity_bill').valueChanges().subscribe(values =>
      {this.electricity_arr = values});

    this.afdata_base.list('generator_bill').valueChanges().subscribe(values =>
      {this.generator_arr = values});

    this.afdata_base.list('grocery_bill').valueChanges().subscribe(values =>
      {this.grocery_arr = values});

    this.afdata_base.list('fuel_bill').valueChanges().subscribe(values =>
      {this.fuel_arr = values});

    this.afdata_base.list('water_dispenser_bill').valueChanges().subscribe(values =>
      {this.water_dispenser_arr = values});

    this.afdata_base.list('phone_bill').valueChanges().subscribe(values =>
      {this.phone_arr = values});

    this.afdata_base.list('heating_bill').valueChanges().subscribe(values =>
      {this.heating_arr = values});

    this.afdata_base.list('bank_fees').valueChanges().subscribe(values =>
      {this.bank_arr = values});

    this.afdata_base.list('credit_card_fees').valueChanges().subscribe(values =>
      {this.credit_card_arr = values});

    this.afdata_base.list('school_fees').valueChanges().subscribe(values =>
      {this.school_arr = values});

    this.afdata_base.list('university_fees').valueChanges().subscribe(values =>
      {this.university_arr = values});

    this.afdata_base.list('car_maintenance_fees').valueChanges().subscribe(values =>
      {this.car_maintenance_arr = values});

    this.afdata_base.list('car_periodic_maintenance_fees').valueChanges().subscribe(values =>
      {this.car_periodic_maintenance_arr = values});

    this.afdata_base.list('rent_fees').valueChanges().subscribe(values =>
      {this.rent_arr = values});

    this.afdata_base.list('pet_veterinarians_fees').valueChanges().subscribe(values =>
      {this.veterinarian_fees_arr = values});

    this.afdata_base.list('pet_food_bill').valueChanges().subscribe(values =>
      {this.pet_food_arr = values});

    this.afdata_base.list('new_car_bill').valueChanges().subscribe(values =>
      {this.new_car_arr = values});

    this.afdata_base.list('new_house_bill').valueChanges().subscribe(values =>
      {this.new_house_arr = values});

    this.afdata_base.list('paint_house_fees').valueChanges().subscribe(values =>
      {this.paint_house_arr = values});

    this.afdata_base.list('vacation_bill').valueChanges().subscribe(values =>
      {this.vacation_arr = values});
            
  }
  //END getCloudData

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getAvg()
  getAvg() //Gets average of each task
  {
    this.getPropertyAvg();
    this.getMechanicAvg();
    this.getMunicipalityAvg();
    this.getCarInsuranceAvg();
    this.getCableAvg();
    this.getInternet1MbpsAvg();
    this.getInternet2MbpsAvg();
    this.getInternet4MbpsAvg();
    this.getInternet6MbpsAvg();
    this.getInternet8MbpsAvg();
    this.getInternet10MbpsAvg();
    this.getElectricityAvg();
    this.getGeneratorAvg();
    this.getGroceryAvg();
    this.getFuelAvg();
    this.getWaterDispenserAvg();
    this.getPhoneAvg();
    this.getHeatingAvg();
    this.getBankAvg();
    this.getCreditCardAvg();
    this.getSchoolAvg();
    this.getUniversityAvg();
    this.getCarMaintenanceAvg();
    this.getCarPeriodicAvg();
    this.getRentAvg();
    this.getPetVeterinariranAvg();
    this.getPetFoodAvg();
    this.getNewCarAvg();
    this.getNewHouseAvg();
    this.getVacationAvg();
    this.getPaintHouseAvg();

  }
  //END getAvg()

  //--------------------------------------------------------------------------------------------------------------------------------
  
  //START Get Tasks Avg
  
  getPropertyAvg() //Gets average of task property
  {
    
    if(this.property_tax_avg == 0)
      this.property_tax_avg = 'N/A';

    for(let i = 0; i < this.property_arr.length; i++)
    {
      console.log(i)
      this.property_tax_amount = this.property_arr[i];
      this.property_tax_amount = JSON.stringify(this.property_tax_amount);
      var format1 = this.property_tax_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.property_tax_amount = format1;
      this.property_tax_amount = parseFloat(this.property_tax_amount);

      if(this.property_tax_avg == 'N/A')
      {
        this.property_tax_avg = 0;
        if(this.property_tax_amount >= 1)
        this.property_tax_avg += this.property_tax_amount;
      }
      else
        if(this.property_tax_amount >= 1)
        this.property_tax_avg += this.property_tax_amount;

    }
    
    if(this.property_tax_avg > 0)
    {
      this.property_tax_avg /= this.property_arr.length;
      this.property_tax_avg = (Math.round(this.property_tax_avg));
    } 
  }
  
  getMechanicAvg()
  {
    if(this.mechanic_tax_avg == 0)
      this.mechanic_tax_avg = 'N/A';
    for(let i = 0; i < this.mechanic_arr.length; i++)
    {
      //console.log(i);
      this.mechanic_tax_amount = this.mechanic_arr[i];
      this.mechanic_tax_amount = JSON.stringify(this.mechanic_tax_amount);
      var format1 = this.mechanic_tax_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.mechanic_tax_amount = format1;
      this.mechanic_tax_amount = parseFloat(this.mechanic_tax_amount);
      if(this.mechanic_tax_avg == 'N/A')
      {
        this.mechanic_tax_avg = 0;
        if(this.mechanic_tax_amount >= 1)
        this.mechanic_tax_avg += this.mechanic_tax_amount;
      }
      else
        if(this.mechanic_tax_amount >= 1)
        this.mechanic_tax_avg += this.mechanic_tax_amount;

    }
    
    if(this.mechanic_tax_avg > 0)
    {
      this.mechanic_tax_avg /= this.mechanic_arr.length;
      this.mechanic_tax_avg = (Math.round(this.mechanic_tax_avg));
    }
  }

  getMunicipalityAvg()
  {
    if(this.municipality_tax_avg == 0)
      this.municipality_tax_avg = 'N/A';
    for(let i = 0; i < this.municipality_tax_arr.length; i++)
    {
      this.municipality_tax_amount = this.municipality_tax_arr[i];
      this.municipality_tax_amount = JSON.stringify(this.municipality_tax_amount);
      var format1 = this.municipality_tax_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.municipality_tax_amount = format1;
      this.municipality_tax_amount = parseFloat(this.municipality_tax_amount);
      if(this.municipality_tax_avg == 'N/A')
      {
        this.municipality_tax_avg = 0;
        if(this.municipality_tax_amount >= 1)
        this.municipality_tax_avg += this.municipality_tax_amount;
      }
      else
        if(this.municipality_tax_amount >= 1)
        this.municipality_tax_avg += this.municipality_tax_amount;

    }
    
    if(this.municipality_tax_avg > 0)
    {
      this.municipality_tax_avg /= this.municipality_tax_arr.length;
      this.municipality_tax_avg = (Math.round(this.municipality_tax_avg));
    }
  }

  getCarInsuranceAvg()
  {
    if(this.car_insurance_avg == 0)
      this.car_insurance_avg = 'N/A';
    for(let i = 0; i < this.car_insurance_arr.length; i++)
    {
      this.car_insurance_amount = this.car_insurance_arr[i];
      this.car_insurance_amount = JSON.stringify(this.car_insurance_amount);
      var format1 = this.car_insurance_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.car_insurance_amount = format1;
      this.car_insurance_amount = parseFloat(this.car_insurance_amount);
      if(this.car_insurance_avg == 'N/A')
      {
        this.car_insurance_avg = 0;
        if(this.car_insurance_amount >= 1)
        this.car_insurance_avg += this.car_insurance_amount;
      }
      else
        if(this.car_insurance_amount >= 1)
        this.car_insurance_avg += this.car_insurance_amount;

    }
    
    if(this.car_insurance_avg > 0)
    {
      this.car_insurance_avg /= this.car_insurance_arr.length;
      this.car_insurance_avg = (Math.round(this.car_insurance_avg));
    }
  }

  getCableAvg()
  {
    if(this.cable_bill_avg == 0)
      this.cable_bill_avg = 'N/A';
    for(let i = 0; i < this.cable_arr.length; i++)
    {
      this.cable_bill_amount = this.cable_arr[i];
      this.cable_bill_amount = JSON.stringify(this.cable_bill_amount);
      var format1 = this.cable_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.cable_bill_amount = format1;
      this.cable_bill_amount = parseFloat(this.cable_bill_amount);
      if(this.cable_bill_avg == 'N/A')
      {
        this.cable_bill_avg = 0;
        if(this.cable_bill_amount >= 1)
        this.cable_bill_avg += this.cable_bill_amount;
      }
      else
        if(this.cable_bill_amount >= 1)
        this.cable_bill_avg += this.cable_bill_amount;

    }
    
    if(this.cable_bill_avg > 0)
    {
      this.cable_bill_avg /= this.cable_arr.length;
      this.cable_bill_avg = (Math.round(this.cable_bill_avg));
    }
  }

  getInternet1MbpsAvg()
  {
    if(this.internet_bill_1mbps_avg == 0)
      this.internet_bill_1mbps_avg = 'N/A';
    for(let i = 0; i < this.internet_arr_1mbps.length; i++)
    {
      this.internet_bill_1mbps_amount = this.internet_arr_1mbps[i];
      this.internet_bill_1mbps_amount = JSON.stringify(this.internet_bill_1mbps_amount);
      var format1 = this.internet_bill_1mbps_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.internet_bill_1mbps_amount = format1;
      this.internet_bill_1mbps_amount = parseFloat(this.internet_bill_1mbps_amount);
      if(this.internet_bill_1mbps_avg == 'N/A')
      {
        this.internet_bill_1mbps_avg = 0;
        if(this.internet_bill_1mbps_amount >= 1)
        this.internet_bill_1mbps_avg += this.internet_bill_1mbps_amount;
      }
      else
        if(this.internet_bill_1mbps_amount >= 1)
        this.internet_bill_1mbps_avg += this.internet_bill_1mbps_amount;

    }
    
    if(this.internet_bill_1mbps_avg > 0)
    {
      this.internet_bill_1mbps_avg /= this.internet_arr_1mbps.length;
      this.internet_bill_1mbps_avg = (Math.round(this.internet_bill_1mbps_avg));
    }
  }

  getInternet2MbpsAvg()
  {
    if(this.internet_bill_2mbps_avg == 0)
      this.internet_bill_2mbps_avg = 'N/A';
    for(let i = 0; i < this.internet_arr_2mbps.length; i++)
    {
      this.internet_bill_2mbps_amount = this.internet_arr_2mbps[i];
      this.internet_bill_2mbps_amount = JSON.stringify(this.internet_bill_2mbps_amount);
      var format1 = this.internet_bill_2mbps_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.internet_bill_2mbps_amount = format1;
      this.internet_bill_2mbps_amount = parseFloat(this.internet_bill_2mbps_amount);
      if(this.internet_bill_2mbps_avg == 'N/A')
      {
        this.internet_bill_2mbps_avg = 0;
        if(this.internet_bill_2mbps_amount >= 1)
        this.internet_bill_2mbps_avg += this.internet_bill_2mbps_amount;
      }
      else
        if(this.internet_bill_2mbps_amount >= 1)
        this.internet_bill_2mbps_avg += this.internet_bill_2mbps_amount;

    }
    
    if(this.internet_bill_2mbps_avg > 0)
    {
      this.internet_bill_2mbps_avg /= this.internet_arr_2mbps.length;
      this.internet_bill_2mbps_avg = (Math.round(this.internet_bill_2mbps_avg));
    }
  }

  getInternet4MbpsAvg()
  {
    if(this.internet_bill_4mbps_avg == 0)
      this.internet_bill_4mbps_avg = 'N/A';
    for(let i = 0; i < this.internet_arr_4mbps.length; i++)
    {
      this.internet_bill_4mbps_amount = this.internet_arr_4mbps[i];
      this.internet_bill_4mbps_amount = JSON.stringify(this.internet_bill_4mbps_amount);
      var format1 = this.internet_bill_4mbps_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.internet_bill_4mbps_amount = format1;
      this.internet_bill_4mbps_amount = parseFloat(this.internet_bill_4mbps_amount);
      if(this.internet_bill_4mbps_avg == 'N/A')
      {
        this.internet_bill_4mbps_avg = 0;
        if(this.internet_bill_4mbps_amount >= 1)
        this.internet_bill_4mbps_avg += this.internet_bill_4mbps_amount;
      }
      else
        if(this.internet_bill_4mbps_amount >= 1)
        this.internet_bill_4mbps_avg += this.internet_bill_4mbps_amount;

    }
    
    if(this.internet_bill_4mbps_avg > 0)
    {
      this.internet_bill_4mbps_avg /= this.internet_arr_4mbps.length;
      this.internet_bill_4mbps_avg = (Math.round(this.internet_bill_4mbps_avg));
    }
  }

  getInternet6MbpsAvg()
  {
    if(this.internet_bill_6mbps_avg == 0)
      this.internet_bill_6mbps_avg = 'N/A';
    for(let i = 0; i < this.internet_arr_6mbps.length; i++)
    {
      this.internet_bill_6mbps_amount = this.internet_arr_6mbps[i];
      this.internet_bill_6mbps_amount = JSON.stringify(this.internet_bill_6mbps_amount);
      var format1 = this.internet_bill_6mbps_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.internet_bill_6mbps_amount = format1;
      this.internet_bill_6mbps_amount = parseFloat(this.internet_bill_6mbps_amount);
      if(this.internet_bill_6mbps_avg == 'N/A')
      {
        this.internet_bill_6mbps_avg = 0;
        if(this.internet_bill_6mbps_amount >= 1)
        this.internet_bill_6mbps_avg += this.internet_bill_6mbps_amount;
      }
      else
        if(this.internet_bill_6mbps_amount >= 1)
        this.internet_bill_6mbps_avg += this.internet_bill_6mbps_amount;

    }
    
    if(this.internet_bill_6mbps_avg > 0)
    {
      this.internet_bill_6mbps_avg /= this.internet_arr_6mbps.length;
      this.internet_bill_6mbps_avg = (Math.round(this.internet_bill_6mbps_avg));
    }
  }

  getInternet8MbpsAvg()
  {
    if(this.internet_bill_8mbps_avg == 0)
      this.internet_bill_8mbps_avg = 'N/A';
    for(let i = 0; i < this.internet_arr_8mbps.length; i++)
    {
      this.internet_bill_8mbps_amount = this.internet_arr_8mbps[i];
      this.internet_bill_8mbps_amount = JSON.stringify(this.internet_bill_8mbps_amount);
      var format1 = this.internet_bill_8mbps_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.internet_bill_8mbps_amount = format1;
      this.internet_bill_8mbps_amount = parseFloat(this.internet_bill_8mbps_amount);
      if(this.internet_bill_8mbps_avg == 'N/A')
      {
        this.internet_bill_8mbps_avg = 0;
        if(this.internet_bill_8mbps_amount >= 1)
        this.internet_bill_8mbps_avg += this.internet_bill_8mbps_amount;
      }
      else
        if(this.internet_bill_8mbps_amount >= 1)
        this.internet_bill_8mbps_avg += this.internet_bill_8mbps_amount;

    }
    
    if(this.internet_bill_8mbps_avg > 0)
    {
      this.internet_bill_8mbps_avg /= this.internet_arr_8mbps.length;
      this.internet_bill_8mbps_avg = (Math.round(this.internet_bill_8mbps_avg));
    }
  }

  getInternet10MbpsAvg()
  {
    if(this.internet_bill_10mbps_avg == 0)
      this.internet_bill_10mbps_avg = 'N/A';
    for(let i = 0; i < this.internet_arr_10mbps.length; i++)
    {
      this.internet_bill_10mbps_amount = this.internet_arr_10mbps[i];
      this.internet_bill_10mbps_amount = JSON.stringify(this.internet_bill_10mbps_amount);
      var format1 = this.internet_bill_10mbps_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.internet_bill_10mbps_amount = format1;
      this.internet_bill_10mbps_amount = parseFloat(this.internet_bill_10mbps_amount);
      if(this.internet_bill_10mbps_avg == 'N/A')
      {
        this.internet_bill_10mbps_avg = 0;
        if(this.internet_bill_10mbps_amount >= 1)
        this.internet_bill_10mbps_avg += this.internet_bill_10mbps_amount;
      }
      else
        if(this.internet_bill_10mbps_amount >= 1)
        this.internet_bill_10mbps_avg += this.internet_bill_10mbps_amount;

    }
    
    if(this.internet_bill_10mbps_avg > 0)
    {
      this.internet_bill_10mbps_avg /= this.internet_arr_10mbps.length;
      this.internet_bill_10mbps_avg = (Math.round(this.internet_bill_10mbps_avg));
    }
  }

  getElectricityAvg()
  {
    if(this.electricity_bill_avg == 0)
      this.electricity_bill_avg = 'N/A';
    for(let i = 0; i < this.electricity_arr.length; i++)
    {
      this.electricity_bill_amount = this.electricity_arr[i];
      this.electricity_bill_amount = JSON.stringify(this.electricity_bill_amount);
      var format1 = this.electricity_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.electricity_bill_amount = format1;
      this.electricity_bill_amount = parseFloat(this.electricity_bill_amount);
      if(this.electricity_bill_avg == 'N/A')
      {
        this.electricity_bill_avg = 0;
        if(this.electricity_bill_amount >= 1)
        this.electricity_bill_avg += this.electricity_bill_amount;
      }
      else
        if(this.electricity_bill_amount >= 1)
        this.electricity_bill_avg += this.electricity_bill_amount;

    }
    
    if(this.electricity_bill_avg > 0)
    {
      this.electricity_bill_avg /= this.electricity_arr.length;
      this.electricity_bill_avg = (Math.round(this.electricity_bill_avg));
    }
  }

  getGeneratorAvg()
  {
    if(this.generator_bill_avg == 0)
      this.generator_bill_avg = 'N/A';
    for(let i = 0; i < this.generator_arr.length; i++)
    {
      this.generator_bill_amount = this.generator_arr[i];
      this.generator_bill_amount = JSON.stringify(this.generator_bill_amount);
      var format1 = this.generator_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.generator_bill_amount = format1;
      this.generator_bill_amount = parseFloat(this.generator_bill_amount);
      if(this.generator_bill_avg == 'N/A')
      {
        this.generator_bill_avg = 0;
        if(this.generator_bill_amount >= 1)
        this.generator_bill_avg += this.generator_bill_amount;
      }
      else
        if(this.generator_bill_amount >= 1)
        this.generator_bill_avg += this.generator_bill_amount;

    }
    
    if(this.generator_bill_avg > 0)
    {
      this.generator_bill_avg /= this.generator_arr.length;
      this.generator_bill_avg = (Math.round(this.generator_bill_avg));
    }
  }

  getGroceryAvg()
  {
    if(this.grocery_bill_avg == 0)
      this.grocery_bill_avg = 'N/A';
    for(let i = 0; i < this.grocery_arr.length; i++)
    {
      this.grocery_bill_amount = this.grocery_arr[i];
      this.grocery_bill_amount = JSON.stringify(this.grocery_bill_amount);
      var format1 = this.grocery_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.grocery_bill_amount = format1;
      this.grocery_bill_amount = parseFloat(this.grocery_bill_amount);
      if(this.grocery_bill_avg == 'N/A')
      {
        this.grocery_bill_avg = 0;
        if(this.grocery_bill_amount >= 1)
        this.grocery_bill_avg += this.grocery_bill_amount;
      }
      else
        if(this.grocery_bill_amount >= 1)
        this.grocery_bill_avg += this.grocery_bill_amount;

    }
    
    if(this.grocery_bill_avg > 0)
    {
      this.grocery_bill_avg /= this.grocery_arr.length;
      this.grocery_bill_avg = (Math.round(this.grocery_bill_avg));
    }
  }

  getFuelAvg()
  {
    if(this.fuel_bill_avg == 0)
      this.fuel_bill_avg = 'N/A';
    for(let i = 0; i < this.fuel_arr.length; i++)
    {
      this.fuel_bill_amount = this.fuel_arr[i];
      this.fuel_bill_amount = JSON.stringify(this.fuel_bill_amount);
      var format1 = this.fuel_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.fuel_bill_amount = format1;
      this.fuel_bill_amount = parseFloat(this.fuel_bill_amount);
      if(this.fuel_bill_avg == 'N/A')
      {
        this.fuel_bill_avg = 0;
        if(this.fuel_bill_amount >= 1)
        this.fuel_bill_avg += this.fuel_bill_amount;
      }
      else
        if(this.fuel_bill_amount >= 1)
        this.fuel_bill_avg += this.fuel_bill_amount;

    }
    
    if(this.fuel_bill_avg > 0)
    {
      this.fuel_bill_avg /= this.fuel_arr.length;
      this.fuel_bill_avg = (Math.round(this.fuel_bill_avg));
    }
  }

  getWaterDispenserAvg()
  {
    if(this.water_dispenser_bill_avg == 0)
      this.water_dispenser_bill_avg = 'N/A';
    for(let i = 0; i < this.water_dispenser_arr.length; i++)
    {
      this.water_dispenser_bill_amount = this.water_dispenser_arr[i];
      this.water_dispenser_bill_amount = JSON.stringify(this.water_dispenser_bill_amount);
      var format1 = this.water_dispenser_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.water_dispenser_bill_amount = format1;
      this.water_dispenser_bill_amount = parseFloat(this.water_dispenser_bill_amount);
      if(this.water_dispenser_bill_avg == 'N/A')
      {
        this.water_dispenser_bill_avg = 0;
        if(this.water_dispenser_bill_amount >= 1)
        this.water_dispenser_bill_avg += this.water_dispenser_bill_amount;
      }
      else
        if(this.water_dispenser_bill_amount >= 1)
        this.water_dispenser_bill_avg += this.water_dispenser_bill_amount;

    }
    
    if(this.water_dispenser_bill_avg > 0)
    {
      this.water_dispenser_bill_avg /= this.water_dispenser_arr.length;
      this.water_dispenser_bill_avg = (Math.round(this.water_dispenser_bill_avg));
    }
  }

  getPhoneAvg()
  {
    if(this.phone_bill_avg == 0)
      this.phone_bill_avg = 'N/A';
    for(let i = 0; i < this.phone_arr.length; i++)
    {
      this.phone_bill_amount = this.phone_arr[i];
      this.phone_bill_amount = JSON.stringify(this.phone_bill_amount);
      var format1 = this.phone_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.phone_bill_amount = format1;
      this.phone_bill_amount = parseFloat(this.phone_bill_amount);
      if(this.phone_bill_avg == 'N/A')
      {
        this.phone_bill_avg = 0;
        if(this.phone_bill_amount >= 1)
        this.phone_bill_avg += this.phone_bill_amount;
      }
      else
        if(this.phone_bill_amount >= 1)
        this.phone_bill_avg += this.phone_bill_amount;

    }
    
    if(this.phone_bill_avg > 0)
    {
      this.phone_bill_avg /= this.phone_arr.length;
      this.phone_bill_avg = (Math.round(this.phone_bill_avg));
    }
  }

  getHeatingAvg()
  {
    if(this.heating_bill_avg == 0)
      this.heating_bill_avg = 'N/A';
    for(let i = 0; i < this.heating_arr.length; i++)
    {
      this.heating_bill_amount = this.heating_arr[i];
      this.heating_bill_amount = JSON.stringify(this.heating_bill_amount);
      var format1 = this.heating_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.heating_bill_amount = format1;
      this.heating_bill_amount = parseFloat(this.heating_bill_amount);
      if(this.heating_bill_avg == 'N/A')
      {
        this.heating_bill_avg = 0;
        if(this.heating_bill_amount >= 1)
        this.heating_bill_avg += this.heating_bill_amount;
      }
      else
        if(this.heating_bill_amount >= 1)
        this.heating_bill_avg += this.heating_bill_amount;

    }
    
    if(this.heating_bill_avg > 0)
    {
      this.heating_bill_avg /= this.heating_arr.length;
      this.heating_bill_avg = (Math.round(this.heating_bill_avg));
    }
  }

  getBankAvg()
  {
    if(this.bank_fees_avg == 0)
      this.bank_fees_avg = 'N/A';
    for(let i = 0; i < this.bank_arr.length; i++)
    {
      this.bank_fees_amount = this.bank_arr[i];
      this.bank_fees_amount = JSON.stringify(this.bank_fees_amount);
      var format1 = this.bank_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.bank_fees_amount = format1;
      this.bank_fees_amount = parseFloat(this.bank_fees_amount);
      if(this.bank_fees_avg == 'N/A')
      {
        this.bank_fees_avg = 0;
        if(this.bank_fees_amount >= 1)
        this.bank_fees_avg += this.bank_fees_amount;
      }
      else
        if(this.bank_fees_amount >= 1)
        this.bank_fees_avg += this.bank_fees_amount;

    }
    
    if(this.bank_fees_avg > 0)
    {
      this.bank_fees_avg /= this.bank_arr.length;
      this.bank_fees_avg = (Math.round(this.bank_fees_avg));
    }
  }

  getCreditCardAvg()
  {
    if(this.credit_card_fees_avg == 0)
      this.credit_card_fees_avg = 'N/A';
    for(let i = 0; i < this.credit_card_arr.length; i++)
    {
      this.credit_card_fees_amount = this.credit_card_arr[i];
      this.credit_card_fees_amount = JSON.stringify(this.credit_card_fees_amount);
      var format1 = this.credit_card_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.credit_card_fees_amount = format1;
      this.credit_card_fees_amount = parseFloat(this.credit_card_fees_amount);
      if(this.credit_card_fees_avg == 'N/A')
      {
        this.credit_card_fees_avg = 0;
        if(this.credit_card_fees_amount >= 1)
        this.credit_card_fees_avg += this.credit_card_fees_amount;
      }
      else
        if(this.credit_card_fees_amount >= 1)
        this.credit_card_fees_avg += this.credit_card_fees_amount;

    }
    
    if(this.credit_card_fees_avg > 0)
    {
      this.credit_card_fees_avg /= this.credit_card_arr.length;
      this.credit_card_fees_avg = (Math.round(this.credit_card_fees_avg));
    }
  }

  getSchoolAvg()
  {
    if(this.school_fees_avg == 0)
      this.school_fees_avg = 'N/A';
    for(let i = 0; i < this.school_arr.length; i++)
    {
      this.school_fees_amount = this.school_arr[i];
      this.school_fees_amount = JSON.stringify(this.school_fees_amount);
      var format1 = this.school_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.school_fees_amount = format1;
      this.school_fees_amount = parseFloat(this.school_fees_amount);
      if(this.school_fees_avg == 'N/A')
      {
        this.school_fees_avg = 0;
        if(this.school_fees_amount >= 1)
        this.school_fees_avg += this.school_fees_amount;
      }
      else
        if(this.school_fees_amount >= 1)
        this.school_fees_avg += this.school_fees_amount;

    }
    
    if(this.school_fees_avg > 0)
    {
      this.school_fees_avg /= this.school_arr.length;
      this.school_fees_avg = (Math.round(this.school_fees_avg));
    }
  }

  getUniversityAvg()
  {
    if(this.university_fees_avg == 0)
      this.university_fees_avg = 'N/A';
    for(let i = 0; i < this.university_arr.length; i++)
    {
      this.university_fees_amount = this.university_arr[i];
      this.university_fees_amount = JSON.stringify(this.university_fees_amount);
      var format1 = this.university_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.university_fees_amount = format1;
      this.university_fees_amount = parseFloat(this.university_fees_amount);
      if(this.university_fees_avg == 'N/A')
      {
        this.university_fees_avg = 0;
        if(this.university_fees_amount >= 1)
        this.university_fees_avg += this.university_fees_amount;
      }
      else
        if(this.university_fees_amount >= 1)
        this.university_fees_avg += this.university_fees_amount;

    }
    
    if(this.university_fees_avg > 0)
    {
      this.university_fees_avg /= this.university_arr.length;
      this.university_fees_avg = (Math.round(this.university_fees_avg));
    }
  }

  getCarMaintenanceAvg()
  {
    if(this.car_maintenance_fees_avg == 0)
      this.car_maintenance_fees_avg = 'N/A';
    for(let i = 0; i < this.car_maintenance_arr.length; i++)
    {
      this.car_maintenance_fees_amount = this.car_maintenance_arr[i];
      this.car_maintenance_fees_amount = JSON.stringify(this.car_maintenance_fees_amount);
      var format1 = this.car_maintenance_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.car_maintenance_fees_amount = format1;
      this.car_maintenance_fees_amount = parseFloat(this.car_maintenance_fees_amount);
      if(this.car_maintenance_fees_avg == 'N/A')
      {
        this.car_insurance_avg = 0;
        if(this.car_maintenance_fees_amount >= 1)
        this.car_maintenance_fees_avg += this.car_maintenance_fees_amount;
      }
      else
        if(this.car_maintenance_fees_amount >= 1)
        this.car_maintenance_fees_avg += this.car_maintenance_fees_amount;

    }
    
    if(this.car_maintenance_fees_avg > 0)
    {
      this.car_maintenance_fees_avg /= this.car_maintenance_arr.length;
      this.car_maintenance_fees_avg = (Math.round(this.car_maintenance_fees_avg));
    }
  }

  getCarPeriodicAvg()
  {
    if(this.car_periodic_maintenance_fees_avg == 0)
      this.car_periodic_maintenance_fees_avg = 'N/A';
    for(let i = 0; i < this.car_periodic_maintenance_arr.length; i++)
    {
      this.car_periodic_maintenance_fees_amount = this.car_periodic_maintenance_arr[i];
      this.car_periodic_maintenance_fees_amount = JSON.stringify(this.car_periodic_maintenance_fees_amount);
      var format1 = this.car_periodic_maintenance_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.car_periodic_maintenance_fees_amount = format1;
      this.car_periodic_maintenance_fees_amount = parseFloat(this.car_periodic_maintenance_fees_amount);
      if(this.car_periodic_maintenance_fees_avg == 'N/A')
      {
        this.car_periodic_maintenance_fees_avg = 0;
        if(this.car_periodic_maintenance_fees_amount >= 1)
        this.car_periodic_maintenance_fees_avg += this.car_periodic_maintenance_fees_amount;
      }
      else
        if(this.car_periodic_maintenance_fees_amount >= 1)
        this.car_periodic_maintenance_fees_avg += this.car_periodic_maintenance_fees_amount;

    }
    
    if(this.car_periodic_maintenance_fees_avg > 0)
    {
      this.car_periodic_maintenance_fees_avg /= this.car_periodic_maintenance_arr.length;
      this.car_periodic_maintenance_fees_avg = (Math.round(this.car_periodic_maintenance_fees_avg));
    }
  }

  getRentAvg()
  {
    if(this.rent_fees_avg == 0)
      this.rent_fees_avg = 'N/A';
    for(let i = 0; i < this.rent_arr.length; i++)
    {
      this.rent_fees_amount = this.rent_arr[i];
      this.rent_fees_amount = JSON.stringify(this.rent_fees_amount);
      var format1 = this.rent_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.rent_fees_amount = format1;
      this.rent_fees_amount = parseFloat(this.rent_fees_amount);
      if(this.rent_fees_avg == 'N/A')
      {
        this.rent_fees_avg = 0;
        if(this.rent_fees_amount >= 1)
        this.rent_fees_avg += this.rent_fees_amount;
      }
      else
        if(this.rent_fees_amount >= 1)
        this.rent_fees_avg += this.rent_fees_amount;

    }
    
    if(this.rent_fees_avg > 0)
    {
      this.rent_fees_avg /= this.rent_arr.length;
      this.rent_fees_avg = (Math.round(this.rent_fees_avg));
    }
  }

  getPetVeterinariranAvg()
  {
    if(this.veterinarian_fees_avg == 0)
      this.veterinarian_fees_avg = 'N/A';
    for(let i = 0; i < this.veterinarian_fees_arr.length; i++)
    {
      this.veterinarian_fees_amount = this.veterinarian_fees_arr[i];
      this.veterinarian_fees_amount = JSON.stringify(this.veterinarian_fees_amount);
      var format1 = this.veterinarian_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.veterinarian_fees_amount = format1;
      this.veterinarian_fees_amount = parseFloat(this.veterinarian_fees_amount);
      if(this.veterinarian_fees_avg == 'N/A')
      {
        this.veterinarian_fees_avg = 0;
        if(this.veterinarian_fees_amount >= 1)
        this.veterinarian_fees_avg += this.veterinarian_fees_amount;
      }
      else
        if(this.veterinarian_fees_amount >= 1)
        this.veterinarian_fees_avg += this.veterinarian_fees_amount;

    }
    
    if(this.veterinarian_fees_avg > 0)
    {
      this.veterinarian_fees_avg /= this.veterinarian_fees_arr.length;
      this.veterinarian_fees_avg = (Math.round(this.veterinarian_fees_avg));
    }
  }

  getPetFoodAvg()
  {
    if(this.pet_food_bill_avg == 0)
      this.pet_food_bill_avg = 'N/A';
    for(let i = 0; i < this.pet_food_arr.length; i++)
    {
      this.pet_food_bill_amount = this.pet_food_arr[i];
      this.pet_food_bill_amount = JSON.stringify(this.pet_food_bill_amount);
      var format1 = this.pet_food_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.pet_food_bill_amount = format1;
      this.pet_food_bill_amount = parseFloat(this.pet_food_bill_amount);
      if(this.pet_food_bill_avg == 'N/A')
      {
        this.pet_food_bill_avg = 0;
        if(this.pet_food_bill_amount >= 1)
        this.pet_food_bill_avg += this.pet_food_bill_amount;
      }
      else
        if(this.pet_food_bill_amount >= 1)
        this.pet_food_bill_avg += this.pet_food_bill_amount;

    }
    
    if(this.pet_food_bill_avg > 0)
    {
      this.pet_food_bill_avg /= this.pet_food_arr.length;
      this.pet_food_bill_avg = (Math.round(this.pet_food_bill_avg));
    }
  }

  getNewCarAvg()
  {
    if(this.new_car_bill_avg == 0)
      this.new_car_bill_avg = 'N/A';
    for(let i = 0; i < this.new_car_arr.length; i++)
    {
      this.new_car_bill_amount = this.new_car_arr[i];
      this.new_car_bill_amount = JSON.stringify(this.new_car_bill_amount);
      var format1 = this.new_car_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.new_car_bill_amount = format1;
      this.new_car_bill_amount = parseFloat(this.new_car_bill_amount);
      if(this.new_car_bill_avg == 'N/A')
      {
        this.new_car_bill_avg = 0;
        if(this.new_car_bill_amount >= 1)
        this.new_car_bill_avg += this.new_car_bill_amount;
      }
      else
        if(this.new_car_bill_amount >= 1)
        this.new_car_bill_avg += this.new_car_bill_amount;

    }
    
    if(this.new_car_bill_avg > 0)
    {
      this.new_car_bill_avg /= this.new_car_arr.length;
      this.new_car_bill_avg = (Math.round(this.new_car_bill_avg));
    }
  }

  getNewHouseAvg()
  {
    if(this.new_house_bill_avg == 0)
      this.new_house_bill_avg = 'N/A';
    for(let i = 0; i < this.new_house_arr.length; i++)
    {
      this.new_house_bill_amount = this.new_house_arr[i];
      this.new_house_bill_amount = JSON.stringify(this.new_house_bill_amount);
      var format1 = this.new_house_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.new_house_bill_amount = format1;
      this.new_house_bill_amount = parseFloat(this.new_house_bill_amount);
      if(this.new_house_bill_avg == 'N/A')
      {
        this.new_house_bill_avg = 0;
        if(this.new_house_bill_amount >= 1)
        this.new_house_bill_avg += this.new_house_bill_amount;
      }
      else
        if(this.new_house_bill_amount >= 1)
        this.new_house_bill_avg += this.new_house_bill_amount;

    }
    
    if(this.new_house_bill_avg > 0)
    {
      this.new_house_bill_avg /= this.new_house_arr.length;
      this.new_house_bill_avg = (Math.round(this.new_house_bill_avg));
    }
  }

  getVacationAvg()
  {
    if(this.vacation_bill_avg == 0)
      this.vacation_bill_avg = 'N/A';
    for(let i = 0; i < this.vacation_arr.length; i++)
    {
      this.vacation_bill_amount = this.vacation_arr[i];
      this.vacation_bill_amount = JSON.stringify(this.vacation_bill_amount);
      var format1 = this.vacation_bill_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.vacation_bill_amount = format1;
      this.vacation_bill_amount = parseFloat(this.vacation_bill_amount);
      if(this.vacation_bill_avg == 'N/A')
      {
        this.vacation_bill_avg = 0;
        if(this.vacation_bill_amount >= 1)
        this.vacation_bill_avg += this.vacation_bill_amount;
      }
      else
        if(this.vacation_bill_amount >= 1)
        this.vacation_bill_avg += this.vacation_bill_amount;

    }
    
    if(this.vacation_bill_avg > 0)
    {
      this.vacation_bill_avg /= this.vacation_arr.length;
      this.vacation_bill_avg = (Math.round(this.vacation_bill_avg));
    }
  }

  getPaintHouseAvg()
  {
    if(this.paint_house_fees_avg == 0)
      this.paint_house_fees_avg = 'N/A';
    for(let i = 0; i < this.paint_house_arr.length; i++)
    {
      this.paint_house_fees_amount = this.paint_house_arr[i];
      this.paint_house_fees_amount = JSON.stringify(this.paint_house_fees_amount);
      var format1 = this.paint_house_fees_amount.split(':')[1];
      format1 = format1.split('}')[0];
      this.paint_house_fees_amount = format1;
      this.paint_house_fees_amount = parseFloat(this.paint_house_fees_amount);
      if(this.paint_house_fees_avg == 'N/A')
      {
        this.paint_house_fees_avg = 0;
        if(this.paint_house_fees_amount >= 1)
        this.paint_house_fees_avg += this.paint_house_fees_amount;
      }
      else
        if(this.paint_house_fees_amount >= 1)
        this.paint_house_fees_avg += this.paint_house_fees_amount;

    }
    
    if(this.paint_house_fees_avg > 0)
    {
      this.paint_house_fees_avg /= this.paint_house_arr.length;
      this.paint_house_fees_avg = (Math.round(this.paint_house_fees_avg));
    }
  }
  //END Get Tasks Avg

  ngOnInit() 
  {
    

    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.router.navigate(['tabs/main'])
    });

  }

}
