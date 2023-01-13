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
  get_property_money: any = 0;
  get_mechanic_tax_money: any = 0;
  get_municipality_tax_money: number = 0;
  get_car_insurance_fees_money: number = 0;
  get_cable_bill_money: number = 0;
  get_internet_bill_money: number = 0;
  get_electricity_bill_money: number = 0;
  get_generator_bill_money: number = 0;
  get_grocery_bill_money: number = 0;
  get_fuel_bill_money: number = 0;
  get_water_dispenser_bill_money: number = 0;
  get_phone_bill_money: number = 0;
  get_heating_bill_money: number = 0;
  get_bank_fees_money: number = 0;
  get_credit_card_fees_money: number = 0;
  get_school_fees_money: number = 0;
  get_university_fees_money: number = 0;
  get_car_maintenance_fees_money: number = 0;
  get_car_periodic_maintenance_fees_money: number = 0;
  get_rent_fees_money: number = 0;
  get_veterinarian_fees_money: number = 0;
  get_pet_food_bill_money: number = 0;
  get_new_car_bill_money: number = 0;
  get_new_house_bill_money: number = 0;
  get_vacation_bill_money: number = 0;
  get_paint_house_fees_money: number = 0;
  get_other_money: number = 0;

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

  constructor(private storage: Storage) 
  {
    

  }

  async init()
  {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this.storage.create();

  }

  //for add and main page
  getData()
  {
    return this.storage.get(STORAGE_KEY) || [];

  }

  async add(item: any)
  {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);

  }

  async remove(index: any)
  {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);

  }

  //for done tasks page
  count: number = 0;

  getDataBackup()
  {
    return this.storage.get(STORAGE_KEY_BACKUP) || [];

  }

  async addDataBackup(item: any)
  {
    const storedDataBackup = await this.storage.get(STORAGE_KEY_BACKUP) || [];
    storedDataBackup.push(item);
    this.count++;
    return this.storage.set(STORAGE_KEY_BACKUP, storedDataBackup);

  }

  async removeDataBackup()
  {
    const storedDataBackup = await this.storage.get(STORAGE_KEY_BACKUP) || [];
    storedDataBackup.splice(this.count);
    this.count = 0;
    return this.storage.set(STORAGE_KEY_BACKUP, storedDataBackup);

  }

  async setTask(key: string, value: any) //adds task_id in order to be able to disable accrodion
  {
    await this.storage.set(key, value);

  }

  async getTask(key: string) //gets the task_id added previously
  {
    const name = await this.storage.get(key);

  }

  async removeTask(key: string) //delete task_id
  {
    const name = await this.storage.remove(key);

  }

  //Start Amount Test

  async setAmount(key:string, value: any)
  {
    await this.storage.set(key, value);

  }

  get_output: any = 0;
  async getAmount(key: string)
  {
    const name = await this.storage.get(key);
    this.get_output = name;

  }

  
 

  async removeAmount(key: string)
  {
    const name = await this.storage.remove(key);

  }


  //Details is for computeTest() in main page
  getDetails()
  {
    return this.storage.get(MAINTEST) || [];

  }

  async addDetails(item: any)
  {
    const mainTest = await this.storage.get(MAINTEST) || [];
    mainTest.push(item);
    return this.storage.set(MAINTEST, mainTest);

  }

  async removeDetails(index: number)
  {
    const mainTest = await this.storage.get(MAINTEST) || [];
    mainTest.splice(index, 1);
    return this.storage.set(MAINTEST, mainTest);

  }

  //End Amount Task

  async getMoney(key: string)
  {
    const name = await this.storage.get(key);
    switch(key)
    {
      case "income":
        this.get_income = name;
        break;

      case "property_tax_money":
        this.get_property_money = name;
        break;
      
      case "mechanic_tax_money":
        this.get_mechanic_tax_money = name;
        break;
        
      case "municipality_tax_money":
        this.get_municipality_tax_money = name;
        break;
      
      case "car_insurance_fees_money":
        this.get_car_insurance_fees_money = name;
        break;
      
      case "cable_bill_money":
        this.get_cable_bill_money = name;
        break;

      case "internet_bill_money":
        this.get_internet_bill_money = name;
        break;
            
      case "electricity_bill_money":
        this.get_electricity_bill_money = name;
        break;  
        
      case "generator_bill_money":
        this.get_generator_bill_money = name;
        break;

      case "grocery_bill_money":
        this.get_grocery_bill_money = name;
        break;

      case "fuel_bill_money":
        this.get_fuel_bill_money = name;
        break;

      case "water_dispenser_bill_money":
        this.get_water_dispenser_bill_money = name;
        break;

      case "phone_bill_money":
        this.get_phone_bill_money = name;
        break;

      case "heating_bill_money":
        this.get_heating_bill_money = name;
        break;

      case "bank_fees_money":
        this.get_bank_fees_money = name;
        break;

      case "credit_card_fees_money":
        this.get_credit_card_fees_money = name;
        break;

      case "school_fees_money":
        this.get_school_fees_money = name;
        break;

      case "university_money":
        this.get_university_fees_money = name;
        break;
      
      case "car_maintenance_fees_money":
        this.get_car_maintenance_fees_money = name;
        break;

      case "car_periodic_maitenance_fees_money":
        this.get_car_periodic_maintenance_fees_money = name;
        break;

      case "rent_fees_money":
        this.get_rent_fees_money = name;
        break;

      case "veterinarian_bill_money":
        this.get_veterinarian_fees_money = name;
        break;

      case "pet_food_bill_money":
        this.get_pet_food_bill_money = name;
        break;

      case "new_house_bill_money":
        this.get_new_house_bill_money = name;
        break;

      case "new_car_bill_money":
        this.get_new_house_bill_money = name;
        break;

      case "vacation_bill_money":
        this.get_vacation_bill_money = name;
        break;

      case "paint_house_fees_money":
        this.get_paint_house_fees_money = name;
        break;

    }
  }

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

}
