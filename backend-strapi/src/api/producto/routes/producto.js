'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::producto.producto', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
