const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {
	userOne,
	userOneId,
	populateDatabase,
	closeConnection
} = require('./fixtures/db');

beforeEach(populateDatabase);

afterAll(closeConnection);

test('should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'sumit',
			email: 'sumit@test.com',
			password: '735426!'
		})
		.expect(201);

	// check if the database was updated
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();
});

test('Login User', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password
		})
		.expect(200);

	const user = await User.findById(userOneId);
	// console.log(user);
	expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should noy login nonexistent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: 'dskjd'
		})
		.expect(404);
});

test('Upload Avatar', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);
	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Shoould update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: "Sonu"
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.name).toBe("Sonu");

});

test('Shoould update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			location: "US"
		})
		.expect(400);

});



test('Get profile for user', async () => {
	await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);
});

test('should not get profile for unauthenticated users', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('Delete account', async () => {
	await request(app).delete('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Should not Delete account if not authenticated', async () => {
	await request(app).delete('/users/me').send().expect(401);
});