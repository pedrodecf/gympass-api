import { expect, describe, it, afterAll, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym.use-case'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: null,
      phone: null,
      latitude: -21.1860682,
      longitude: -47.7155688,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
}) //
