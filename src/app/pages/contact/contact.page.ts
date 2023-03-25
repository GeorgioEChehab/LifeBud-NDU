import { Component, OnInit } from '@angular/core';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit 
{
  name: string;
  email: string;
  phone: string = 'N/A';
  subject: string;
  message: string;

  constructor(private email_composer: EmailComposer) 
  {

  }

  sendEmail()
  {
    let email = {
      to: 'lifebudlb@outlook.com',
      subject: `Contact Form Submission: ${this.subject}`,
      body:`
        <p><strong>Name:</strong> ${this.name}</p>
        <p><strong>Email:</strong> ${this.email}</p>
        <p><strong>Phone:</strong> ${this.phone}</p>
        <p><strong>Message:</strong> ${this.message}</p>
        `,
        isHtml: true

    };

    this.email_composer.open(email);

    
  }




  ngOnInit() {
  }

}
