const _ = require("lodash");

export const PerformanceTestOne = {
    method: 'GET',
    path: '/performance/test-one',
    handler: (request, response) => {

        // maybe implement exponential backoff for more interesting graphs
        return response({});

    }

};
