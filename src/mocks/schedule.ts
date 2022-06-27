import { IntervalSchedule, CronSchedule, RRuleSchedule, Schedule } from '@/models'
import { MockFunction } from '@/services/Mocker'
import { uniform } from '@/utilities/math'

const intervalSchedules = [1, 30, 60, 900, 1800, 3600, 86400]

const cronSchedules = [
  '* * * * *',
  '0 0 * * *',
  '@daily',
  '@hourly',
]

const rruleSchedules = [
  'DTSTART:20120201T023000Z RRULE:FREQ=MONTHLY;COUNT=5',
  'DTSTART:20120201T023000Z RRULE:FREQ=DAILY;COUNT=30',
]

export const randomSchedule: MockFunction<Schedule, [{ type?: 'interval' | 'cron' | 'rrule' }, Partial<Schedule>?]> = function({ type }) {
  let schedule: Schedule

  const interval = intervalSchedules[uniform(0, intervalSchedules.length - 1)]
  const cron = cronSchedules[uniform(0, cronSchedules.length - 1)]
  const rrule = rruleSchedules[uniform(0, rruleSchedules.length - 1)]

  if (type) {
    switch (type) {
      case 'interval':
        schedule = new IntervalSchedule({ interval, timezone: null, anchorDate: this.create('date') })
        break
      case 'cron':
        schedule = new CronSchedule({ cron, timezone: null, dayOr: false })
        break
      case 'rrule':
        schedule = new RRuleSchedule({ rrule, timezone: null })
        break
    }
  } else {
    const coinFlip = uniform(0, 100)

    if (coinFlip > 55) {
      schedule = new IntervalSchedule({ interval, timezone: null, anchorDate: this.create('date') })
    } else if (coinFlip > 10) {
      schedule = new CronSchedule({ cron, timezone: null, dayOr: false })
    } else {
      schedule = new RRuleSchedule({ rrule, timezone: null })
    }
  }

  return schedule
}