import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const STORAGE_KEY = 'mylist';
const STORAGE_KEY_BACKUP = 'mylist2';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{

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

  //for ids, and disabling accordions...

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

  property_tax: string = 'false';
  mechanic_tax: string = 'false';
  municipality: string = 'false';
  car_insurance: string = 'false';
  cable_fees: string = 'false';
  internet_fees: string = 'false';
  electricity_fees: string = 'false';
  generator: string = 'false';
  grocery: string = 'false';
  fuel: string = 'false';
  water_dispenser: string = 'false';
  phone_bill: string = 'false';
  heating: string = 'false';
  bank_fees: string = 'false';
  credit_card_fees: string = 'false';
  school_university_fees: string = 'false';
  car_maintenance: string = 'false';
  car_periodic_maintenance: string = 'false';
  rent_fees: string = 'false';
  pet_veterinarian_fees: string = 'false';
  pet_food: string = 'false';
  new_car_fees: string = 'false';
  new_house_fees: string = 'false';
  vacation_fees: string = 'false';
  paint_house_fees: string = 'false';
  other: string = 'false';

  async disableProperty(key: string)
  {
    this.property_tax = await this.storage.get(key);
  }

  async disableMechanic(key: string)
  {
    this.mechanic_tax = await this.storage.get(key);
  }
  
  async disableMuniciplality(key: string)
  {
    this.municipality = await this.storage.get(key);
  }

  async disableCarInsurance(key: string)
  {
    this.car_insurance = await this.storage.get(key);
  }

  async disableCable(key: string)
  {
    this.cable_fees = await this.storage.get(key);
  }

  async disableInternet(key: string)
  {
    this.internet_fees = await this.storage.get(key);
  }

  async disableElectricity(key: string)
  {
    this.electricity_fees = await this.storage.get(key);
  }

  async disableGenerator(key: string)
  {
    this.generator = await this.storage.get(key);
  }

  async disableGrocery(key: string)
  {
    this.grocery = await this.storage.get(key);
  }
  
  async disableFuel(key: string)
  {
    this.fuel = await this.storage.get(key);
  }

  async disableWaterDispenser(key: string)
  {
    this.water_dispenser = await this.storage.get(key);
  }

  async disablePhoneBill(key: string)
  {
    this.phone_bill = await this.storage.get(key);
  }

  async disableHeating(key: string)
  {
    this.heating = await this.storage.get(key);
  }

  async disableBankFees(key: string)
  {
    this.bank_fees = await this.storage.get(key);
  }

  async disableCredirCardFees(key: string)
  {
    this.credit_card_fees = await this.storage.get(key);
  }
  
  async disableEducation(key: string)
  {
    this.school_university_fees = await this.storage.get(key);
  }

  async disableCarMaintenance(key: string)
  {
    this.car_maintenance = await this.storage.get(key);
  }

  async disableCarPeriodicMaintenance(key: string)
  {
    this.car_periodic_maintenance = await this.storage.get(key);
  }

  async disableRentFees(key: string)
  {
    this.rent_fees = await this.storage.get(key);
  }

  async disablePetVeterinarian(key: string)
  {
    this.pet_veterinarian_fees = await this.storage.get(key);
  }

  async disablePetFood(key: string)
  {
    this.pet_food = await this.storage.get(key);
  }

  async disableNewCar(key: string)
  {
    this.new_car_fees = await this.storage.get(key);
  }

  async disableNewHouse(key: string)
  {
    this.new_house_fees = await this.storage.get(key);
  }

  async disableVacation(key: string)
  {
    this.vacation_fees = await this.storage.get(key);
  }

  async disablePaintHouse(key: string)
  {
    this.paint_house_fees = await this.storage.get(key);
  }





}
