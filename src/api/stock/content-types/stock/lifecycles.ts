export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result , data) {
        //Fix from Strapi api response structure
        result = result.result;

        console.log('Inserted data', result);
        try {
            const stockNumber = "TCS-Stock" + "-" + result["id"].toString().padStart(6, '0');
            await strapi.entityService.update('api::stock.stock',result["id"], { data: { stockNumber } });
        } catch(err) {
            console.log(err);
        }
    },
};