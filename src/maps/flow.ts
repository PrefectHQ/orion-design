import { Flow } from '@/models/Flow'
import { FlowResponse } from '@/models/FlowResponse'
import { MapFunction } from '@/services/Mapper'

export const mapFlowResponseToFlow: MapFunction<FlowResponse, Flow> = function(source: FlowResponse): Flow {
  return new Flow({
    id: source.id,
    name: source.name,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
  })
}

export const mapFlowToFlowResponse: MapFunction<Flow, FlowResponse> = function(source: Flow): FlowResponse {
  return {
    id: source.id,
    name: source.name,
    created: this.map('Date', source.created, 'string'),
    updated: this.map('Date', source.updated, 'string'),
  }
}
