import { SearchGymUseCase } from '../search-gyms.use-case'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(prismaGymsRepository)

  return useCase
}
