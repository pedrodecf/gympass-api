import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Academia Próxima',
        description: 'Academia do Pedrão',
        phone: '123456789',
        latitude: -21.1860682,
        longitude: -47.7155688,
      })

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'Academi Distante',
        description: 'Birl Gym',
        phone: '123456789',
        latitude: -21.3437731,
        longitude: -47.7303053,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -21.1860682,
        longitude: -47.7155688,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Academia Próxima',
      }),
    ])
  })
}) //
