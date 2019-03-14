import request from 'supertest'
import pubsub from './pubsub'

describe('Test LDN inboxes', () => {
  test('requires target', async () => {
    const response = await request(pubsub).get('/inbox')
    expect(response.statusCode).toBe(400)
  })

  test('has an inbox for a target', async () => {
    const response = await request(pubsub).get('/inbox')
      .query({ target: 'https://lobid.org/gnd/118696432' })
    expect(response.statusCode).toBe(200)
    expect(Object.keys(response.body).length).toBeGreaterThan(0)
  })

  test('accepts notifications for a target', async () => {
    const response = await request(pubsub).post('/inbox')
      .query({ target: 'https://lobid.org/gnd/118696432' })
      .set('Content-Type', 'application/ld+json')
      .send({ foo: 'bar' })
    expect(response.statusCode).toBe(202)
  })
})
