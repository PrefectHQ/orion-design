import { Section } from '@/demo/router/routeRecords'
import { blocks } from '@/demo/sections/blocks'
import { deployments } from '@/demo/sections/deployments'
import { flowRuns } from '@/demo/sections/flowRuns'
import { general } from '@/demo/sections/general'
import { notifications } from '@/demo/sections/notifications'
import { states } from '@/demo/sections/states'

export const sections: Section = {
  general,
  blocks,
  deployments,
  flowRuns,
  notifications,
  states,
}