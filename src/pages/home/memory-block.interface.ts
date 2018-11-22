import { JobCard } from "./job-card.interface";

  export interface MemoryBlock {
    name: number;
    time: number;
    size: number;
    status: boolean;
    // stat: string
    jobs: Array<JobCard>
    
}