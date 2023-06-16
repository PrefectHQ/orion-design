import { Ref, ref, watch } from 'vue'
import { isRecord } from '@/utilities'

export type UseSyncedRecordValue = Record<string, unknown>

export type UseSyncedRecordString = {
  valid: Ref<boolean>,
  stringRef: Ref<string>,
  recordRef: Ref<UseSyncedRecordValue>,
}

function isValidRecordString(value: unknown): value is string {
  try {
    const parsed = JSON.parse(value as string)
    return isRecord(parsed)
  } catch {
    return false
  }
}

/**
 * The useSyncedRecordString composition takes a MaybeRef of SchemaValues
 * and creates two reactive references: a string and an object.
 * It then sets up watchers to sync changes between these two references.
 * @param initialValues UseSyncedRecordValue
 * @returns UseSyncedRecordString
 */
export function useSyncedRecordString(initialValues?: UseSyncedRecordValue | string): UseSyncedRecordString {
  const initialValuesIsString = typeof initialValues === 'string'
  const recordRef = ref<UseSyncedRecordValue>(initialValuesIsString ? JSON.parse(initialValues) : initialValues)
  const stringRef = ref<string>(JSON.stringify(recordRef.value))
  const valid = ref(false)

  watch(stringRef, (newString) => {
    valid.value = isValidRecordString(newString)
    if (valid.value) {
      recordRef.value = JSON.parse(newString)
    }
  })

  watch(recordRef, (newRecord) => {
    if (isValidRecordString(stringRef.value)) {
      const stringifiedStringRef = JSON.stringify(JSON.parse(stringRef.value))
      const stringifiedRecord = JSON.stringify(newRecord)
      if (stringifiedStringRef !== stringifiedRecord) {
        stringRef.value = JSON.stringify(newRecord)
      }
    }
  })

  return {
    valid,
    stringRef,
    recordRef,
  }
}