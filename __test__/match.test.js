const app = require('../app');
const request = require('supertest');
const {createToken} = require('../helpers/jwt');
const {User, sequelize, MatchDetail, Match} = require('../models');
let validToken1, validToken2, validToken3;
let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY1MzkwMzQwfQ.ZcGWluNdP_tUW4W_dBblT9FV7pujsZADF02GbITmi4"
const {queryInterface} = sequelize;

const userTest1 = {
  email: "user1@test.com",
  name: "user 1",
  bio: "test",
  password: "password"
}

const userTest2 = {
  email: "user2@test.com",
  name: "user 2",
  bio: "test",
  password: "password"
}

const userTest3 = {
  email: "user3@test.com",
  name: "user 3",
  bio: "test",
  password: "password"
}

const newMatch = {
  "name": "Pertandingan Silaturahmi Kamis Putih",
  "location": "Jakarta Selatan",
  "date": "2022-12-25 10:00:00",
  "CategoryId": 1,
  "capacity": 10,
  "currentCapacity": 3,
  "status": 1,
  "duration": "2",
  "type": 1,
  "description": "Pertandingan ini digelar untuk mempererat silaturahmi di hari yang diberkati",
  "UserId": 3,
  "FieldId": 1
}

beforeAll(async () => {
  const user1 = await User.create(userTest1);
  validToken1 = createToken({id: user1.id});

  const user2 = await User.create(userTest2);
  validToken2 = createToken({id: user2.id});

  const user3 = await User.create(userTest3);
  validToken3 = createToken({id: user3.id});

  const categories = require('../data/data.json').categories.map(category => ({
    ...category,
    createdAt: new Date(),
    updatedAt: new Date()
  }))

  const fields = require('../data/data.json').fields.map(field => ({
    ...field,
    createdAt: new Date(),
    updatedAt: new Date()
  }))

  const matches = require('../data/data.json').matches.map(match => ({
    ...match,
    createdAt: new Date(),
    updatedAt: new Date()
  }))

  const matchDetails = require('../data/data.json').matchDetails.map(matchDetail => ({
    ...matchDetail,
    createdAt: new Date(),
    updatedAt: new Date()
  }))

  await queryInterface.bulkInsert('Categories', categories);
  await queryInterface.bulkInsert('Fields', fields);
  await queryInterface.bulkInsert('Matches', matches);
  await queryInterface.bulkInsert('MatchDetails', matchDetails);
})

beforeEach(() => {
  jest.restoreAllMocks()
})

afterAll(async () => {
  await queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true})
  await queryInterface.bulkDelete('Categories', null, {truncate: true, cascade: true, restartIdentity: true})
  await queryInterface.bulkDelete('Fields', null, {truncate: true, cascade: true, restartIdentity: true})
  await queryInterface.bulkDelete('Matches', null, {truncate: true, cascade: true, restartIdentity: true})
  await queryInterface.bulkDelete('MatchDetails', null, {truncate: true, cascade: true, restartIdentity: true})
})

describe('POST /matches', function () {
  test('it should return created', async () => {
    const response = await request(app)
      .post('/matches')
      .send(newMatch)
      .set('access_token', validToken3)
    expect(response.status).toEqual(201)
  })
  test('it should return bad request', async () => {
    const response = await request(app)
      .post('/matches')
      .send()
      .set('access_token', validToken3)
    expect(response.status).toEqual(400)
  })
});

describe('DELETE /matches/:matchId', function () {
  test('it should return not found', async () => {
    const response = await request(app)
      .delete('/matches/3')
      .set('access_token', validToken1)
    expect(response.status).toEqual(403)
  })

  test('it should return success', async () => {
    const response = await request(app)
      .delete('/matches/3')
      .set('access_token', validToken3)
    expect(response.status).toEqual(200)
  })
  test('it should return not found', async () => {
    const response = await request(app)
      .delete('/matches/5')
      .set('access_token', validToken3)
    expect(response.status).toEqual(404)
  })
});

describe('GET /matches', () => {
  test('it should return all matches', async () => {
    const response = await request(app)
      .get('/matches')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })

  test('it should return unauthorized', async () => {
    const response = await request(app)
      .get('/matches');
    expect(response.status).toEqual(401);
  })

  test('it should return invalid token', async () => {
    const response = await request(app)
      .get('/matches')
      .set('access_token', invalidToken);
    expect(response.status).toEqual(401);
  })

  test('it should return all matches if there is status in query params', async () => {
    const response = await request(app)
      .get('/matches?status=1&userId=1')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })

  test('it should return all matches if there is user id in query params && user id matches auth user id', async () => {
    const response = await request(app)
      .get('/matches?userId=1')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })

  test('it should return all matches if there is location in query params', async () => {
    const response = await request(app)
      .get('/matches?location=jak')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })

  test('it should return all matches if there is category in query params', async () => {
    const response = await request(app)
      .get('/matches?category=1')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })


  test('it should return forbidden', async () => {
    const response = await request(app)
      .get('/matches?userId=3')
      .set('access_token', validToken1);
    expect(response.status).toEqual(403);
  })

  test('it should return internal server error', async () => {
    const response = await request(app)
      .get('/matches?status=1')
      .set('access_token', validToken1);
    expect(response.status).toEqual(500);
  })
})

describe('GET /matches/:matchId', () => {
  test('it should return match detail', async () => {
    const response = await request(app)
      .get('/matches/1')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  })
  test('it should return error', async () => {
    // User.findAll = jest.fn().mockRejectedValue('Error')

    jest.spyOn(Match, 'findByPk').mockRejectedValue('Error')

    const response = await request(app)
      .get('/matches/1')
      .set('access_token', validToken1);
    expect(response.status).toEqual(500);
  })
})

describe('POST /matches/:matchId/join', () => {
  test('it should return created', async () => {
    const response = await request(app)
      .post('/matches/2/join')
      .set('access_token', validToken3);
    expect(response.status).toEqual(201);
  })
  test('it should return bad request', async () => {
    const response = await request(app)
      .post('/matches/2/join')
      .set('access_token', validToken3);
    expect(response.status).toEqual(400);
  })
})

describe('GET /matches/:matchId/participants', () => {
  test('it should return pending incoming request participants', async () => {
    const response = await request(app)
      .get('/matches/1/participants')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  })

  test('it should return forbidden', async () => {
    const response = await request(app)
      .get('/matches/1/participants')
      .set('access_token', validToken3);
    expect(response.status).toEqual(403);
  })
});

describe('PATCH /matches/:matchId/participants/:participantId', () => {
  test('it should return success with status 1', async () => {
    const response = await request(app)
      .patch('/matches/2/participants/3')
      .send('status=1')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
  })
  test('it should return success with status 2', async () => {
    const response = await request(app)
      .patch('/matches/2/participants/3')
      .send('status=2')
      .set('access_token', validToken1);
    expect(response.status).toEqual(200);
  })
  test('it should return invalid token', async () => {
    const response = await request(app)
      .patch('/matches/2/participants/3')
      .send('status=2')
      .set('access_token', invalidToken);
    expect(response.status).toEqual(401);
  })
  test('it should return error', async () => {
    // User.findAll = jest.fn().mockRejectedValue('Error')

    jest.spyOn(MatchDetail, 'update').mockRejectedValue('Error')

    const response = await request(app)
      .patch('/matches/2/participants/3')
      .send('status=2')
      .set('access_token', validToken1);
    expect(response.status).toEqual(500);
  })
});