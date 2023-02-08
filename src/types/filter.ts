import { StateType } from '@/models/StateType'
import { FlowRunSortValues } from '@/types/SortOptionTypes'

export type FlowRunFilters = {
  name?: string,
  sort?: FlowRunSortValues,
  startDate?: Date,
  endDate?: Date,
  state?: StateType[],
  deployment?: string[],
  flow?: string[],
  tag?: string[],
  workQueue?: string[],
  workPool?: string[],
  workPoolName?: string[],
  workPoolQueue?: string[],
}

export type FlowRunFiltersInRoute = {
  'name'?: string,
  'sort'?: string,
  'start-date'?: string,
  'end-date'?: string,
  'state'?: string[],
  'deployment'?: string[],
  'flow'?: string[],
  'tag'?: string[],
  'work-queue'?: string[],
  'work-pool'?: string[],
  'work-pool-name'?: string[],
  'work-pool-queue'?: string[],
}