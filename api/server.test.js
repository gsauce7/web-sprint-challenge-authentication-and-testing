const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('./server.js')

const user1 = { username: "Gabriel", password: "password123" }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity check', () => {
  // expect(true).toBe(false)
  expect(true).toBe(true)
})




// describe('server', () => {
//   describe('[GET] /jokes', () => {
//     it('Returns a 401 if not user', async () => {
//       const res = await request(server).get('/api/jokes')
//       expect(res.status).toBe(401)
//     })
//   })

//   describe("[POST] /users", () => {
//     it('Registers and returns new user', async () => {
//       let res
//       res = await request(server).post("/api/auth/register").send(user1)

//       expect(res.status).toEqual(201)
//     })
//   })

//   describe('[POST] /login', () => {
//     it('Good stuff', async () => {
//       await request(server).post('/api/auth/register').send(user1)
//       let res
//       res = await request(server).post('/api/auth/login').send(user1)
//       expect(res.status).toEqual(200)
//     })
//   })


// })

//request without token:
describe('server.js', () => {

  describe('[GET] /api/jokes', () => {

    it('should return 401 because of no token', async () => {
      const res = await request(server).get('/api/jokes')
      expect(res.status).toBe(401);
    });

    it('returns json', async () => {
      const res = await request(server).get('/api/jokes');
      expect(res.type).toBe('application/json')
    });
  });

  //register with valid payload
  describe("[POST] /api/auth/register", () => {

    it('valid request returning status: 201 when new user is registered', async () => {
      await db('users').truncate()
      const res = await request(server)
        .post('/api/auth/register')
        .send(user1);
      expect(res.status).toBe(201)
    });
    //register with invalid payload
    it('invalid request returning status: 400', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "john", password: "" });
      expect(res.status).toBe(400);
    });
  });

  //login user
  describe("[POST]/api/auth/login", () => {

    //valid payload


    it('returns status: 200 when valid credentials are given', async () => {
      await request(server).post('/api/auth/register').send(user1)
      let res
      res = await request(server).post('/api/auth/login').send(user1)
      expect(res.status).toEqual(200)
    })




    //invalid payload
    it('invalid payload with error message of : Invalid credentials', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'John', password: 'password' })
      expect(res.status).toBe(401)
    })
  });
});