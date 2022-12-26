import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'mylist';
const STORAGE_KEY_BACKUP = 'mylist2';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{

  constructor(private storage: Storage) 
  {
    this.init();

  }

  init()
  {
    this.storage.create();

  }

  //for add page
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

  //for task page
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

}
