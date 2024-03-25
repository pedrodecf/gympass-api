import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms.use-case'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Seach Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia 1',
      description: null,
      phone: null,
      latitude: -21.1860682,
      longitude: -47.7155688,
    })

    await gymsRepository.create({
      title: 'Ginásio 1',
      description: null,
      phone: null,
      latitude: -21.1860682,
      longitude: -47.7155688,
    })

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Academia 1' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia ${i}`,
        description: null,
        phone: null,
        latitude: -21.1860682,
        longitude: -47.7155688,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia 21' }),
      expect.objectContaining({ title: 'Academia 22' }),
    ])
  })
}) //
