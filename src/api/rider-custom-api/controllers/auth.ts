import { factories } from '@strapi/strapi';

const riderAuthController = factories.createCoreController('plugins::users-permissions.auth', ({ strapi }) => ({
    
    // Registeration function for rider-users
    async register(ctx: any) {
        const { name, email, password, phone_number, created_date, location, workload, earning } = ctx.request.body;
        
        const role = await strapi.entityService.findOne('plugins::users-permissions.role', {
            filters: { code: 'authenticated-rider' }
        });

        if (!role) {
            return ctx.badRequest(null, 'Role not found');
        }

        try {
            const user = await strapi.plugins['user-permissions'].services.user.add({
                name,
                email,
                password,
                phone_number,
                created_date,
                location,
                workload,
                earning,
                role: role.id
            });
            ctx.body = { user };
        } catch(error) {
            ctx.badRequest('Rider Registeration Failed', error);
        }
    },

    // Login function for rider-users
    async login(ctx: any) {
        const baseLogin = await super.login(ctx);
        const { isRiderUser } = ctx.request.body;

        if (isRiderUser) {
            const riderRole = await strapi.entityService.findOne('plugins::users-permissions.role', {
                filters: { code: 'authenticated-rider' }
            });

            if (!riderRole) {
                return ctx.badRequest(null, 'Role not found');
            }

            await strapi.entityService.update('users-permissions_user', baseLogin.user.id, {
                data : { role : riderRole.id }
            });
        }

        return baseLogin;
    },
}));