import { ApiResponse, PaginatedResponse, Evaluation, CreateEvaluationRequest, PaginationParams } from './types'

export class EvaluationsClient {
  private baseUrl: string

  constructor(baseUrl: string = '/api/v1') {
    this.baseUrl = baseUrl
  }

  async getEvaluations(params?: PaginationParams & {
    playerId?: number
    evaluatorId?: number
    minScore?: number
    maxScore?: number
    isRecommended?: boolean
    isTalentIdentified?: boolean
  }): Promise<PaginatedResponse<Evaluation>> {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.playerId) searchParams.set('playerId', params.playerId.toString())
    if (params?.evaluatorId) searchParams.set('evaluatorId', params.evaluatorId.toString())
    if (params?.minScore) searchParams.set('minScore', params.minScore.toString())
    if (params?.maxScore) searchParams.set('maxScore', params.maxScore.toString())
    if (params?.isRecommended !== undefined) searchParams.set('isRecommended', params.isRecommended.toString())
    if (params?.isTalentIdentified !== undefined) searchParams.set('isTalentIdentified', params.isTalentIdentified.toString())

    const response = await fetch(`${this.baseUrl}/evaluations?${searchParams}`)
    return response.json()
  }

  async getEvaluation(id: string): Promise<ApiResponse<Evaluation>> {
    const response = await fetch(`${this.baseUrl}/evaluations/${id}`)
    return response.json()
  }

  async createEvaluation(data: CreateEvaluationRequest): Promise<ApiResponse<Evaluation>> {
    const response = await fetch(`${this.baseUrl}/evaluations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async updateEvaluation(id: string, data: Partial<CreateEvaluationRequest>): Promise<ApiResponse<Evaluation>> {
    const response = await fetch(`${this.baseUrl}/evaluations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async deleteEvaluation(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`${this.baseUrl}/evaluations/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  }

  async getPlayerEvaluations(playerId: number): Promise<ApiResponse<Evaluation[]>> {
    const response = await fetch(`${this.baseUrl}/evaluations/player/${playerId}`)
    return response.json()
  }

  async getEvaluatorEvaluations(evaluatorId: number): Promise<ApiResponse<Evaluation[]>> {
    const response = await fetch(`${this.baseUrl}/evaluations/evaluator/${evaluatorId}`)
    return response.json()
  }

  async getRecentEvaluations(limit: number = 10): Promise<ApiResponse<Evaluation[]>> {
    const response = await fetch(`${this.baseUrl}/evaluations/recent?limit=${limit}`)
    return response.json()
  }

  async getTopEvaluations(limit: number = 10): Promise<ApiResponse<Evaluation[]>> {
    const response = await fetch(`${this.baseUrl}/evaluations/top?limit=${limit}`)
    return response.json()
  }

  async getTalentIdentified(): Promise<ApiResponse<Evaluation[]>> {
    const response = await fetch(`${this.baseUrl}/evaluations/talents`)
    return response.json()
  }
}
