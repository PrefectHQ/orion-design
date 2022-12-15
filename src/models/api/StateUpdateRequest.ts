import { StateDetailsRequest } from '@/models/StateDetailsRequest'
import { ServerStateType } from '@/models/StateType'

export interface StateUpdateRequestDetails {
  type: ServerStateType,
  name?: string,
  message?: string,
  state_details?: StateDetailsRequest,
}

export type StateUpdateRequest = {
  state: StateUpdateRequestDetails,
}
