import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit 
{
  list: any [] = [];
  str: any = 'str';

  constructor(private data_service: DataService, private router: Router) 
  {
    this.loadEvents();

  }

  async loadEvents() //method that load previous events that are saved on the memory
  {
    //this.data_service.getType('property_task');

    setInterval(async () => 
    {
      this.list = await this.data_service.getData();


      if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "Enter a New Reminder"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'Enter a New Reminder'))
        this.list[0] == null; //used to remove the previous msg
      
    }, 1000)

  }

  add()
  {
    this.router.navigate(['tabs/add'])
  }

  async deleteEvent(index: number)
  {
    this.str = this.list[index];

    var format = this.str.split(' ')[1];
    this.str = format;

    switch(this.str)
    {
      case "property_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "mechanic_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "municipality_tax":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "car_insurance":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "cable_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "internet_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "electricity_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "generator_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "grocery_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "fuel_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;
      
      case "water_dispenser_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "phone_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "heating_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "bank_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "credit_card_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "education":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "car_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "car_periodic_maintenance_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "rent_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "veterinarian_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "pet_food_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "new_house_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "new_car_fees":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "paint_house_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;

      case "vacation_bill":
        this.data_service.remove(index);
        this.list.splice(index, 1);
        this.data_service.removeTask(this.str)
        this.loadEvents();
        break;
        
    }
  }

  ngOnInit() 
  {

  }

}
