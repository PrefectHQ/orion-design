import { Schedule } from '@/models/Schedule'


export interface IDeploymentSchedule {
  id: string,
  created: Date,
  updated: Date,
  active: boolean,
  schedule: Schedule,
  maxActiveRuns: number | null,
  catchup: boolean | true,
  jobVariables: Record<string, unknown>,
}

export class DeploymentSchedule implements IDeploymentSchedule {
  public readonly id: string
  public created: Date
  public updated: Date
  public active: boolean
  public schedule: Schedule
  public maxActiveRuns: number | null
  public catchup: boolean | true
  public jobVariables: Record<string, unknown>

  public constructor(deploymentSchedule: IDeploymentSchedule) {
    this.id = deploymentSchedule.id
    this.created = deploymentSchedule.created
    this.updated = deploymentSchedule.updated
    this.active = deploymentSchedule.active
    this.schedule = deploymentSchedule.schedule
    this.jobVariables = deploymentSchedule.jobVariables
    this.maxActiveRuns = deploymentSchedule.maxActiveRuns
    this.catchup = deploymentSchedule.catchup
  }

}