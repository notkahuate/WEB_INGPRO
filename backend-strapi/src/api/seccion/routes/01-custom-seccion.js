'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/secciones/producto/:itemId',
      handler: 'seccion.findByProductItemId',
      config: {
        auth: false,
      },
    },
  ],
};
