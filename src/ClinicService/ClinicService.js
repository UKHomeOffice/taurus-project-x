import config from "../../config";
// import {Inject} from "@homeoffice/di-js";
// import {Configure} from "@homeoffice/configurator";
import {Http} from "../Http/Http";
import * as _ from "lodash";


// @Inject([Http])
export class ClinicService {

    // @Configure("ClinicService")
    config = config.ClinicService;

    constructor(http) {

        this.http = http;

    }

    getAllByOutwardCode(postCode) {

        const url = this.config.endpoint + "/partial_postcode?partial_postcode=" + postCode.outwardCode;

        return this.http.get(url, { json: true }).then((response) => {

            let exactPostCodeMatches = this.getExactPostcodeMatches(response.result, postCode.fullcode);

            return this.formatResponse(exactPostCodeMatches);

        });

    }

    getExactPostcodeMatches(responseResult, fullcode) {

        let results = _.cloneDeep(responseResult);

        return _.filter(results, (result) => {

            return result.postcode === fullcode;

        });
    }

    formatResponse(clinicData) {

        return {
            results: _.map(clinicData, (clinic) => {
                return {
                    organisation_id: clinic.organisation_id,
                    name: clinic.name,
                    address: this.getAddress(clinic)
                }
            })
        };
    }

    getAddress(clinic) {

        const addressFields = ["address1", "address2", "address3", "postcode", "city"];

        let name = clinic.name ? clinic.name + " " : "",
            addresses = _.reduce(addressFields, (addresses, fieldName) => {

                if (clinic[fieldName]) {

                    addresses.push(clinic[fieldName]);
                }

                return addresses;

            }, []);

        return name + "(" + addresses.join(", ") + ")";

    }

};