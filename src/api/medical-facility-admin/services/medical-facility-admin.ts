/**
 * medical-facility-admin service
 */

export default () => ({
    async getMedicalFacilityIdFromUser(ctx){
        const { id } = ctx.state.user;
      
        let [ medicalFacility ] = await strapi.entityService.findMany('api::medical-facility.medical-facility', {
            filters : { admin : id },
        });
        return medicalFacility.id;
    }
});
