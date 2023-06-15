export interface PinnedRepo {
  name: string,
  description: string,
  url: string,
  stargazerCount: number,
  updatedAt: Date,
  createdAt: Date,
  languages: [{
    name: string,
    size: number
  }]
}