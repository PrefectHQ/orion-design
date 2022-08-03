import { DateString } from '@/types/dates'

export type IStateDetailsRequest = Partial<{
  flow_run_id?: string | null,
  task_run_id?: string | null,
  scheduled_time?: DateString | null,
  cache_key?: string | null,
  cache_expiration?: string | null,
}>