
export default {
    async update(ctx) {
        try {
          const header = ctx.request.header;
          const { data } = ctx.request.body;
          const user = ctx.state.user;
          await strapi.entityService.update('plugin::users-permissions.user', user.id, { data });
          ctx.body = data;
        } catch (err) {
          ctx.body = err;
        }
    },
};
