import { randomAny } from './any'
import { randomBlockDocument } from './blockDocument'
import { randomBlockDocumentData } from './blockDocumentData'
import { blockDocumentsApiMockFactory } from './blockDocumentsApi'
import { randomBlockSchema } from './blockSchema'
import { randomBlockSchemaCapabilities } from './blockSchemaCapabilities'
import { randomBlockSchemaCapability } from './blockSchemaCapability'
import { randomBlockSchemaFields } from './blockSchemaFields'
import { blockSchemasApiFactory } from './blockSchemasApi'
import { randomBlockType } from './blockType'
import { blockTypesApiFactory } from './blockTypesApi'
import { randomBoolean } from './boolean'
import { randomDate } from './date'
import { randomDeployment } from './deployment'
import { randomEmail } from './email'
import { randomFlow } from './flow'
import { randomFlowRun } from './flowRun'
import { randomFlowRunGraph, randomGraphNode } from './flowRunGraph'
import { randomFlowRunHistory } from './flowRunHistory'
import { randomFlowRunStateHistory } from './flowRunStateHistory'
import { randomId } from './id'
import { randomImage } from './image'
import { randomLogLevel, randomLog } from './log'
import { randomNotification } from './notification'
import { randomNumber } from './number'
import { randomOpenApiSchema, randomOpenApiProperty } from './openApi'
import { randomParameters } from './parameters'
import { randomSchedule } from './schedule'
import { randomState } from './state'
import { randomStateType } from './stateType'
import { randomChar, randomString, randomSentence, randomParagraph, randomRunName, randomNoun } from './string'
import { randomTaskRun } from './taskRun'
import { randomUiFlowRunHistory } from './UiFlowRunHistory'
import { randomWorkQueue, randomWorkQueueFilter } from './workQueue'

export const mocks = {
  any: randomAny,
  blockDocument: randomBlockDocument,
  blockDocumentData: randomBlockDocumentData,
  blockDocumentsApi: blockDocumentsApiMockFactory,
  blockSchema: randomBlockSchema,
  blockSchemaCapabilities: randomBlockSchemaCapabilities,
  blockSchemaCapability: randomBlockSchemaCapability,
  blockSchemaFields: randomBlockSchemaFields,
  blockSchemasApi: blockSchemasApiFactory,
  blockType: randomBlockType,
  blockTypesApi: blockTypesApiFactory,
  boolean: randomBoolean,
  char: randomChar,
  date: randomDate,
  deployment: randomDeployment,
  email: randomEmail,
  flow: randomFlow,
  flowRun: randomFlowRun,
  flowRunGraph: randomFlowRunGraph,
  flowRunHistory: randomFlowRunHistory,
  flowRunStateHistory: randomFlowRunStateHistory,
  graphNode: randomGraphNode,
  id: randomId,
  image: randomImage,
  log: randomLog,
  logLevel: randomLogLevel,
  notification: randomNotification,
  noun: randomNoun,
  number: randomNumber,
  openApiProperty: randomOpenApiProperty,
  openApiSchema: randomOpenApiSchema,
  paragraph: randomParagraph,
  parameters: randomParameters,
  runName: randomRunName,
  schedule: randomSchedule,
  sentence: randomSentence,
  state: randomState,
  stateType: randomStateType,
  string: randomString,
  taskRun: randomTaskRun,
  uiFlowRunHistory: randomUiFlowRunHistory,
  workQueue: randomWorkQueue,
  workQueueFilter: randomWorkQueueFilter,
}