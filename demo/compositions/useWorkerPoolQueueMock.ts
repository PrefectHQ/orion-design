import { useSeeds } from './useSeeds'
import { useWorkerPoolMock } from './useWorkerPoolMock'
import { WorkerPoolQueue } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'


export function useWorkerPoolQueueMock(override?: Partial<WorkerPoolQueue>): WorkerPoolQueue {
  const workerPool = mocker.create('workerPool')
  const workerPoolQueue = mocker.create('workerPoolQueue', [{ ...override, workerPoolId: workerPool.id }])

  useSeeds({
    workerPoolQueues: [workerPoolQueue],
    workerPools: [workerPool],
  })

  return workerPoolQueue
}

export function useWorkerPoolQueuesMock(count: number, override?: () => Partial<WorkerPoolQueue>): WorkerPoolQueue[] {
  const workerPool = useWorkerPoolMock()

  const workerPoolQueues = repeat(count, () => {
    return mocker.create('workerPoolQueue', [
      {
        workerPoolId: workerPool.id,
        ...override?.(),
      },
    ])
  })

  useSeeds({
    workerPools: [workerPool],
    workerPoolQueues,
  })

  return workerPoolQueues
}