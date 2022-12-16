import { DeploymentFlowRunCreate, DeploymentUpdate } from '@/models'
import { Deployment } from '@/models/Deployment'
import { DeploymentResponse } from '@/models/DeploymentResponse'
import { FlowRun } from '@/models/FlowRun'
import { FlowRunResponse } from '@/models/FlowRunResponse'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { UnionFilters } from '@/types/UnionFilters'

export interface IWorkspaceDeploymentsApi {
  getDeployment: (deploymentId: string) => Promise<Deployment>,
  getDeployments: (filter: UnionFilters) => Promise<Deployment[]>,
  getDeploymentsCount: (filter: UnionFilters) => Promise<number>,
  createDeploymentFlowRun: (deploymentId: string, request: DeploymentFlowRunCreate) => Promise<FlowRun>,
  updateDeployment: (deploymentId: string, request: DeploymentUpdate) => Promise<void>,
  pauseDeployment: (deploymentId: string) => Promise<void>,
  resumeDeployment: (deploymentId: string) => Promise<void>,
  deleteDeployment: (deploymentId: string) => Promise<void>,
}

export class WorkspaceDeploymentsApi extends WorkspaceApi implements IWorkspaceDeploymentsApi {

  protected override routePrefix = '/deployments'

  public async getDeployment(deploymentId: string): Promise<Deployment> {
    const { data } = await this.get<DeploymentResponse>(`/${deploymentId}`)

    return mapper.map('DeploymentResponse', data, 'Deployment')
  }

  public async getDeployments(filter: UnionFilters = {}): Promise<Deployment[]> {
    const { data } = await this.post<DeploymentResponse[]>('/filter', filter)

    return mapper.map('DeploymentResponse', data, 'Deployment')
  }

  public async getDeploymentsCount(filter: UnionFilters = {}): Promise<number> {
    const { data } = await this.post<number>('/count', filter)

    return data
  }

  public async createDeploymentFlowRun(deploymentId: string, request: DeploymentFlowRunCreate): Promise<FlowRun> {
    const body = mapper.map('DeploymentFlowRunCreate', request, 'DeploymentFlowRunRequest')
    const { data } = await this.post<FlowRunResponse>(`/${deploymentId}/create_flow_run`, body)

    return mapper.map('FlowRunResponse', data, 'FlowRun')
  }

  public updateDeployment(deploymentId: string, request: DeploymentUpdate): Promise<void> {
    const body = mapper.map('DeploymentUpdate', request, 'DeploymentUpdateRequest')

    return this.patch(`/${deploymentId}`, body)
  }

  public pauseDeployment(id: string): Promise<void> {
    return this.post(`/${id}/set_schedule_inactive`)
  }

  public resumeDeployment(id: string): Promise<void> {
    return this.post(`/${id}/set_schedule_active`)
  }

  public deleteDeployment(deploymentId: string): Promise<void> {
    return this.delete(`/${deploymentId}`)
  }
}
