import { BlockType } from './BlockType'

export type BlockSchemaFieldsType = 'object'

export const blockSchemaPropertyType = ['string', 'hash'] as const
export type BlockSchemaPropertyType = typeof blockSchemaPropertyType[number]

export const blockSchemaCapability = ['writable', 'readable', 'storage'] as const
export type BlockSchemaCapability = typeof blockSchemaCapability[number]

export type BlockSchemaProperty = {
  title: string,
  description: string,
  type: BlockSchemaPropertyType,
}

export type BlockSchemaFields = {
  title: string,
  description: string,
  type: BlockSchemaFieldsType,
  properties: Record<string, BlockSchemaProperty>,
  required: string[],
  blockTypeName: string,
  blockSchemaReferences: Record<string, unknown>,
}

export interface IBlockSchema {
  id: string,
  created: Date,
  updated: Date,
  checksum: string,
  fields: BlockSchemaFields,
  blockTypeId: string,
  blockType: BlockType,
  capabilities: BlockSchemaCapability[],
}

export class BlockSchema implements IBlockSchema {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public checksum: string
  public fields: BlockSchemaFields
  public blockTypeId: string
  public blockType: BlockType
  public capabilities: BlockSchemaCapability[]

  public constructor(blockSchema: IBlockSchema) {
    this.id = blockSchema.id
    this.created = blockSchema.created
    this.updated = blockSchema.updated
    this.checksum = blockSchema.checksum
    this.fields = blockSchema.fields
    this.blockTypeId = blockSchema.blockTypeId
    this.blockType = blockSchema.blockType
    this.capabilities = blockSchema.capabilities
  }
}