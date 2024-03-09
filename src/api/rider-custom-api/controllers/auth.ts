/**
 * riderAuthController.js
 * A set of functions called "actions" for managing `RiderAuth`
 */

export default {
  /**
   * Register a rider user.
   */
  async registerRider(ctx: any) {
    try {
      const { username, name, email, password, phone_number, location, workload, earning } = ctx.request.body;
      
      // Look for the role by code
      // I use findMany because findOne is not operates correctlys
      const role = await strapi.entityService.findMany('plugin::users-permissions.role', {
        filters: { name: 'Authenticated Rider' },
        limit: 1 
      });

      if (!role) {
        return ctx.throw(400, 'Role not found');
      }
      
      const newUser = {
        username, 
        name,
        email,
        password,
        role: role[0].id, 
        phone_number,
        created_date : Date.now(),
        location,
        workload,
        earning,
      };
      
      // Use the user service to add a new user with the rider role
      const user = await strapi.plugins['users-permissions'].services.user.add(newUser);

      // Keep the userData to Rider User Collection
      const riderUser = await strapi.entityService.create('api::rider-user.rider-user', {
        data: newUser
      });

      // Respond with the new user and JWT token
      ctx.send({
        jwt: strapi.plugin('users-permissions').services.jwt.issue({ id: user.id }),
        user: riderUser
      });

    } catch (error) {
      
      if (error.name === 'ValidationError' && error.details && error.details.errors) {

        console.error('Validation errors:');
        error.details.errors.forEach((e, i) => {
          console.error(`Error ${i + 1}:`, e);
        });

      } else {
        console.error('Error:', error);
      }

      strapi.log.error('Rider registration failed:', error);
      ctx.throw(400, `Rider Registration Failed: ${error.message}`);

    }
  },

  /**
   * Log in a rider user.
   */
  async riderLogin(ctx) {
    try {
        const { identifier, password } = ctx.request.body;

        // Attempt to find the user by username or email
        // const user = await strapi.query('plugin::users-permissions.user').findOne({
        //     where: {
        //         $or: [
        //             { username: identifier },
        //             { email: identifier },
        //         ],
        //     },
        //     populate: ['role'], // Make sure to populate the role
        // });

        // get all users
        console.log(identifier, password);

        // I'm sorry kub but findOne has no filters
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
       
        // Verify the password
        const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(password, user.password);

        if (!validPassword) {
            return ctx.throw(400, 'Invalid password');
        }

        
        // If the password is valid and the user has the correct role, generate JWT
        const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

        // Respond with the JWT token and user information
        ctx.send({
            jwt,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error('Rider login failed:', error);
        ctx.throw(400, 'Rider login failed');
    }
}


};
