import { ApiResponse, PaginatedResponse, Academy, CreateAcademyRequest, PaginationParams } from './types'

export class AcademiesClient {
  private baseUrl: string

  constructor(baseUrl: string = '/api/v1') {
    this.baseUrl = baseUrl
  }

  async getAcademies(params?: PaginationParams & {
    governorate?: string
    search?: string
    isActive?: boolean
    isVerified?: boolean
  }): Promise<PaginatedResponse<Academy>> {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.governorate) searchParams.set('governorate', params.governorate)
    if (params?.search) searchParams.set('search', params.search)
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString())
    if (params?.isVerified !== undefined) searchParams.set('isVerified', params.isVerified.toString())

    const response = await fetch(`${this.baseUrl}/academies?${searchParams}`)
    return response.json()
  }

  async getAcademy(id: string): Promise<ApiResponse<Academy>> {
    const response = await fetch(`${this.baseUrl}/academies/${id}`)
    return response.json()
  }

  async createAcademy(data: CreateAcademyRequest): Promise<ApiResponse<Academy>> {
    const response = await fetch(`${this.baseUrl}/academies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async updateAcademy(id: string, data: Partial<CreateAcademyRequest>): Promise<ApiResponse<Academy>> {
    const response = await fetch(`${this.baseUrl}/academies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async deleteAcademy(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`${this.baseUrl}/academies/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  }

  async getAcademyPlayers(academyId: number): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/academies/${academyId}/players`)
    return response.json()
  }

  async getTopAcademies(limit: number = 10): Promise<ApiResponse<Academy[]>> {
    const response = await fetch(`${this.baseUrl}/academies/top?limit=${limit}`)
    return response.json()
  }

  async getAcademiesByGovernorate(governorate: string): Promise<ApiResponse<Academy[]>> {
    const response = await fetch(`${this.baseUrl}/academies/governorate/${governorate}`)
    return response.json()
  }

  async verifyAcademy(id: string): Promise<ApiResponse<Academy>> {
    const response = await fetch(`${this.baseUrl}/academies/${id}/verify`, {
      method: 'POST',
    })
    return response.json()
  }
}
