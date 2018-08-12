const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const Game = require('../../models/Game');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  app.post('/api/account/register', (req, res, next) => {
    const { firstName, lastName, password } = req.body;
    let { email } = req.body;

    if(!firstName || !lastName || !email || !password) {
      return res.send({
        success: false,
        error: 'Make sure all fields are filled out!'
      });
    };

    User.find({
      email: email
    }, (err, prevUser) => {
      if(err) {
        return res.send({
          success: false,
          error: 'Server error.'
        });
      } else if (prevUser.length > 0) {
      return res.send({
        success: false,
        error: 'Account already exists.'
      });
    };
  });

    const newUser = new User();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);

    newUser.save((err, user) => {
      if(err) {
        return res.send({
          success: false,
          error: 'Server error.'
        });
      };
      return res.send({
        success: true,
        message: 'Authenticated!',
        info: user
      });
    });
  });


  app.post('/api/account/login', (req, res, next) => {
    const { password } = req.body;
    let { email } = req.body;

    if(!email || !password) {
      return res.send({
        success: false,
        error: 'All fields must be filled out!'
      });
    };

    User.find({
      email: email
    }, (err, users) => {
      if(err) {
        return res.send({
          success: false,
          error: 'Server error.'
        });
      };
      if(users.length != 1) {
        return res.send({
          success: false,
          error: 'User doesn\'t exist!'
        });
      };

      const user = users[0];
      if(!user.validPassword(password)) {
        return res.send({
          success: false,
          error: 'Invalid password.'
        });
      };

      const userSession = new UserSession();
      userSession.uid = user._id;
      userSession.firstName = user.firstName;
      userSession.email = user.email
      userSession.save(async (err, data) => {
        if(err) {
          return res.send({
            success: false,
            error: 'Server error.'
          });
        };
        return res.send({
          success: true,
          message: 'Successfully signed in.',
          token: data._id,
          name: data.firstName,
          email: data.email
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      active: false
    }, (err, sessions) => {
      if(err) {
        return res.send({
          success: false,
          error: 'Server error.'
        });
      };
      if(sessions.length != 1) {
        return res.send({
          success: false,
          error: 'Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Successfully verified.',
          firstName: sessions[0].firstName,
          email: sessions[0].email,
          uid: sessions[0].uid
        });
      };
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      active: false
    }, {
      $set: { active: true }
    }, null, (err, sessions) => {
      if(err) {
        console.log(err);
        return res.send({
          success: false,
          error: 'Something went wrong.'
        });
      };
      return res.send({
        success: true,
        message: 'Successfully logged out.'
      });
    });
  });

  app.get('/api/users', (req, res, next) => {
    User.find({}, (err, users) => {
      if(err) {
        return res.send({
          success: false,
          error: 'No users are currently available.'
        })
      }
      const userList = {};
      users.forEach(user => {
        userList[user._id] = {
          firstName: user.firstName,
          lastName: user.lastName
        };
      });
      return res.send(userList)
    });
  });

  app.post('/api/game/create', (req, res, next) => {
    const { title, players, winner, email, opponent } = req.body;

    User.find({ email }, (err, users) => {
      const user = users[0];
      const newGame = new Game();
      newGame.owner = user._id;
      newGame.title = title;
      newGame.players = [`${user.firstName} ${user.lastName}`, `${opponent}`];
      // newGame._id = user._id
      newGame.save((err, data) => {
        if(err) {
          return res.send({
            success: false,
            error: 'Failed to create game.',
            info: err
          });
        };
        return res.send({
          success: true,
          message: 'New game created.',
          info: data
        });
      });
    });
  });

  app.get('/api/game/matches', (req, res, next) => {
    Game.find({}, (err, matches) => {
      res.send({
        info: matches
      });
    })
    // Game.find({}, (err, matches) => {
    //   console.log(matches);
    //   if(err) {
    //     return res.send({
    //       success: false,
    //       error: 'No matches are currently available.'
    //     })
    //   }
    //   const matchList = {};
    //   matches.forEach(match => {
    //     matchList[match.title] = {
    //       uid: match._id,
    //       title: match.title,
    //       owner: match.owner,
    //       players: match.players,
    //       winner: match.winner
    //     };
    //   });
    //   return res.send(matchList)
    // });
  });

  app.post('/api/game/matches', (req, res, next) => {
    const { winner, _id } = req.body;

    Game.findByIdAndUpdate({
      _id
    }, {
      $set: { winner }
    }, null, (err, data) => {
      if(err) {
        console.log(err);
        return res.send({
          success: false,
          error: 'Something went wrong.'
        });
      };
      return res.send({
        success: true,
        message: `The winner is ${data.winner}.`,
        info: data
      });
    });
  });

};
