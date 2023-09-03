import { showToast } from '@prefecthq/prefect-design'
import { Action } from '@prefecthq/vue-compositions'
import { localization } from '@/localization'
import { asArray } from '@/utilities/arrays'
import { getErrorMessage } from '@/utilities/errors'

export type ItemType = 'Flow' | 'Deployment' | 'Flow run' | 'Work queue' | 'Block' | 'Notification' | 'Task run' | 'Concurrency Limit' | 'Work pool'
type MaybeSingleParam<T extends Action, Params = Parameters<T>> = Params extends [unknown] ? Params[0] | Params : Params

export async function deleteItem<T extends Action>(args: MaybeSingleParam<T>, endpoint: T, type: ItemType): Promise<ReturnType<T> | void> {
  let result: Promise<ReturnType<T>>

  try {
    const endpointArgs = asArray(args)
    result = await endpoint(...endpointArgs)
    showToast(localization.success.delete(type), 'success')
    return result
  } catch (error) {
    const errMessage = getErrorMessage(error, localization.error.delete(type.toLowerCase()))
    showToast(errMessage, 'error')

    console.error(error)
  }
}