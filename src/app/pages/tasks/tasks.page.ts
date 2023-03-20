import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit 
{
  //START variables
  list: any [] = []; //stores previous tasks in it
  search_results: any = []; //displays result from search
  hide_results: number = 0; //if the users searches display result if not hide it
  //END variables

  //--------------------------------------------------------------------------------------------------------------------------------

  //START constructor(...)
  constructor(private data_service: DataService, private alert_controller: AlertController,
              private loading_controller: LoadingController) 
  {
    this.loadEvents();

  }
  //END constructor(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START loadEvents() 
  async loadEvents()
  {
    this.loadScreen();
    
    setInterval(async () => 
    {
      this.list = await this.data_service.getDataBackup();
      if((this.list[0] == null) && (this.list[1] == null))
      this.list[0] = "No Tasks Yet"; //if array is null then display msg
    else
      if((this.list[1] != null) && (this.list[0] == 'No Tasks Yet'))
        this.list[0] == null; //used to remove the previous msg
      
    }, 1000)
  }
  //END loadEvents

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

  //START handleChange(...)
  handleChange(event: any)
  {
    this.search_results = [...this.list];
    const query = event.target.value.toLowerCase();
    if(query != '')
    {
      this.hide_results = 1;
      this.search_results = this.list.filter(d => d.toLowerCase().indexOf(query) > -1);
    }
    else
    {
      this.hide_results = 0;
      this.search_results = [];
    }
  }
  //END handleChange(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START deleteAllEvents()
  async deleteAllEvents() //Deletes all events from done tasks
  {
    if(this.list[0] != 'No Tasks Yet')
    {
      this.data_service.removeDataBackup();
      this.list.length = 0;

    }
  }
  //END deleteAllEvents()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START confirmDelete()
  async confirmDelete() //confirms with user before deleting backup
  {
    const alert = await this.alert_controller.create(
      {
        header: 'Alert',
        message: 'By choosing confirm you will delete all previous events, this action is irreversible!',
        cssClass: 'delete-all-events-alert',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'cancel-button',
            handler: () =>
            {
              return;

            },
          },
          {
            text: 'Confirm',
            role: 'confirm',
            cssClass: 'delete-button',
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
  //END confirmDelete()


  ngOnInit() 
  {

  }

}
