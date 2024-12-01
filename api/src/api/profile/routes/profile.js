'use strict';

/**
 * profile router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::profile.profile',{
    config:{
        update:{
            middlewares: ['api::profile.is-owner']
        },
        delete:{
            middlewares: ['api::profile.is-owner']
        }
    }
});
