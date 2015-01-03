var help = require('app/controllers/helpers');
var User = require('app/models/user');

/**
 * Signup page
 * @method: GET
 */
function signup(req, res) {
  res.render('pages/login', {
    form: 'signup',
    message: req.flash('message')
  });
}

/**
 * Login page
 * @method: GET
 */
function login(req, res) {
  res.render('pages/login', {
    form: 'login',
    message: req.flash('message')
  });
}

/**
 * Logout
 * @method: GET
 */
function logout(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * Update email address
 *  @method: PUT
 */
function updateEmail(req, res, next) {
  var query = User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) next(err);

    user.updateEmail(req.body.email, function(err, user) {
      if (err)
        res.send({ error: true, message: err.message });
      else
        res.send({ _id: user._id, email: user.email });
    });
  });
}

/**
 * Update password
 *  @method: PUT
 */
function updatePassword(req, res, next) {
  var user = User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) next(err);

    user.updatePassword({
      current: req.body.currentPass, new: req.body.newPass
    }, function(err, resp) {

      if (err) throw err;
      res.send('Password changed');
    });
  });
}

/**
 * Update user addresses
 * @method: PUT
 */
function updateAddress(req, res, next) {
  User.update({ _id: req.user._id },
    { $push: { address: req.body.address }},
    function(err, user) {
      if (err) throw err;
      res.send('New address added');
  });
}

/**
 * Delete user address
 * @method: DELETE
 */
function deleteAddress(req, res, next) {
  User.update({ _id: req.user._id },
    { $pull: { address: { _id: req.params.id }}},
    function(err, user) {
      if (err) throw err;
      console.log(user);
      res.send('Address deleted');
  });
}

function setup(app, passport) {
  // create
  app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  app.post('/login', passport.authenticate('login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));

  // read
  app.get('/signup', signup);
  app.get('/login', login);
  app.get('/logout', logout);

  // update
  app.put('/user/email', help.protect, updateEmail);
  app.put('/user/password', help.protect, updatePassword);
  app.put('/user/address', help.protect, updateAddress);

  // delete
  app.delete('/user/address/:id', help.protect, deleteAddress);
}

module.exports = setup;
