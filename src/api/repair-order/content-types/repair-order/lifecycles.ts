export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result , data) {
        //Fix from Strapi api response structure
        result = result.result;

        console.log('Inserted data', result);
        try {
            const repairId = "AWS" + result["id"].toString().padStart(6, '0');
            await strapi.entityService.update('api::repair-order.repair-order',result["id"], { data: { repairId } });
        } catch(err) {
            console.log(err);
        }
    },
};