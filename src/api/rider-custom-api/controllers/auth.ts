/**
 * riderAuthController.js
 * A set of functions called "actions" for managing `RiderAuth`
 */

export default {
  /**
   * Register a rider user.
   */
  async registerRider(ctx) {
    try {
      const { name, email, password, phone_number, created_date, location, workload, earning } = ctx.request.body;
      
      // Look for the role by code
      const role = await strapi.entityService.findOne('plugin::users-permissions.role', {
        filters: { code: 'authenticated-rider' },
      });

      if (!role) {
        return ctx.throw(400, 'Role not found');
      }

      // Use the user service to add a new user with the rider role
      const user = await strapi.plugins['users-permissions'].services.user.add({
        username: name,
        email,
        password,
        role: role.id,
        // Assuming these are additional fields in your user model
        phone_number,
        created_date,
        location,
        workload,
        earning,
      });

      // Sanitize the user object to remove sensitive information
      const sanitizedUser = strapi.plugin('users-permissions').services.user.sanitizeUser(user);

      // Respond with the new user and JWT token
      ctx.send({
        jwt: strapi.plugin('users-permissions').services.jwt.issue({ id: user.id }),
        user: sanitizedUser,
      });
    } catch (error) {
      strapi.log.error('Rider registration failed:', error);
      ctx.throw(400, 'Rider Registration Failed');
    }
  },

  /**
   * Log in a rider user.
   */
  async riderLogin(ctx) {
    try {
      const { identifier, password } = ctx.request.body;

      // Authenticate the user using the user-permissions plugin service
      const { user, jwt } = await strapi.plugins['users-permissions'].services.auth.login({
        identifier,
        password,
      });

      if (!user) {
        return ctx.throw(400, 'Invalid identifier or password');
      }

      // Sanitize the user object to remove sensitive information
      const sanitizedUser = strapi.plugin('users-permissions').services.user.sanitizeUser(user);

      // Respond with the JWT token and user information
      ctx.send({
        jwt,
        user: sanitizedUser,
      });
    } catch (error) {
      strapi.log.error('Rider login failed:', error);
      ctx.throw(400, 'Invalid identifier or password');
    }
  },
};
