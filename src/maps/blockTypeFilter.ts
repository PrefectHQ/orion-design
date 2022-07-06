/* eslint-disable camelcase */
import { BlockTypeFilterRequest } from '@/models/api/BlockTypeFilterRequest'
import { BlockTypeFilter } from '@/models/BlockTypeFilter'
import { MapFunction } from '@/services/Mapper'

export const mapBlockTypeFilterToBlockTypeFilterRequest: MapFunction<BlockTypeFilter, BlockTypeFilterRequest> = function(source: BlockTypeFilter): BlockTypeFilterRequest {
  const filter: BlockTypeFilterRequest = {}

  if (source.limit) {
    filter.limit = source.limit
  }

  if (source.offset) {
    filter.offset = source.offset
  }

  if (source.blockSchemas) {
    filter.block_schemas = {}

    if (source.blockSchemas.blockCapabilities) {
      filter.block_schemas.block_capabilities = {}

      if (source.blockSchemas.blockCapabilities.all_) {
        filter.block_schemas.block_capabilities.all_ = source.blockSchemas.blockCapabilities.all_
      }
    }
  }

  if (source.blockTypes) {
    filter.block_types = {}

    if (source.blockTypes.name) {
      filter.block_types.name = {}

      if (source.blockTypes.name.like_) {
        filter.block_types.name.like_ = source.blockTypes.name.like_
      }
    }
  }


  return filter
}