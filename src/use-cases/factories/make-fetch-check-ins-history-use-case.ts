import { CheckInsHistoryUseCase } from '../fetch-check-ins-history.use-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchCheckInHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new CheckInsHistoryUseCase(prismaCheckInsRepository)

  return useCase
}
