// const request = require('supertest')
// const server = require('../../index')

// it(`get jokes`, async () => {
//     const res = await request(server)
//         .get('/api/jokes')
//     expect(res.statusCode)
//         .toBe(401)
//     expect(res.type)
//         .toBe('application/json')
//     expect(res.body.message)
//         .toBe('no token')
// })

// it(`gets back jokes if authorized`, async () => {
//     await request(server)
//         .post('/api/auth/register')
//         .send({
//             username: 'John',
//             password: 'myPassword',
//         })
//     const response = await request(server)
//         .post('/api/auth/login')
//         .send({
//             username: 'John',
//             password: 'myPassword',
//         })
//     let token = response.body.token
//     if (token !== undefined) {
//         const res = await request(server)
//             .get('/api/jokes')
//             .send({ token: token })
//         expect(res.statusCode)
//             .toBe(200)
//     }
// })