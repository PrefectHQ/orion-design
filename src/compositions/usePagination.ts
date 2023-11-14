import { Getter } from '@prefecthq/prefect-design'
import { SubscriptionOptions, UseSubscription, useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRef, Ref, computed, reactive, ref, watch } from 'vue'
import { GLOBAL_API_LIMIT } from '@/compositions/useFilterPagination'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { repeat } from '@/utilities/arrays'

type PaginationFilter = {
  limit?: number,
  offset?: number,
}

// typescript only lets you use any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PaginationParameters = [filter?: PaginationFilter, ...any[]]
type PaginationFetchAction = (...parameters: PaginationParameters) => Promise<unknown[]>
type PaginationCountAction = (...parameters: PaginationParameters) => Promise<number>

export type PaginationOptions = SubscriptionOptions & {
  mode?: 'page' | 'infinite',
  page?: MaybeRef<number>,
}

export type UsePaginationParameters<
  TFetch extends PaginationFetchAction,
  TFetchParameters extends Getter<Parameters<TFetch> | null>,
  TCount extends PaginationCountAction,
  TCountParameters extends Getter<Parameters<TCount> | null>
> = {
  fetchMethod: TFetch,
  fetchParameters: TFetchParameters,
  countMethod: TCount,
  countParameters: TCountParameters,
  options?: PaginationOptions,
}

export type UsePaginationEntity<
  TFetch extends PaginationFetchAction,
  TCount extends PaginationCountAction,
  TProperty extends string
> = Omit<UsePagination<TFetch, TCount>, 'results'> & {
  [ P in TProperty ]: ComputedRef<Awaited<ReturnType<TFetch>>>
}

export type UsePagination<
  TFetch extends PaginationFetchAction,
  TCount extends PaginationCountAction
> = {
  subscriptions: UseSubscriptions<TCount | TFetch | (() => undefined)>['subscriptions'],
  results: ComputedRef<Awaited<ReturnType<TFetch>>>,
  total: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: Ref<number>,
  next: () => void,
  previous: () => void,
}

export function usePagination<
  TFetch extends PaginationFetchAction,
  TFetchParameters extends Getter<Parameters<TFetch> | null>,
  TCount extends PaginationCountAction,
  TCountParameters extends Getter<Parameters<TCount> | null>
>({
  fetchMethod,
  fetchParameters: fetchParametersGetter,
  countMethod,
  countParameters: countParametersGetter,
  options,
}: UsePaginationParameters<TFetch, TFetchParameters, TCount, TCountParameters>): UsePagination<TFetch, TCount> {

  type TFetchFilter = Parameters<TFetch>[0]

  const mode = getMode()
  const page = getPageRef()
  const pages = computed(() => Math.ceil(total.value / getLimit()))

  const countSubscriptionParameters = computed(() => {
    if (page.value) {
      return countParametersGetter()
    }

    return null
  })
  const countSubscription = useSubscriptionWithDependencies(countMethod, countSubscriptionParameters, options)
  const total = computed(() => countSubscription.response ?? 0)

  const fetchSubscriptionParameters = ref(getFetchSubscriptionParameters()) as Ref<Parameters<TFetch>[] | null>
  const fetchSubscriptions: UseSubscription<TFetch>[] = reactive([])
  const results = computed(() => fetchSubscriptions.flatMap(subscription => subscription.response ?? []) as unknown as Awaited<ReturnType<TFetch>>)

  watch([total, fetchSubscriptionParameters], ([total, parameters]) => {
    if (parameters === null || total === 0) {
      fetchSubscriptions.forEach(subscription => subscription.unsubscribe())
      fetchSubscriptions.splice(0)
      return
    }

    const newSubscriptions = parameters.map(parameter => useSubscription(fetchMethod, parameter, options))

    fetchSubscriptions.forEach(subscription => subscription.unsubscribe())
    fetchSubscriptions.splice(0, Infinity, ...newSubscriptions)
  }, { immediate: true })

  const { subscriptions } = useSubscriptions(() => [
    countSubscription,
    ...fetchSubscriptions,
  ])

  function next(): void {
    if (mode === 'page') {
      page.value++
      return
    }

    const shouldLoadNextPage = page.value * getLimit() <= results.value.length

    if (shouldLoadNextPage) {
      page.value++
    }
  }

  function previous(): void {
    page.value--
  }

  function setFetchSubscriptionParameters(): void {
    fetchSubscriptionParameters.value = getFetchSubscriptionParameters()
  }

  function getFetchSubscriptionParameters(): Parameters<TFetch>[] | null {
    const parameters = fetchParametersGetter()

    if (parameters === null) {
      return null
    }

    const [filter, ...rest] = parameters
    const filters = getFetchParametersForPages(page.value, filter)

    return filters.map(filter => [filter, ...rest]) as unknown as Parameters<TFetch>[]
  }

  function getFetchParametersForPages(page: number, filter?: TFetchFilter): TFetchFilter[] {
    if (mode === 'page') {
      return [getFetchFilterForPage(page, filter)]
    }

    return repeat(page, index => getFetchFilterForPage(index + 1, filter))
  }

  function getFetchFilterForPage(page: number, filter?: TFetchFilter): TFetchFilter {
    const limit = getLimit()
    const offset = getPageOffset(page)

    return {
      ...filter,
      offset,
      limit,
    }
  }

  function getLimit(): number {
    const [filter] = fetchParametersGetter() ?? []
    const limit = 5

    return limit
  }

  function getPageOffset(page: number): number {
    const limit = getLimit()

    return (page - 1) * limit
  }

  function getPageRef(): Ref<number> {
    if (options?.page) {
      return ref(options.page)
    }

    return ref(mode === 'page' ? 1 : 0)
  }

  function getMode(): Exclude<PaginationOptions['mode'], undefined> {
    return options?.mode ?? 'page'
  }

  watch(fetchParametersGetter, () => {
    const newPageValue = 1
    const manuallySetParameters = page.value === newPageValue

    page.value = newPageValue

    if (manuallySetParameters) {
      setFetchSubscriptionParameters()
    }
  }, { deep: true })

  watch(page, () => {
    setFetchSubscriptionParameters()
  })

  return {
    subscriptions,
    results,
    total,
    page,
    pages,
    next,
    previous,
  }
}