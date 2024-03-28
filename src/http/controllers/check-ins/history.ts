import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchCheckInsHistoryUseCase = makeFetchCheckInHistoryUseCase()

  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.code(201).send({
    checkIns,
  })
}
