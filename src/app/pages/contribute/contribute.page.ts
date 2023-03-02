import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.page.html',
  styleUrls: ['./contribute.page.scss'],
})
export class ContributePage implements OnInit 
{
  conversionRates: number[] = [82000, 80600, 81600, 81500, 81800, 81800, 85200, 80000, 81300];
  predictedRate: number = -99;

  predictRate() 
  {
    console.log('START');
    let sum = 0;
    for (let i = 0; i < this.conversionRates.length - 1; i++) {
      sum += this.conversionRates[i];
    }
    const averageRate = sum / (this.conversionRates.length - 1);
    console.log(`1 ${this.predictedRate}`);
    this.predictedRate = averageRate + (averageRate - this.conversionRates[this.conversionRates.length - 2]);
    console.log(`2 ${this.predictedRate}`);
    console.log(' ');
    console.log('END');
  }


  constructor() 
  { 

  }

  

  ngOnInit() {
  }

}
