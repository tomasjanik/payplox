import config from './config';
import Emitter from 'wildemitter';
import domready from 'domready';
import $ from 'jquery';

// controllers
import userCtrl from './controllers/user';
import clientCtrl from './controllers/client';

window.jQuery = window.$ = $;

// configuration
let app = {
  events: new Emitter(),
  $el: {}
};

app = config(app);

// initiate controllers
userCtrl(app);
clientCtrl(app);

// let's go
domready(function() {
  app.events.emit('domready');
  console.info(app.config.name + ' started');
});
