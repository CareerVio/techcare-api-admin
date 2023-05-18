
import { factories } from '@strapi/strapi'
import Omise from 'omise'

export default factories.createCoreController('api::payment.payment' , ({strapi}) => ({
    async create(ctx) {
        try {
        console.log("Start Payment ..");
          const { id } = ctx.state.user;
          let { data } = ctx.request.body;

          data["user"] = id;
          
          const omise = Omise({
            'secretKey': 'skey_test_5vkqume3e8cmwtfh3he',
            'omiseVersion': '2019-05-29'
          });
          const charge = {
            'description': data.description,
            'amount': data.amount, 
            'currency': 'thb',
            'capture': true,
            'card': data.token
          };
          
          var isChagesCreated:boolean = false;
          await omise.charges.create(charge, function(err, resp) {
            if (resp.paid) {
                isChagesCreated = true;
            } else{
                //Error
            }
          });

          const response = await strapi.entityService.create('api::payment.payment',{ data });

          ctx.body = response;

        } catch (err) {
          ctx.badRequest(err);
        }
    },
}));
