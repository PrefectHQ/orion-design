import { SchemaDefinitionsResponse, SchemaPropertiesResponse, SchemaPropertyResponse, SchemaResponse } from '@/models/api/SchemaResponse'
import { MapFunction } from '@/services/Mapper'
import { resolveSchema } from '@/services/schemas/resolvers/schemas'
import { Schema, SchemaDefinitions, schemaHas, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { mapEntries } from '@/utilities'

export const mapSchemaResponseToSchema: MapFunction<SchemaResponse, Schema> = function(source: SchemaResponse): Schema {
  const { definitions, properties, $ref } = source

  const mapped: Schema = {
    secretFields: source.secret_fields,
    properties: this.map('SchemaPropertiesResponse', properties, 'SchemaProperties'),
    definitions: this.map('SchemaDefinitionsResponse', definitions, 'SchemaDefinitions'),
    // todo: this map isn't working (ts error). Not using this anywhere so commenting it out for now
    // blockSchemaReferences: this.map('BlockSchemaReferencesResponse', block_schema_references, 'BlockSchemaReferences'),
  }

  if ($ref) {
    mapped.$ref = $ref
  }

  return resolveSchema(mapped)
}

export const mapSchemaDefinitionsResponseToSchemaDefinitions: MapFunction<SchemaDefinitionsResponse, SchemaDefinitions> = function(source: SchemaDefinitionsResponse): SchemaDefinitions {
  return mapEntries(source, (key, value) => this.map('SchemaResponse', value, 'Schema'))
}

export const mapSchemaPropertiesResponseToSchemaProperties: MapFunction<SchemaPropertiesResponse, SchemaProperties> = function(source: SchemaPropertiesResponse): SchemaProperties {
  return mapEntries(source, (key, value) => this.map('SchemaPropertyResponse', value, 'SchemaProperty'))
}

export const mapSchemaPropertyResponseToSchemaProperty: MapFunction<SchemaPropertyResponse, SchemaProperty> = function(source: SchemaPropertyResponse): SchemaProperty {
  const { properties, $ref, ...rest } = source

  const mapped: SchemaProperty = {
    blockTypeSlug: source.block_type_slug,
    ...rest,
  }

  // its important that if mapped.properties doesn't exist at all that we don't add it as undefined
  if (schemaHas(source, 'properties')) {
    mapped.properties = this.map('SchemaPropertiesResponse', properties, 'SchemaProperties')
  }

  if ($ref) {
    mapped.$ref = $ref
  }

  return mapped
}