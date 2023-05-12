'use strict';

/**
 * device-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::device-data.device-data');
