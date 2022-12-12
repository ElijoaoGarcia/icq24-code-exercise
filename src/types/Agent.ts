export interface IReview {
  id: number
  agentId: number
  fullName: string
  description: string
}

export interface IAgent {
  id: number
  firstName: string
  lastName: string
  photoUrl: string
  agentLicense: string
  address: string
  practiceAreas: string[]
  aboutMe: string
  reviews: IReview[]
}