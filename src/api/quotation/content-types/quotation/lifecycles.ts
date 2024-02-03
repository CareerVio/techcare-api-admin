export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result , data) {
        //Fix from Strapi api response structure
        result = result.result;

        console.log('Inserted data', result);
        try {
            const quotationNumber = "TCS-Quotation-" + new Date().getFullYear() + "-" + result["id"].toString().padStart(6, '0');
            await strapi.entityService.update('api::quotation.quotation',result["id"], { data: { quotationNumber , status : "OnProgress"} });
        } catch(err) {
            console.log(err);
        }
    },
};