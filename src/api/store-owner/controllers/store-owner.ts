/**
 * store-owner controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::store-owner.store-owner',({ strapi }) => ({
    async registerStoreOwner(ctx){
        try {
            const { username,password,contact_info,email,phone_number,address,date_created,stores} = ctx.request.body;
            const role = await strapi.entityService.findMany('plugin::users-permissions.role', {
                filters: { name: 'Authenticated Store Owner' },
                limit: 1 
              });

            if (!role) {
                return ctx.throw(400, 'Role not found');
            }

            const newUser = {
                username,
                contact_info,
                password,
                email,
                phone_number,
                address,
                role: role[0].id, 
                date_created: Date.now(),
                stores
              };

              const user = await strapi.plugins['users-permissions'].services.user.add(newUser);

              const StoreOwner = await strapi.entityService.create('api::store-owner.store-owner', {
                data: newUser
              });

              ctx.send({
                jwt: strapi.plugin('users-permissions').services.jwt.issue({ id: user.id }),
                user: StoreOwner
              });
        
        }catch (err){
            if (err.name === 'ValidationError' && err.details && err.details.errors) {
                console.error('Validation errors:');
                err.details.errors.forEach((e, i) => {
                  console.error(`Error ${i + 1}:`, e);
                });
            }else{
                console.error(err);
            }
            strapi.log.error('User registration failed:', err);
            ctx.throw(400, `User Registration Failed: ${err.message}`);
        }
    },

    async loginStoreOwner(ctx){
        try {
            const { identifier, password } = ctx.request.body;

            let user = await strapi.entityService.findMany('plugin::users-permissions.user', {
                filters: { 
                    $or: [
                        { username: identifier },
                        { email: identifier },
                    ],
                },
                limit: 1,
            });
            user = user[0];
    
            if (!user) {
                return ctx.throw(400, 'User not found');
            }

            const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(password, user.password);

            if (!validPassword) {
                return ctx.throw(400, 'Invalid password');
            }

            const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

            ctx.send({
                jwt,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        }catch (err){
            console.error('User login failed:', err);
            ctx.throw(400, 'User login failed');
        }
    },
}));
