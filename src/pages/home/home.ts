import { Component } from '@angular/core';
import { NavController, Thumbnail } from 'ionic-angular';
import { JobCard } from './job-card.interface';
import { MemoryBlock } from './memory-block.interface';

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

  firstFit: Array<JobCard>
  bestFit: Array<JobCard>
  worstFit: Array<JobCard>

  memBlockobject = {} as MemoryBlock
  memBlockArr: Array<MemoryBlock>

  
  constructor(public navCtrl: NavController) {    }

  // initialization/ reset
  start() {
    console.log("Generating");
    this.generateJob(this.jobList, this.jobTime, this.jobSize)
    this.generateMemBlock(this.jobList, this.jobTime, this.jobSize)
  }

  // generate job object
  generateJob(n, s, t){
    this.jobArr =  [];
    // arr = this.jobArr

    for(let i = 0; i != this.jobList.length; i++){
      this.jobObject = {} as JobCard
      this.jobObject.status = false
      this.jobObject.name = this.jobList[i]
      this.jobObject.time = this.jobTime[i]
      this.jobObject.size = this.jobSize[i]
      this.jobArr.push(this.jobObject)
    }
    console.log("Array of job objects")
    console.log(this.jobArr)
    return this.jobArr
  }

  generateMemBlock(n, s, t){
    this.memBlockArr =  [];
    // arr = this.jobArr

    for(let i = 0; i != this.memoryBlock.length; i++){
      this.memBlockobject = {} as MemoryBlock
      this.memBlockobject.name = this.memoryBlock[i]
      this.memBlockobject.size = this.memorySize[i]
      this.memBlockobject.time = 0
      this.memBlockobject.joblist = []
      this.memBlockobject.status = false
      this.memBlockArr.push(this.memBlockobject)
    }
    console.log(this.memBlockArr)
    return this.memBlockArr
  }

  ffit(){
    this.firstFit = []
    
  }




}