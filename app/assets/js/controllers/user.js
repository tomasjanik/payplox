var User = require('../models/user');
var serialize = require('form-serialize');

function userController(app) {

  // create user object
  app.events.on('domready', function() {
    var userId = $('body').data('user-id');
    if (userId)
      app.user = new User(userId);
  });

  // localized element cache
  var el = app.$el.user = {
    form: {
      pw: $('form[name="updatePassword"]'),
      email: $('form[name="updateEmail"]'),
      address: $('form[name="updateAddress"]')
    },
    delAddress: $('.delete-address')
  };

  // update email address
  el.form.email.on('submit', function(e) {
    e.preventDefault();

    app.user.updateEmail({
      email: el.form.email.find('input[name="email"]').val(),
      _csrf: el.form.email.find('.csrf input').val()
    }, function(resp) {
      // if (resp.error)
      // TODO show update
      console.log(resp);
    });
  });

  // update password
  el.form.pw.on('submit', function(e) {
    e.preventDefault();

    app.user.updatePassword({
      currentPass: el.form.pw.find('input[name="currentPass"]').val(),
      newPass: el.form.pw.find('input[name="newPass"]').val(),
      _csrf: el.form.pw.find('.csrf input').val()
    }, function(resp) {
      // TODO handle it
      console.log(resp);
    });
  });

  // update address
  el.form.address.on('submit', function(e) {
    e.preventDefault();

    var address = serialize(this, { hash: true});
    app.user.updateAddress(address, function(resp) {
      // TODO handle it
      console.log(resp);
    });
  });

  // delete address
  el.delAddress.on('click', function() {
    var $this = $(this);

    app.user.deleteAddress(
    $this.data('address-id'),
    { _csrf: $this.data('csrf-token') },
    function(resp) {
      console.log(resp);
    });
  });

}

module.exports = userController;
