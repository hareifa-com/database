export * from './types'
export * from './players'
export * from './evaluations'
export * from './academies'

import { PlayersClient } from './players'
import { EvaluationsClient } from './evaluations'
import { AcademiesClient } from './academies'

export class ApiClient {
  public players: PlayersClient
  public evaluations: EvaluationsClient
  public academies: AcademiesClient

  constructor(baseUrl?: string) {
    this.players = new PlayersClient(baseUrl)
    this.evaluations = new EvaluationsClient(baseUrl)
    this.academies = new AcademiesClient(baseUrl)
  }
}

export default ApiClient
