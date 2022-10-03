import { BlockDocumentUpdateRequest } from '@/models/api/BlockDocumentUpdateRequest'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentUpdateToBlockDocumentUpdateRequest: MapFunction<BlockDocumentUpdate, BlockDocumentUpdateRequest> = function(source: BlockDocumentUpdate): BlockDocumentUpdateRequest {
  const { blockSchema, data: values } = source
  const schema = blockSchema.fields
  const data = this.map('SchemaValues', { values, schema }, 'SchemaValuesRequest')

  return {
    data,
  }
}