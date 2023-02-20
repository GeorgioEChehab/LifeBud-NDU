import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
})
export class ForecastPage implements OnInit {

  constructor(private afdata_base: AngularFireDatabase) 
  {
    this.loadEvents();

  }

  async loadEvents() //Method that load previous events that are saved on the memory
  {
    setInterval(async () => 
    {
      this.get();
      //this.getItem();
      
      
    }, 500)

  }

  str: any = 'str';
  out1: any = 0;
  out2: any = 0;
  out3: any = 0;
  amount: number = 0;
  arr: any = [];
  get()
  {
    this.afdata_base.list('/property_tax').valueChanges().subscribe(values => {
      this.arr = values; 

    });
  }

  

  getItem()
  {
    for(let i = 0; i < this.arr.length; i++)
    {
      this.str = this.arr[i];
      switch(i)
      {
        case 0:
          this.out1 = JSON.stringify(this.str);
          var format1 = this.out1.split(':')[1]
          format1 = format1.split('}')[0];
          this.out1 = format1;
          this.out1 = parseInt(this.out1);
          break;

        case 1:
          this.out2 = JSON.stringify(this.str);
          var format2 = this.out2.split(':')[1]
          format2 = format2.split('}')[0];
          this.out2 = format2;
          this.out2 = parseInt(this.out2);
          break;

        case 2:
          this.out3 = JSON.stringify(this.str);
          var format3 = this.out3.split(':')[1]
          format3 = format3.split('}')[0];
          this.out3 = format3;
          this.out3 = parseInt(this.out3);
          break;
      }
    }

    
    this.amount = 0;
    this.amount += this.out1 + this.out2 + this.out3;


  }

  ngOnInit() {
  }

}
