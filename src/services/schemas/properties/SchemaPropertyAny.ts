import { getSchemaPropertyResponseValue, getSchemaValueDefinition, schemaPropertyServiceFactory } from '..'
import { JsonInput } from '@/components'
import { isBlockDocumentReferenceValue, isBlockDocumentValue } from '@/models'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { getSchemaPropertyDefaultValue, SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isEmptyObject, isNotNullish, sameValue } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaPropertyAny extends SchemaPropertyService {
  protected get default(): unknown {
    const isJson = this.componentIs(JsonInput)

    let defaultValue: unknown

    if (this.has('anyOf') || this.has('allOf')) {
      defaultValue = this.getDefaultValueForFirstDefinition()
    } else if (this.has('default') && isNotNullish(this.property.default)) {
      if (isBlockDocumentReferenceValue(this.property.default) || isBlockDocumentValue(this.property.default)) {
        defaultValue = this.property.default
      } else {
        defaultValue = getSchemaPropertyDefaultValue(this.property, this.level + 1)
      }
    }

    if (isJson) {
      defaultValue = stringifyUnknownJson(defaultValue)
    }

    return defaultValue
  }

  protected get component(): SchemaPropertyComponentWithProps {
    // if either of these exist let the AnyOf and AllOf components take over
    if (this.has('anyOf') || this.has('allOf')) {
      return null
    }

    return this.withProps(JsonInput)
  }

  protected request(value: SchemaValue): unknown {
    if (this.has('anyOf') || this.has('allOf')) {
      const reference = this.referenceRequest(value)

      if (reference === undefined) {
        return undefined
      }

      return reference
    }

    return parseUnknownJson(value)
  }

  protected response(value: SchemaValue): unknown {
    if (this.has('anyOf') || this.has('allOf')) {
      const reference = this.referenceResponse(value)

      if (reference === undefined) {
        return undefined
      }

      return reference
    }

    return stringifyUnknownJson(value)
  }

  private referenceResponse(value: SchemaValue): SchemaValue {
    if (value === undefined) {
      return this.invalid()
    }

    const definition = getSchemaValueDefinition(this.property, value)
    if (definition === null) {
      return this.invalid()
    }

    const service = schemaPropertyServiceFactory(definition, this.level)
    const mapped = service.mapResponseValue(value)

    return mapped

  }

  private referenceRequest(value: SchemaValue): SchemaValue {
    if (this.isDefaultValueForReference(value)) {
      return undefined
    }

    const definition = getSchemaValueDefinition(this.property, value)

    if (definition === null) {
      return value
    }

    const service = schemaPropertyServiceFactory(definition, this.level)
    const mapped = service.mapRequestValue(value)

    if (isEmptyObject(mapped)) {
      return undefined
    }

    return mapped

  }

  private getDefaultValueForFirstDefinition(): SchemaValue {
    const [firstDefinition] = this.property.anyOf ?? this.property.allOf ?? []

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (firstDefinition) {
      return getSchemaPropertyDefaultValue(firstDefinition)
    }

    throw new Error('Could not find first definition for schema property')
  }

  private isDefaultValueForReference(value: SchemaValue): boolean {
    const definitions = this.property.anyOf ?? this.property.allOf ?? []

    return definitions.some(definition => sameValue(value, getSchemaPropertyDefaultValue(definition)))
  }

}