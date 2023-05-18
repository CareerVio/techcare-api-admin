/**
 * payment service
 */

import { factories } from '@strapi/strapi';
import Omise from 'omise';

export default factories.createCoreService('api::payment.payment', ({strapi}) => ({
    async omise(charge){
        const omise = Omise({
            'secretKey': 'skey_test_5vkqume3e8cmwtfh3he',
            'omiseVersion': '2019-05-29'
        });
        const omise_response = await omise.charges.create(charge);
        return omise_response;
    },
}));
