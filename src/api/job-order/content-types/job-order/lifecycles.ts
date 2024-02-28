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
            await strapi.entityService.update('api::job-order.job-order',result["id"], { data: { jobId , caliberate : "Success" , repair : "Required"} });
        } catch(err) {
            console.log(err);
        }
    },
};