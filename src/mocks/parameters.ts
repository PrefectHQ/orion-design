import { mocker, MockFunction } from '@/services/Mocker'
import { PydanticStringFormats } from '@/types/Pydantic'
import { Schema } from '@/types/schemas'
import { coinflip, uniform } from '@/utilities/math'

export const randomParameters: MockFunction<Record<string, unknown>, [Record<string, unknown>?, Schema?]> = function(overrides = {}, schema: Schema = mocker.create('openApiSchema')) {
  const parameters: Record<string, unknown> = {}

  if (!schema.properties) {
    return {}
  }

  const defaultTypeStringFormatMap: Record<Partial<typeof PydanticStringFormats[number]>, unknown> = {
    date: this.create('date'),
    'date-time': this.create('date'),
    email: this.create('email'),
    'json-string': '{}',
    regex: '/w+/gi',
    'time-delta': 600,
  }


  Object.keys(schema.properties).forEach((key) => {
    const { type, format, default: defaultValue } = schema.properties![key]!

    if (uniform(0, 10) > 8 && type !== 'object') {
      return
    }

    let val: unknown = undefined

    switch (type) {
      case 'array':
        val = this.createMany('string', uniform(0, 6))
        break
      case 'string':
        if (coinflip(0.1)) {
          val = format ? defaultTypeStringFormatMap[format] : this.create('sentence')
        } else {
          val = defaultValue
        }
        break
      case 'number':
      case 'integer':
        val = this.create('number')
        break
      case 'boolean':
        val = this.create('boolean')
        break
      case 'object':
        val = '{}'
        break
      case 'null':
      case undefined:
      default:
        break
    }

    if (typeof val !== 'undefined') {
      parameters[key] = val
    }

  })


  return { ...parameters, ...overrides }
}