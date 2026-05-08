import { ApiResponse, PaginatedResponse, Player, CreatePlayerRequest, PaginationParams } from './types'

export class PlayersClient {
  private baseUrl: string

  constructor(baseUrl: string = '/api/v1') {
    this.baseUrl = baseUrl
  }

  async getPlayers(params?: PaginationParams & {
    position?: string
    governorate?: string
    search?: string
  }): Promise<PaginatedResponse<Player>> {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.position) searchParams.set('position', params.position)
    if (params?.governorate) searchParams.set('governorate', params.governorate)
    if (params?.search) searchParams.set('search', params.search)

    const response = await fetch(`${this.baseUrl}/players?${searchParams}`)
    return response.json()
  }

  async getPlayer(id: string): Promise<ApiResponse<Player>> {
    const response = await fetch(`${this.baseUrl}/players/${id}`)
    return response.json()
  }

  async createPlayer(data: CreatePlayerRequest): Promise<ApiResponse<Player>> {
    const response = await fetch(`${this.baseUrl}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async updatePlayer(id: string, data: Partial<CreatePlayerRequest>): Promise<ApiResponse<Player>> {
    const response = await fetch(`${this.baseUrl}/players/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async deletePlayer(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`${this.baseUrl}/players/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  }

  async getPlayerEvaluations(id: string): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/players/${id}/evaluations`)
    return response.json()
  }

  async getTopPlayers(limit: number = 10): Promise<ApiResponse<Player[]>> {
    const response = await fetch(`${this.baseUrl}/players/top?limit=${limit}`)
    return response.json()
  }

  async getPlayersByAcademy(academyId: number): Promise<ApiResponse<Player[]>> {
    const response = await fetch(`${this.baseUrl}/players/academy/${academyId}`)
    return response.json()
  }
}
