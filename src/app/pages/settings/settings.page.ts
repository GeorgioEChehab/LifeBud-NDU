import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit 
{
  constructor(private data_service: DataService, private alert_controller: AlertController) 
  {

  }

  async deleteIncome()
  {
    if(this.data_service.get_income == 0)
    {
      const alert = await this.alert_controller.create(
        {
          header: 'No Income To Be Deleted',
          cssClass: 'delete-income-alert',
          buttons: [{text: 'OK', cssClass: 'ok-button'}]

        });

      await alert.present();
    }
    else
      if(this.data_service.get_income > 0)
      {
        
      }
  }

  ngOnInit() {
  }

}
