import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit 
{
  password: string;

  constructor(private nav_controller: NavController, private storage: Storage) 
  { }

  submit()
  {
    if(this.password === 'Kogrnifsoo*')
    {
      this.storage.set('password_entered', true);
      this.nav_controller.navigateForward('/contribute');

    }
    else
      alert('Incorrect Password!');

  }

  ngOnInit() {
  }

}
