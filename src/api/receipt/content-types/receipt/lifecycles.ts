export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result , data) {
        //Fix from Strapi api response structure
        result = result.result;

        console.log('Inserted data', result);
        try {
            const receiptNumber = "TCS-Receipt-" + new Date().getFullYear() + "-" + result["id"].toString().padStart(6, '0');
            await strapi.entityService.update('api::receipt.receipt',result["id"], { data: { receiptNumber , status : "Waiting"} });
        } catch(err) {
            console.log(err);
        }
    },
};