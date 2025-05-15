// Extending our types file with API-related types

export interface Products {
  id: string
  title: string
  description: string
  problem?: string
  tags: string[]
  mrr: string
  founders: string
  createdAt: string
}

export interface Angle {
  microNiche: string
  reframedProblem: string
  audience: string
  monetization: {
    approach: string
    tiers: string[]
  }
  stack: {
    frontend: string[]
    backend: string[]
  }
  buildPlan: {
    day: string
    task: string
  }[]
}

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: User
  error?: string
}

export interface SaveAngleResponse {
  success: boolean
  message?: string
  angleId?: string
  error?: string
}

export interface GenerateAngleRequest {
  title: string
  problem: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  firstName?: string
  lastName?: string
}
