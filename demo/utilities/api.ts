import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
import { MockWorkspaceBlockCapabilitiesApi } from '../services/mockWorkspaceBlockCapabilitiesApi'
import { MockWorkspaceBlockDocumentsApi } from '../services/mockWorkspaceBlockDocumentsApi'
import { MockWorkspaceBlockSchemasApi } from '../services/mockWorkspaceBlockSchemasApi'
import { MockWorkspaceBlockTypesApi } from '../services/mockWorkspaceBlockTypesApi'
import { MockWorkspaceConcurrencyLimitsApi } from '../services/mockWorkspaceConcurrencyLimitsApi'
import { MockWorkspaceDeploymentsApi } from '../services/mockWorkspaceDeploymentsApi'
import { MockWorkspaceFlowRunsApi } from '../services/mockWorkspaceFlowRunsApi'
import { MockWorkspaceFlowsApi } from '../services/mockWorkspaceFlowsApi'
import { MockWorkspaceTaskRunsApi } from '../services/mockWorkspaceTaskRunsApi'
import { MockWorkspaceWorkPoolQueuesApi } from '../services/mockWorkspaceWorkPoolQueuesApi'
import { MockWorkspaceWorkPoolsApi } from '../services/mockWorkspaceWorkPoolsApi'
import { MockWorkspaceWorkPoolWorkerApi } from '../services/mockWorkspaceWorkPoolWorkerApi'
import { MockWorkspaceWorkQueuesApi } from '../services/mockWorkspaceWorkQueuesApi'
import { FlowRunGraphMock } from '@/demo/types/flowRunGraphMock'
import { BlockDocument, BlockSchema, BlockType, Deployment, Flow, FlowRun, TaskRun, WorkPool, WorkPoolQueue, WorkQueue, WorkPoolWorker, Artifact } from '@/models'
import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { CreateApi, workspaceApiKey } from '@/utilities'

export type ApiMockSeeds = {
  artifacts?: Artifact[],
  flows?: Flow[],
  flowRuns?: FlowRun[],
  flowRunGraphs?: FlowRunGraphMock[],
  blockDocuments?: BlockDocument[],
  blockSchemas?: BlockSchema[],
  blockTypes?: BlockType[],
  concurrencyLimits?: ConcurrencyLimit[],
  taskRuns?: TaskRun[],
  deployments?: Deployment[],
  workQueues?: WorkQueue[],
  blockCapabilities?: string[],
  workPools?: WorkPool[],
  workPoolQueues?: WorkPoolQueue[],
  workPoolWorkers?: WorkPoolWorker[],
}

function createApiMock(): Partial<CreateApi> {
  return {
    flows: createActions(new MockWorkspaceFlowsApi()),
    flowRuns: createActions(new MockWorkspaceFlowRunsApi()),
    blockDocuments: createActions(new MockWorkspaceBlockDocumentsApi()),
    blockSchemas: createActions(new MockWorkspaceBlockSchemasApi()),
    blockTypes: createActions(new MockWorkspaceBlockTypesApi()),
    blockCapabilities: createActions(new MockWorkspaceBlockCapabilitiesApi()),
    concurrencyLimits: createActions(new MockWorkspaceConcurrencyLimitsApi),
    taskRuns: createActions(new MockWorkspaceTaskRunsApi()),
    deployments: createActions(new MockWorkspaceDeploymentsApi()),
    workQueues: createActions(new MockWorkspaceWorkQueuesApi()),
    workPools: createActions(new MockWorkspaceWorkPoolsApi()),
    workPoolQueues: createActions(new MockWorkspaceWorkPoolQueuesApi()),
    workPoolWorkers: createActions(new MockWorkspaceWorkPoolWorkerApi()),
  }
}

export function useWorkspaceApiMock(): Partial<CreateApi> {
  const api = createApiMock()

  provide(workspaceApiKey, api)

  return api
}