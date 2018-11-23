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
  intervalN: number
  currentUsersRunning = []
  display = []

  jobObject = {} as JobCard
  jobArr: Array<JobCard>
  queueList: Array<JobCard>

  ffqueue = []
  bfqueue = []
  wfqueue = []

  firstFit = []
  bestFit = []
  worstFit = []

  memBlockobject = {} as MemoryBlock
  memBlockArr: Array<MemoryBlock>

  beginff: boolean
  fftimer = null

  constructor(public navCtrl: NavController) {    }

  // initialization/ reset
  start() {
    console.log("Generating");
    this.generateJob(this.jobList, this.jobTime, this.jobSize)
    this.generateMemBlock(this.jobList, this.jobTime, this.jobSize)
    // this.intervalN = setInterval(()=>{this.updateff()}, 1500);
    // this.firs_fit()
  }

  one() {
      this.beginff = true
      this.start()
      this.firs_fit()
      this.fftimer = setInterval(()=>{this.kafourier(this.firstFit)}, 1000);
    //   this.fftimer = setInterval(this.kafourier, 1000);
    }


  // generate job object
  generateJob(n, s, t){
    this.jobArr =  [];
    // arr = this.jobArr

    for(let i = 0; i != this.jobList.length; i++){
      this.jobObject = {} as JobCard
      this.jobObject.status = false
      this.jobObject.name = this.jobList[i]
      this.jobObject.id = this.jobList[i]
      this.jobObject.inter = this.jobList[i]
      this.jobObject.fit = false
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
      this.memBlockobject.jobs = []
      this.memBlockobject.status = false
      this.memBlockArr.push(this.memBlockobject)
    }
    console.log(this.memBlockArr)
    return this.memBlockArr
  }

  assigned(id, arr) {
    for (let i = 0; i < arr.length; i++) {
       
        for (let j = 0; j < arr[i].jobs.length; j++) {
            
            if (id == arr[i].jobs[j].id) {
                // console.log("already assigned")
                return true;
            }
        }
    }
    return false;
}


firs_fit() {
  this.queueList = []
  // this.firstFit = []
  // this.prepareData(this.job_list, this.mem_list);
  this.firstFit = this.memBlockArr.slice(0, this.memBlockArr.length);
  console.log("before assignment");
  this.printAllocs(this.firstFit)
  console.log("=================")
  let js = this.jobArr.slice(0, this.jobArr.length);
  // this.firstFit = this.resetAllocs(this.firstFit);
  // this.printAllocs(this.firstFit);
  for (let i = 0; i < js.length; i++) {
      let curr_job = js[i]

      for (let j = 0; j < this.firstFit.length; j++) {
          
          if (this.firstFit[j].jobs.length > 0) {

              let last_job = this.firstFit[j].jobs[this.firstFit[j].jobs.length-1]
              let interval = curr_job.inter - last_job.inter

              if (last_job.time - interval <= 0) {

                  //check if there are jobs in queueList (unallocated)
                  if (this.queueList.length > 0) {
                      let unalloc = this.queueList[0]

                      //check if unalloc job can fit to the current mem block
                      if (unalloc.size <= this.firstFit[j].size && 
                          this.assigned(unalloc.id, this.firstFit) == false) {
                          //push to array
                          unalloc.inter = curr_job.inter;
                          this.firstFit[j].jobs.push(unalloc)
                          // this.jobff.push(unalloc);
                          this.queueList.shift();
                          continue;
                      } else if (curr_job.size <= this.firstFit[j].size && 
                          this.assigned(curr_job.id, this.firstFit) == false) {
                          this.firstFit[j].jobs.push(curr_job)
                          // this.jobff.push(curr_job)
                          continue;
                      } else {
                          continue;
                      }
                  } else {
                      //no unallocated jobs
                      if (curr_job.size <= this.firstFit[j].size && 
                          this.assigned(curr_job.id, this.firstFit) == false) {
                          this.firstFit[j].jobs.push(curr_job)
                          // this.jobff.push(curr_job)
                          break;
                      } else {
                          continue;
                      }
                  }
              } else {
                  continue;
              }
          } else {
              if (this.queueList.length > 0) {
                  let unalloc = this.queueList[0]

                  //check if unalloc job can fit to the current mem block
                  if (unalloc.size <= this.firstFit[j].size && 
                      this.assigned(unalloc.id, this.firstFit) == false) {
                      //push to array
                      unalloc.inter = curr_job.inter;
                      this.firstFit[j].jobs.push(unalloc)
                      // this.jobff.push(unalloc)
                      this.queueList.shift();
                      continue;
                  } else if (curr_job.size <= this.firstFit[j].size && 
                      this.assigned(curr_job.id, this.firstFit) == false) {
                      this.firstFit[j].jobs.push(curr_job)
                      // this.jobff.push(curr_job)
                      continue;
                  } else {
                      continue;
                  }
              } else {
                  //no unallocated jobs
                  if (curr_job.size <= this.firstFit[j].size && 
                      this.assigned(curr_job.id, this.firstFit) == false) {
                      this.firstFit[j].jobs.push(curr_job)
                      // this.jobff.push(curr_job)
                      break;
                  } else {
                      continue;
                  }
              }
          }
      }

      //unallocated job
      if (this.assigned(curr_job.id, this.firstFit) == false) {
          this.queueList.push(curr_job);
      }
  }
  this.assignff(this.firstFit);
  // this.ffd.d = this.getdata(this.firstFit)
  // this.ffd.hup = ((this.firstFit.length - 
  //     this.filterunalloc(this.firstFit).length) / 10) * 100;

  // this.ffd.nup = (this.filterunalloc(this.firstFit).length / 10) * 100;
  // this.ffd.pd = this.getpdata(this.firstFit);
  // console.log("UNALLOCATED MEM BLOCKS: " + this.filterunalloc(this.firstFit).length)
  // // this.big = this.big.concat(this.firstFit);
  
  // this.dupff = this.firstFit.slice(0, this.firstFit.length);
  //calculate throughput
  // this.throughput(this.firstFit)

  // for (let i = 0; i < this.firstFit.length; i++) {
  //     tpff = (this.firstFit[i].jobs.length > 0) ? 
  //         this.firstFit[i].jobs.length / this.firstFit[i].total_time : 0
  
  //     this.dupff.push(tpff)
  // }
//   this.printAllocs(this.firstFit)
}

