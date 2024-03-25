import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.use-case'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Academia Próxima',
      description: null,
      phone: null,
      latitude: -21.1860682,
      longitude: -47.7155688,
    })

    await gymsRepository.create({
      title: 'Academi Distante',
      description: null,
      phone: null,
      latitude: -21.3437731,
      longitude: -47.7303053,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.1860682,
      userLongitude: -47.7155688,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Próxima' }),
    ])
  })
}) //
