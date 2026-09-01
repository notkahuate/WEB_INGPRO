'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::seccion.seccion', ({ strapi }) => ({
  async findByProductItemId(ctx) {
    const { itemId } = ctx.params;

    if (!itemId) {
      return ctx.badRequest('itemId requerido');
    }

    const entries = await strapi.entityService.findMany('api::seccion.seccion', {
      filters: {
        producto: {
          item_id: itemId,
        },
      },
      populate: {
        imagenes: true,
      },
      sort: { orden: 'asc' },
    });

    const sanitized = await this.sanitizeOutput(entries, ctx);
    return this.transformResponse(sanitized);
  },
}));
