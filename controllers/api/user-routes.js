const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (request, response) => {
  console.log('API User-Routes - /');
  try {
    const dbUserData = await User.create({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    });

    request.session.save(() => {
      request.session.loggedIn = true;
      request.session.user = request.body.email;
      response.status(200).json(dbUserData);
    });
  } catch (err) {
    response.status(500).json(err);
  }
});

// Login
router.post('/login', async (request, response) => {
  console.log('API User-Routes - /login');
  try {
    const dbUserData = await User.findOne({
      where: {
        email: request.body.email,
      },
    });
    if (!dbUserData) {
      response.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(request.body.password);

    if (!validPassword) {
      response.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
  console.log('login', request.body.email);
    request.session.save(() => {
      request.session.loggedIn = true;
      request.session.user = request.body.email;
      response.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    response.status(500).json(err);
  }
});
// Logout
router.post('/logout', (request, response) => {
  console.log('API User-Routes - /logout');
  if (request.session.loggedIn) {
    request.session.destroy(() => {
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

module.exports = router;
