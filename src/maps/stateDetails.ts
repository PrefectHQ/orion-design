import { StateDetailsCreate } from '@/models'
import { StateDetails } from '@/models/StateDetails'
import { StateDetailsRequest } from '@/models/StateDetailsRequest'
import { StateDetailsResponse } from '@/models/StateDetailsResponse'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapStateDetailsResponseToStateDetails: MapFunction<StateDetailsResponse, StateDetails> = function(source: StateDetailsResponse): StateDetails {
  return {
    flowRunId: source.flow_run_id,
    taskRunId: source.task_run_id,
    childFlowRunId: source.child_flow_run_id,
    cacheKey: source.cache_key,
    scheduledTime: this.map('string', source.scheduled_time, 'Date'),
    cacheExpiration: this.map('string', source.cache_expiration, 'Date'),
    pauseTimeout: this.map('string', source.pause_timeout, 'Date'),
    pauseRescheduledTime: source.pause_rescheduled_time,
  }
}

export const mapStateDetailsToStateDetailsResponse: MapFunction<StateDetails, StateDetailsResponse> = function(source: StateDetails): StateDetailsResponse {
  return {
    'flow_run_id': source.flowRunId,
    'task_run_id': source.taskRunId,
    'child_flow_run_id': source.childFlowRunId,
    'cache_key': source.cacheKey,
    'scheduled_time': this.map('Date', source.scheduledTime, 'string'),
    'cache_expiration': this.map('Date', source.cacheExpiration, 'string'),
    'pause_timeout': this.map('Date', source.pauseTimeout, 'string'),
    'pause_rescheduled_time': source.pauseRescheduledTime,
  }
}

export const mapStateDetailsCreateToStateDetailsRequest: MapFunction<StateDetailsCreate, StateDetailsRequest> = function(source: StateDetailsCreate): StateDetailsRequest {
  return {
    ...mapCamelToSnakeCase(source),
    'scheduled_time': source.scheduledTime ? this.map('Date', source.scheduledTime, 'string') : null,
    'cache_expiration': source.cacheExpiration ? this.map('Date', source.cacheExpiration, 'string') : null,
  }
}

export const mapStateDetailsToStateDetailsRequest: MapFunction<StateDetails, StateDetailsRequest> = function(source: StateDetails): StateDetailsRequest {
  return {
    ...mapCamelToSnakeCase(source),
    'scheduled_time': source.scheduledTime ? this.map('Date', source.scheduledTime, 'string') : null,
    'cache_expiration': source.cacheExpiration ? this.map('Date', source.cacheExpiration, 'string') : null,
    'pause_timeout': source.pauseTimeout ? this.map('Date', source.pauseTimeout, 'string') : null,
  }
}

