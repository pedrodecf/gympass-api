import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in.use-case'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'Gym Name',
      description: 'Gym Description',
      phone: '123456789',
      latitude: new Decimal(-21.1860682),
      longitude: new Decimal(-47.7155688),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.1860682,
      userLongitude: -47.7155688,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2021, 1, 1, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.1860682,
      userLongitude: -47.7155688,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -21.1860682,
        userLongitude: -47.7155688,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in differents day', async () => {
    vi.setSystemTime(new Date(2021, 1, 1, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.1860682,
      userLongitude: -47.7155688,
    })

    vi.setSystemTime(new Date(2021, 1, 2, 10, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -21.1860682,
      userLongitude: -47.7155688,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-id-2',
      title: 'Gym Name 2',
      description: 'Gym Description 2',
      phone: '123456789',
      latitude: new Decimal(-21.2123489),
      longitude: new Decimal(-47.7851449),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id-2',
        userId: 'user-id',
        userLatitude: -21.1860682,
        userLongitude: -47.7155688,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
}) //
