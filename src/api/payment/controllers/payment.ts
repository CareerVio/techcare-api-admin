
import { factories } from '@strapi/strapi'
import Omise from 'omise'

export default factories.createCoreController('api::payment.payment' , ({strapi}) => ({
    async create(ctx) {
        try {
          
          const { id } = ctx.state.user;
          let { data } = ctx.request.body;

          data["user"] = id;
          
          
          const charge = {
            'description': data.description,
            'amount': data.amount * 100, 
            'currency': 'thb',
            'capture': true,
            'card': data.token
          };

          const response = await strapi.service('api::payment.payment').omise(charge);
          console.log(response);
          await strapi.entityService.create('api::payment.payment',{ data });
          
          ctx.body = response;
  

        } catch (err) {
          ctx.badRequest(err);
        }
    },
}));
