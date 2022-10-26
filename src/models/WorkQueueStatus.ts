import { WorkQueueHealthPolicy } from './WorkQueueHealthPolicy'

export interface IWorkQueueStatus {
  healthy: boolean,
  lateRuns: number,
  lastPolled: Date | null,
  healthCheckPolicy: WorkQueueHealthPolicy,
}

export class WorkQueueStatus implements IWorkQueueStatus {
  public healthy: boolean
  public lateRuns: number
  public lastPolled: Date | null
  public healthCheckPolicy: WorkQueueHealthPolicy

  public constructor(workQueueStatus: IWorkQueueStatus) {
    this.healthy= workQueueStatus.healthy
    this.lateRuns= workQueueStatus.lateRuns
    this.lastPolled= workQueueStatus.lastPolled
    this.healthCheckPolicy= workQueueStatus.healthCheckPolicy
  }
}