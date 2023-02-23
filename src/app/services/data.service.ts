import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const STORAGE_KEY = 'mylist';
const STORAGE_KEY_BACKUP = 'mylist2';

const MAINTEST = 'mylist3';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  //variables used to get and store the amount of the task
  get_income: any = 0;
  get_property_tax_amount: any = 0;
  get_mechanic_tax_amount: any = 0;
  get_municipality_tax_amount: number = 0;
  get_car_insurance_fees_amount: number = 0;
  get_cable_bill_amount: number = 0;
  get_internet_bill_amount: number = 0;
  get_electricity_bill_amount: number = 0;
  get_generator_bill_amount: number = 0;
  get_grocery_bill_amount: number = 0;
  get_fuel_bill_amount: number = 0;
  get_water_dispenser_bill_amount: number = 0;
  get_phone_bill_amount: number = 0;
  get_heating_bill_amount: number = 0;
  get_bank_fees_amount: number = 0;
  get_credit_card_fees_amount: number = 0;
  get_school_fees_amount: number = 0;
  get_university_fees_amount: number = 0;
  get_car_maintenance_fees_amount: number = 0;
  get_car_periodic_maintenance_fees_amount: number = 0;
  get_rent_fees_amount: number = 0;
  get_veterinarian_fees_amount: number = 0;
  get_pet_food_bill_amount: number = 0;
  get_new_car_bill_amount: number = 0;
  get_new_house_bill_amount: number = 0;
  get_vacation_bill_amount: number = 0;
  get_paint_house_fees_amount: number = 0;
  get_other_amount: number = 0;

  //variables used to get and store the task id in order to disable it
  get_property_tax: string = 'false';
  get_mechanic_tax: string = 'false';
  get_municipality_tax: string = 'false';
  get_car_insurance_fees: string = 'false';
  get_cable_bill: string = 'false';
  get_internet_bill: string = 'false';
  get_electricity_bill: string = 'false';
  get_generator_bill: string = 'false';
  get_grocery_bill: string = 'false';
  get_fuel_bill: string = 'false';
  get_water_dispenser_bill: string = 'false';
  get_phone_bill: string = 'false';
  get_heating_bill: string = 'false';
  get_bank_fees: string = 'false';
  get_credit_card_fees: string = 'false';
  get_school_fees: string = 'false';
  get_university_fees: string = 'false';
  get_car_maintenance_fees: string = 'false';
  get_car_periodic_maintenance_fees: string = 'false';
  get_rent_fees: string = 'false';
  get_veterinarian_fees: string = 'false';
  get_pet_food_bill: string = 'false';
  get_new_car_bill: string = 'false';
  get_new_house_bill: string = 'false';
  get_vacation_bill: string = 'false';
  get_paint_house_fees: string = 'false';
  get_other: string = 'false';

  count: number = 0; //used for DataBackup()
  //END variables

  property_tax_repeat: boolean = false;
  repeat: string = 'repeat';
  mechanic_tax_repeat: boolean = false;
  async setRepeat(key: string, value: any)
  {
    await this.storage.set(key, value);

  }

  async removeRepeat(key: string)
  {
    const name = await this.storage.remove(key);
    if(key == 'property_tax_repeat')
      this.property_tax_repeat = name;
    else
      if(key == 'mechanic_tax_repeat')
        this.mechanic_tax_repeat = name;

  }

  async getRepeat(key: string)
  {
    const name = await this.storage.get(key);
    if(key == 'property_tax_repeat')
      this.property_tax_repeat = name;  
    else
      if(key == 'repeat')
        this.repeat = name;
      else
        if(key == 'mechanic_tax_repeat') 
          this.mechanic_tax_repeat = name;
    
  }

  //START constructor()
  constructor(private storage: Storage) 
  {
  }
  //END constructor()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START init()
  async init()
  {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this.storage.create();

  }
  //END init()

  //--------------------------------------------------------------------------------------------------------------------------------

  //For add and main page
  //START getData()
  getData()
  {
    return this.storage.get(STORAGE_KEY) || [];

  }
  //END getData()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START add(...)
  async add(item: any)
  {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);

  }
  //END add(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START remove(...)
  async remove(index: any)
  {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);

  }
  //END remove(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //For done tasks page
  //START getDataBackup()
  getDataBackup()
  {
    return this.storage.get(STORAGE_KEY_BACKUP) || [];

  }
  //END getDataBackup()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START addDataBackup(...)
  async addDataBackup(item: any)
  {
    const storedDataBackup = await this.storage.get(STORAGE_KEY_BACKUP) || [];
    storedDataBackup.push(item);
    this.count++;
    return this.storage.set(STORAGE_KEY_BACKUP, storedDataBackup);

  }
  //END addDataBackup(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START removeDataBackup()
  async removeDataBackup()
  {
    const storedDataBackup = await this.storage.get(STORAGE_KEY_BACKUP) || [];
    storedDataBackup.splice(this.count);
    this.count = 0;
    return this.storage.set(STORAGE_KEY_BACKUP, storedDataBackup);

  }
  //END removeDataBackup()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START setTask(...)
  async setTask(key: string, value: any) //adds task_id in order to be able to disable accrodion
  {
    await this.storage.set(key, value);

  }
  //ENDsetTask(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getTask(...)
  async getTask(key: string) //gets the task_id added previously
  {
    const name = await this.storage.get(key);

  }
  //END getTask(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START removeTask(...)
  async removeTask(key: string) //delete task_id
  {
    const name = await this.storage.remove(key);

  }
  //END removeTask(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START setAmount(...)
  async setAmount(key:string, value: any)
  {
    await this.storage.set(key, value);

  } 
  //END setAmount(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START removeAmount(...)
  async removeAmount(key: string)
  {
    const name = await this.storage.remove(key);

  }
  //END removeAmount(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START getAmount(...)
  async getAmount(key: string)
  {
    const name = await this.storage.get(key);
    switch(key)
    {
      case "income":
        this.get_income = name;
        break;

      case "property_tax_amount":
        this.get_property_tax_amount = name;
        break;
      
      case "mechanic_tax_amount":
        this.get_mechanic_tax_amount = name;
        break;
        
      case "municipality_tax_amount":
        this.get_municipality_tax_amount = name;
        break;
      
      case "car_insurance_fees_amount":
        this.get_car_insurance_fees_amount = name;
        break;
      
      case "cable_bill_amount":
        this.get_cable_bill_amount = name;
        break;

      case "internet_bill_amount":
        this.get_internet_bill_amount = name;
        break;
            
      case "electricity_bill_amount":
        this.get_electricity_bill_amount = name;
        break;  
        
      case "generator_bill_amount":
        this.get_generator_bill_amount = name;
        break;

      case "grocery_bill_amount":
        this.get_grocery_bill_amount = name;
        break;

      case "fuel_bill_amount":
        this.get_fuel_bill_amount = name;
        break;

      case "water_dispenser_bill_amount":
        this.get_water_dispenser_bill_amount = name;
        break;

      case "phone_bill_amount":
        this.get_phone_bill_amount = name;
        break;

      case "heating_bill_amount":
        this.get_heating_bill_amount = name;
        break;

      case "bank_fees_amount":
        this.get_bank_fees_amount = name;
        break;

      case "credit_card_fees_amount":
        this.get_credit_card_fees_amount = name;
        break;

      case "school_fees_amount":
        this.get_school_fees_amount = name;
        break;

      case "university_amount":
        this.get_university_fees_amount = name;
        break;
      
      case "car_maintenance_fees_amount":
        this.get_car_maintenance_fees_amount = name;
        break;

      case "car_periodic_maitenance_fees_amount":
        this.get_car_periodic_maintenance_fees_amount = name;
        break;

      case "rent_fees_amount":
        this.get_rent_fees_amount = name;
        break;

      case "veterinarian_bill_amount":
        this.get_veterinarian_fees_amount = name;
        break;

      case "pet_food_bill_amount":
        this.get_pet_food_bill_amount = name;
        break;

      case "new_house_bill_amount":
        this.get_new_house_bill_amount = name;
        break;

      case "new_car_bill_amount":
        this.get_new_house_bill_amount = name;
        break;

      case "vacation_bill_amount":
        this.get_vacation_bill_amount = name;
        break;

      case "paint_house_fees_amount":
        this.get_paint_house_fees_amount = name;
        break;

    }
  }
  //END getAmount(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START disableTask(...)
  async disableTask(key: string)
  {
    const name = await this.storage.get(key);
    switch(key)
    {
      case "property_tax":
        this.get_property_tax = name;
        break;
      
      case "mechanic_tax":
        this.get_mechanic_tax = name;
        break;
        
      case "municipality_tax":
        this.get_municipality_tax = name;
        break;
      
      case "car_insurance_fees":
        this.get_car_insurance_fees = name;
        break;
      
      case "cable_bill":
        this.get_cable_bill = name;
        break;

      case "internet_bill":
        this.get_internet_bill = name;
        break;
            
      case "electricity_bill":
        this.get_electricity_bill = name;
        break;  
        
      case "generator_bill":
        this.get_generator_bill = name;
        break;

      case "grocery_bill":
        this.get_grocery_bill = name;
        break;

      case "fuel_bill":
        this.get_fuel_bill = name;
        break;

      case "water_dispenser_bill":
        this.get_water_dispenser_bill = name;
        break;

      case "phone_bill":
        this.get_phone_bill = name;
        break;

      case "heating_bill":
        this.get_heating_bill = name;
        break;

      case "bank_fees":
        this.get_bank_fees = name;
        break;

      case "credit_card_fees":
        this.get_credit_card_fees = name;
        break;

      case "school_fees":
        this.get_school_fees = name;
        break;
      
      case "university_fees":
        this.get_university_fees = name;
        break;

      case "car_maintenance_fees":
        this.get_car_maintenance_fees = name;
        break;

      case "car_periodic_maitenance_fees":
        this.get_car_periodic_maintenance_fees = name;
        break;

      case "rent_fees":
        this.get_rent_fees = name;
        break;

      case "veterinarian_fees":
        this.get_veterinarian_fees = name;
        break;

      case "pet_food_bill":
        this.get_pet_food_bill = name;
        break;

      case "new_house_bill":
        this.get_new_house_bill = name;
        break;

      case "new_car_bill":
        this.get_new_house_bill = name;
        break;

      case "vacation_bill":
        this.get_vacation_bill = name;
        break;

      case "paint_house_fees":
        this.get_paint_house_fees = name;
        break;

    }
  }
  //END disableTask(...)

}
