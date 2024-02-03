export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result , data) {
        //Fix from Strapi api response structure
        result = result.result;

        console.log('Inserted data', result);
        try {
            const jobId = "AWS" + result["id"].toString().padStart(6, '0');
            await strapi.entityService.update('api::service-order.service-order',result["id"], { data: { jobId } });
        } catch(err) {
            console.log(err);
        }
    },
};