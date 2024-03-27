export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result , data) {
        //Fix from Strapi api response structure
        result = result.result;

        console.log('Inserted data', result);
        try {
            const receive = "TCS-SupplierReceive-" + result["id"].toString().padStart(4, '0');
            await strapi.entityService.update('api::supplier-receive.supplier-receive',result["id"], { data: { receive , status : "Complete"} });
        } catch(err) {
            console.log(err);
        }

        console.log('Inserted data', result);
        try {
            const supplier = "Suppiler-TCS-" + result["id"].toString().padStart(4, '0');
            await strapi.entityService.update('api::supplier-receive.supplier-receive',result["id"], { data: { supplier , status : "Complete"} });
        } catch(err) {
            console.log(err);
        }
    },
    
};