
import { factories } from '@strapi/strapi'
import Omise from 'omise'

export default factories.createCoreController('api::payment.payment' , ({strapi}) => ({
    async create(ctx) {
        try {
          
          const { id } = ctx.state.user;
          let { data } = ctx.request.body;
          
          const charge = {
            'description': data.description,
            'amount': data.amount * 100, 
            'currency': 'thb',
            'capture': true,
            'card': data.token
          };

          const response = await strapi.service('api::payment.payment').omise(charge);

          data["name"] = response.card.name;
          //console.log(response.card.name);
          await strapi.entityService.create('api::payment.payment',{ data });
          
          ctx.body = response;
  

        } catch (err) {
          console.log(err);
          ctx.badRequest(err);
        }
    },
    async find(ctx) {
      try {
          const data = await strapi.entityService.findMany('api::payment.payment', {
              populate : ["paymentEvidence"]
          });
          ctx.body = { data };
      } catch(err) {
          ctx.body = err;
      }
  }
}));
