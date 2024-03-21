import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface CheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class CheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: CheckInsHistoryUseCaseRequest): Promise<CheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
