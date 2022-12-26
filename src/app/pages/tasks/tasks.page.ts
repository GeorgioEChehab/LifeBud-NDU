import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit 
{

  list: any [] = [];

  constructor(private data_service: DataService, private alert_controller: AlertController) 
  {
    this.load();

  }

  async load()
  {
    this.list = await this.data_service.get1();
    if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "No Tasks Yet"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'No Tasks Yet'))
        this.list[0] == null; //used to remove the previous msg

  }


  async deleteAllEvents() //Deletes all events from done tasks
  {
    if(this.list[0] != 'No Tasks Yet')
    {
      this.data_service.removeT();
      this.list.length = 0;

    }
  }

  async confirmDelete() //confirms with user before deleting backup
  {
    const alert = await this.alert_controller.create(
      {
        header: 'Alert',
        message: 'By choosing confirm you will delete all previous events, this action is irreversible!',
        cssClass: 'foo',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () =>
            {
              return;

            },
          },
          {
            text: 'Confirm',
            role: 'confirm',
            handler: () =>
            {
              this.deleteAllEvents();

            },
          },
        ],
      }
    );
    
    await alert.present();

  }


  ngOnInit() 
  {

  }

}
