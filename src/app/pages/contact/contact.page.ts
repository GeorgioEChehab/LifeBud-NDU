import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit 
{
  //START variables
  name: '';
  email: '';
  subject: '';
  message: '';

  //END variables

  //START constructor(...)
  constructor(private af_database: AngularFireDatabase, private alert_controller: AlertController,
              private router: Router, private platform: Platform) 
  {

  }
  //END constructor(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START submitForm()
  submitForm()
  {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(this.email))
    {
      this.addOnCloud();
      this.showAlertSuccess('Successful', 'Form Submitted');
      this.reset();

    }
    else
      this.showAlertError('Error', 'Incorrect Email Format');

  }
  //END submitForm()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START showAlertSuccess(...)
  showAlertSuccess(head: any, msg: any) //used for alert box
  {
    this.alert_controller.create(
      {
        header: head,
        message: msg,
        cssClass: 'delete-all-events-alert',
          buttons: [
            {
              text: 'OK',
              role: 'confirm',
              cssClass: 'delete-button',
              handler: () =>
              {
                this.GoToMain();
  
              },
            },
          ],
      }
    ).then(alert => alert.present());

  }
  //END showALertSuccess(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START main()
  GoToMain() //Jumps to add page
  {
    this.router.navigate(['tabs/main'])
  }
  //END main()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START showAlertError(...)
  showAlertError(head: any, msg: any) //used for alert box
  {
    this.alert_controller.create(
      {
        header: head,
        message: msg,
        cssClass: 'delete-all-events-alert',
          buttons: [
            {
              text: 'OK',
              role: 'confirm',
              cssClass: 'delete-button',
              handler: () =>
              {
                return;
  
              },
            },
          ],
      }
    ).then(alert => alert.present());

  }
  //END showALertError(...)

  //--------------------------------------------------------------------------------------------------------------------------------

  //START addOnCloud()
  addOnCloud() //Uploads contact form to cloud
  {
    const itemsRef = this.af_database.list('CONTACT-FORM');
    itemsRef.push({ Name: this.name, Email: this.email, Subject: this.subject, Message: this.message });

  }
  //END addOnCloud()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START reset()
  reset()
  {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';

  }
  // END reset()

  //--------------------------------------------------------------------------------------------------------------------------------

  //START ngOnInit()
  ngOnInit() 
  {
    this.reset();

    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.router.navigate(['/tabs/settings'])
    });

  }
  //END ngOnInit()

}
