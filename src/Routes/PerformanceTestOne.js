const _ = require("lodash"),
    Promise = require("bluebird");

export const PerformanceTestOne = {
    method: 'GET',
    path: '/performance/test-one',
    handler: (request, response) => {

        // maybe implement exponential backoff for more interesting graphs
        return Promise.resolve(response({ data: [1, 2, 3] }));

    }

};
