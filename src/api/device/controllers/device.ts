
import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::device.device' , ({strapi}) => ({
    async createDevice(ctx) {
        try {
          
          const { id } = ctx.state.user;
          let { data } = ctx.request.body;
          
          data["user"] = id

          const response = await strapi.entityService.create('api::device.device',{ data });

          ctx.body = response;

        } catch (err) {
          ctx.body = err;
        }
    },
    async find(ctx) {
        try {
          const response = await strapi.entityService.findMany('api::device.device');

          ctx.body = response;

        } catch (err) {
          ctx.body = err;
        }
    },
}));
