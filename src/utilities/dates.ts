import { isDate as dateFnsIsDate, isValid } from 'date-fns'

export function isDate(value: unknown): value is Date {
  return dateFnsIsDate(value)
}

export function isInvalidDate(value: unknown): boolean {
  return isDate(value) && !isValid(value)
}

export function sortDates(itemA: Date, itemB: Date): number {
  return itemA.getTime() - itemB.getTime()
}