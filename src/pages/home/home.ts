import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//created Resource interface
// import { Resource} from './memory-block.interface';
import { User } from './user.interface';
import { JobCard } from './job-card.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  memoryBlock: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  memorySize: Array<number> = [9500, 7000, 4500, 8500, 3000, 9000, 1000, 5500, 1500, 500];
  jobList: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  jobTime: Array<number> = [5,4,8,2,2,6,8,10,7,6,5,8,9,10,10,7,3,1,9,3,7,2,8,5,10];
  jobSize: Array<number> = [5760, 4190, 3290, 2030, 2550, 6990, 8940, 740, 3930, 6890, 6580, 3820, 9140, 420, 220, 7540, 3210, 1380, 9850, 3610, 7540, 2710, 8390, 5950, 760]


  jobObject = {} as JobCard
  jobArr: Array<JobCard>
  queueList: Array<JobCard>
  

  constructor(public navCtrl: NavController) {    }

  // initialization/ reset
  start() {
    console.log("Generating");
  }

  generateJob(){
    let arr: Array<JobCard> =  [];
    arr = this.jobArr

    let number: number = 0
    let time: number = 0
    let size: number = 0

    for(let i = 0; i != this.jobList.length; i++){
      this.jobObject = {} as JobCard
      this.jobObject.name = this.jobList[i]
      this.jobObject.time = this.jobTime[i]
      this.jobObject.size = this.jobSize[i]
      arr.push(this.jobObject)
      
    }

  }






}