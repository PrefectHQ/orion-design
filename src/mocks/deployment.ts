import { Deployment } from '@/models/Deployment'
import { MockFunction } from '@/services/Mocker'

export const randomDeployment: MockFunction<Deployment, [Partial<Deployment>?]> = function(overrides = {}) {
  return {
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('string'),
    flowId: this.create('string'),
    flowData: {
      encoding: this.create('string'),
      blob: this.create('string'),
    },
    schedule: null,
    isScheduleActive: this.create('boolean'),
    parameters: this.create('parameters'),
    tags: this.createMany('string', 3),
    flowRunner: null,
    ...overrides,
  }
}