import { FlowRunNotificationPolicy } from '@/client/models/FlowRunNotificationPolicy'
import { Notification } from '@/models/Notification'
import { MapFunction } from '@/services/Mapper'

const convertToLowerCase = (array: string[]): string[] => array.map((stateName: string) => stateName.toLowerCase())
export const mapFlowRunNotificationPolicyToNotification: MapFunction<FlowRunNotificationPolicy, Notification> = function(source: FlowRunNotificationPolicy): Notification {
  return new Notification({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    isActive: source.is_active,
    stateNames: convertToLowerCase(source.state_names),
    tags: source.tags,
    blockDocumentId: source.block_document_id,
  })
}
