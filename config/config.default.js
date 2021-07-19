/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624442105143_3666';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // config/config.${env}.js
  config.mysql = {
    // database configuration-local
    /*
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'react_blog',
    },*/

    // database configuration-remote
    client: {
      host: 'blog-db.camhq7invtrq.us-east-2.rds.amazonaws.com',
      port: '3306',
      user: 'longlin',
      password: '12345678',
      database: 'react_blog',
    },

    // load into app, default true
    app: true,
    // load into agent, default false
    agent: false,
  };

  var port = process.env.PORT || 8081;
  config.cluster = {
    listen: {
      port: port,
      hostname: "0.0.0.0",
    }
  };

  exports.security = {
    csrf: {
      enable: false
    },
    domainWhiteList:['http://localhost:3000','http://localhost:3001','http://ll-blog-admin.s3-website.eu-west-3.amazonaws.com']
  }


  exports.cors = {
    enable: true,
    origin: ctx => ctx.get('origin'),
    credentials:true, // allow cookie or session cross domin
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'// ***becare full OPTIONS
  };

  return {
    ...config,
    ...userConfig,
  };
};
