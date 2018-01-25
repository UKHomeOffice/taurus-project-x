import {Http} from "../Http/Http";
import {ClinicService} from "../ClinicService/ClinicService";

const clinicService = new ClinicService(new Http()),
    _ = require("lodash");

// TODO: handler should be tested
export const GetClinicsByOutwardCodeRoute = {
    method: 'GET',
    path: '/clinics/postcode/{postcode}',
    handler: (request, response) => {

        // TODO: create PostCode
        // TODO: in PostCode handle lower case -> uppercase all?
        // TODO: set response as json

        let postcodeString = request.params.postcode,
            postcode = {
                fullcode: _.toUpper(postcodeString),
                outwardCode: _.toUpper(postcodeString.split(" ")[0])
            };

        return clinicService.getAllByOutwardCode(postcode).then((clinics) => {

            return response(clinics);

        });


    }
}