assignff(arr) {
  var currWaitTime = 0;
  var prevWaitTime = 0;
  var prevUseTime = 0;
  for (let i = 0; i < arr.length; i++) {
      arr[i].total_time = 0;
      for (let j = 0; j < arr[i].jobs.length; j++) {
          let time = arr[i].jobs[j].time
          currWaitTime = prevUseTime + prevWaitTime;
          arr[i].jobs[j].wait = currWaitTime;
          arr[i].total_time = time + currWaitTime;
          prevWaitTime = currWaitTime;
          prevUseTime = time;
      }
      currWaitTime = 0;
      prevWaitTime = 0;
      prevUseTime = 0;
  }

  //print respective times
  this.printAllocs(arr);
}

printAllocs(arr) {
  for (let j = 0; j < arr.length; j++) {
      console.log("jobs for " + arr[j].name + " total time: " + arr[j].total_time)
      for (let k = 0; k < arr[j].jobs.length; k++) {
          console.log(arr[j].jobs[k].name)
      }
  }
}

    deleteObj(a, p) {
        let unique_array = a.filter(function(elem) {
            return p.id != elem.id;
        });
        return unique_array;
    }

    // updateff() {
    //     let arr = this.firstFit
    //     console.log("here")
    //     if (this.beginff == true) {
    //         console.log("ni true")
    //         for (let i = 0; i < arr.length; i++) {
    //             for (let j = 0; j < arr[i].jobs.length; j++) {
    //                 if (arr[i].jobs[j].wait == 0) {
    //                     arr[i].curr_job = arr[i].jobs[j]
    //                     arr[i].status = "JOB " + arr[i].curr_job.id;
    //                     arr[i].jobs[j].time--;
    //                     console.log(arr[i].jobs[j].time)

    //                     this.ffqueue = this.deleteObj(this.ffqueue, arr[i].curr_job);

    //                     if (arr[i].jobs[j].time == 0) {
    //                         arr[i].jobs.shift();
    //                         j--;
    //                     }
    //                 } else {
    //                     arr[i].jobs[j].wait--;
    //                 }
    //             }

    //             if (arr[i].jobs.length == 0) {
    //                 arr[i].status = "FREE"
    //                 // console.log("MEMORY BLOCK " + this.firstFit[i].block + " is FREE!!!!");
    //             }
    //         }
    //     }
    // }

    kafourier(arr) {
    
        let totalTime = 0;
        for (let i = 0; i < arr.length; i++) { //for all res card
          let currCard = arr[i];
          totalTime += currCard.resourceTime;
        }
    
        let res = [];
        let temp: Array<JobCard> = [];
        if(totalTime <= 0){
          clearInterval(this.fftimer);
        }
    
        for (let i = 0; i < arr.length; i++) { //for all res card
          let currCard = arr[i];
          let list = currCard.queueList;
          if(currCard.resourceTime > 0){
            if(list.length > 0){
              let topUser = list[0];
              list[0].time--;
              currCard.resourceTime--;
    
              if(list[0].time <= 0){
                list[0].status = true;
                list.pop();
                //list.push(topUser);
              }
            }
          }  
        }
        console.log(arr)
        return this.display
      }
}