import { blockSchemaCapabilities, BlockSchemaCapability } from '@/models/BlockSchema'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities/arrays'

export const randomBlockSchemaCapability: MockFunction<BlockSchemaCapability, []> = function() {
  return choice(blockSchemaCapabilities.slice())
}