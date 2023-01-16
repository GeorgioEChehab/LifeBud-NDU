import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit 
{
  income: number = 0;

  policy() //Jumps to add page
  {
    
    this.navC.navigateForward('terms');
    //this.router.navigate(['#/app/pages/main/main.page.html'])
    //this.router.navigate(['tabs/add'])
  }

  constructor(private data_service: DataService, private alert_controller: AlertController, private router: Router, private navC: NavController) 
  {
  }

  

  //START adjustIncome()
  async adjustIncome() //user can adjust his income
  {
    this.data_service.getAmount('income');
    this.income = this.data_service.get_income;

    if((this.income == 0) || (this.income == null))
    {
      const alert = await this.alert_controller.create(
        {
          header: 'Error!',
          message: 'No Income To Be Adjusted',
          cssClass: 'delete-income-error-alert',
          buttons: [{text: 'OK', cssClass: 'ok-button'}]

        });

      await alert.present();
    }
    else
      if(this.income > 0)
      {
        const alert = await this.alert_controller.create(
          {
            header: 'Please Enter Your New Income',
            cssClass: 'add-income-alert',
            inputs:[
              {
                name: 'income',
                type: 'number'
              }
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'cancel-button'
              },
              {
                text: 'Submit',
                cssClass: 'submit-button',
                handler: async (alertData) => {
                  this.income = alertData.income;
                  if(this.income > 0)
                  {
                    this.data_service.setAmount('income', this.income);
    
                    const alert = await this.alert_controller.create({
                      cssClass: 'add-income-submit-alert',
                      message: 'Income Updated',
                      buttons: [{
                        text: 'OK',
                        cssClass: 'ok-button'
    
                      }],
                    });
                
                    await alert.present();
                  }
                  else
                    if(this.income < 0)
                    {
                      const alert = await this.alert_controller.create({
                        header: 'Error!',
                        cssClass: 'error-income-alert',
                        subHeader: 'Invalid Income',
                        message: 'New Income Cannot Be Less Than Zero',
                        buttons: [{
                          text: 'OK',
                          cssClass: 'ok-button',
                          handler: () => {
                            this.adjustIncome();
                          }
                        }],
                      });
                  
                      await alert.present();
                    }
                  else
                    if(this.income == 0)
                    {
                      const alert = await this.alert_controller.create({
                        header: 'Error!',
                        cssClass: 'error-income-alert',
                        subHeader: 'Invalid Income',
                        message: 'New Income Cannot Be Equal To Zero',
                        buttons: [{
                          text: 'OK',
                          cssClass: 'ok-button',
                          handler: () => {
                            this.adjustIncome();
                          }
                        }],
                      });
                  
                      await alert.present();
                    }
                    
                    
                }
              }
            ]
    
          });
        await alert.present();
      }
  }
  //END adjustIncome()
  
  //--------------------------------------------------------------------------------------------------------------------------------
  
  //START deleteIncome()
  async deleteIncome() //deletes user's previously added income
  {
    this.data_service.getAmount('income');
    this.income = this.data_service.get_income;
    if((this.income == 0) || (this.income == null))
    {
      const alert = await this.alert_controller.create(
        {
          header: 'Error!',
          message: 'No Income To Be Deleted',
          cssClass: 'delete-income-error-alert',
          buttons: [{text: 'OK', cssClass: 'ok-button'}]

        });

      await alert.present();
    }
    else
      if(this.income > 0)
      {
        this.data_service.removeAmount('income');
        this.income = 0;

        const alert = await this.alert_controller.create({
          cssClass: 'delete-income-alert',
          header: 'Income Deleted',
          buttons: [{
            text: 'OK',
            cssClass: 'ok-button'

          }],
        });
    
        await alert.present();

      }
  }
  //END deleteIncome()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START add()
  
  //END add()

  ngOnInit() {
  }

}
