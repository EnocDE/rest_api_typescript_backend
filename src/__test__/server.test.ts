import request from "supertest";
import server from "../server"

describe('GET /api', () => {
  test('should send back a json response', async () => {
    const res = await request(server).get('/api')

    // Lo que debe obtener
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body.msg).toBe('desde api')

    // Lo que no debe obtener
    expect(res.status).not.toBe(404)
    expect(res.body.msg).not.toBe('Desde API')
  })
})