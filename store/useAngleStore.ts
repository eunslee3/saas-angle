import { create } from 'zustand'

interface AngleResponse {
  microNiche: string
  reframedProblem: string
  audience: string
  monetization: {
    approach: string
    explanation: string[]
  }
  solution: string[]
  competitorAnalysis: {
    directCompetitors: {
      name: string
      description: string
      pricing: string
      whyThisProductIsDifferent: string
    }[]
    indirectCompetitors: {
      name: string
      description: string
      pricing: string
      whyThisProductCanStealMarketShare: string
    }[]
  }
}

interface AngleStore {
  angle: AngleResponse | null
  setAngle: (idea: AngleResponse) => void
  clearAngle: () => void
}

export const useAngleStore = create<AngleStore>((set) => ({
  angle: null,
  setAngle: (angle) => set({ angle }),
  clearAngle: () => set({ angle: null }),
}))
