import { KeyedDataStoreFindCallback } from './KeyedDataStore'
import { MockApi } from './MockApi'
import { Artifact } from '@/models'
import { ArtifactsFilter } from '@/models/Filters'
import { IWorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'

const artifactsItemIntersectsFilter = (filter: ArtifactsFilter): KeyedDataStoreFindCallback<Artifact> => {
  return (artifact: Artifact): boolean => {
    let filtered = false

    if (filter.artifacts?.flowRunId?.length) {
      filtered = !!artifact.flowRunId && !filter.artifacts.flowRunId.includes(artifact.flowRunId)
    }

    if (!filtered && filter.artifacts?.taskRunId?.length) {
      filtered = !!artifact.taskRunId && !filter.artifacts.taskRunId.includes(artifact.taskRunId)
    }

    if (!filtered && filter.artifacts?.key?.length) {
      filtered = !!artifact.key && !filter.artifacts.key.includes(artifact.key)
    }

    if (!filtered && filter.artifacts?.type?.length) {
      filtered = !filter.artifacts.type.includes(artifact.type)
    }

    return !filtered
  }
}

export class MockWorkspaceArtifactsApi extends MockApi implements IWorkspaceArtifactsApi {
  public async getArtifact(id: string): Promise<Artifact> {
    return await this.artifacts.get(id)
  }

  public async getArtifacts(filter: ArtifactsFilter = {}): Promise<Artifact[]> {
    const { limit = 200, offset = 0, sort = 'CREATED_DESC' } = filter
    let artifacts = await this.artifacts.findAll(artifactsItemIntersectsFilter(filter))

    switch (sort) {
      /* eslint-disable id-length */
      case 'CREATED_DESC':
        artifacts = artifacts.sort((a, b) => b.created.getTime() - a.created.getTime())
        break
      case 'KEY_ASC':
        artifacts = artifacts.sort((a, b) => a.key?.localeCompare(b.key ?? '') ?? 0)
        break
      case 'KEY_DESC':
        artifacts = artifacts.sort((a, b) => b.key?.localeCompare(a.key ?? '') ?? 0)
        break
      default:
        break
      /* eslint-enable id-length */
    }

    artifacts = artifacts.slice(offset, offset + limit)

    if (filter.artifacts?.isLatest) {
      artifacts = artifacts.filter(artifact => {
        const otherArtifacts = artifacts.filter(otherArtifact => otherArtifact.key === artifact.key)
        return otherArtifacts.length === 1 || otherArtifacts[0].created.getTime() <= artifact.created.getTime()
      })
    }


    return artifacts
  }

  public async getArtifactsCount(filter: ArtifactsFilter = {}): Promise<number> {
    return await this.artifacts.count(artifactsItemIntersectsFilter(filter))
  }

  public async deleteArtifact(id: string): Promise<void> {
    return await this.artifacts.delete(`/${id}`)
  }
}
