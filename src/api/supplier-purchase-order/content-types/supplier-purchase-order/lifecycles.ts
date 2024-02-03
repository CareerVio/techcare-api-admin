export default {
    /**
    * Triggered before user creation.
    */
    async afterCreate(result , data) {
        //Fix from Strapi api response structure
        result = result.result;

        console.log('Inserted data', result);
        try {
            const purchaseOrderNumber = "TCS-SupplierPO-" + result["id"].toString().padStart(4, '0');
            await strapi.entityService.update('api::supplier-purchase-order.supplier-purchase-order',result["id"], { data: { purchaseOrderNumber , status : "onprogress"} });
        } catch(err) {
            console.log(err);
        }

        console.log('Inserted data', result);
        try {
            const supplier = "Suppiler-TCS-" + result["id"].toString().padStart(4, '0');
            await strapi.entityService.update('api::supplier-purchase-order.supplier-purchase-order',result["id"], { data: { supplier , status : "onprogress"} });
        } catch(err) {
            console.log(err);
        }
    },
    
};