/* eslint-disable eggache/no-unexpected-plugin-keys */
'use strict';

// start mysql module,connect to database
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}

// start cors module, cross domin to access data
exports.cors = { 
  enable: true,
  package: 'egg-cors',
};
