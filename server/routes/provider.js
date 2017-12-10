
const Provider = require('../models/Provider');

var providerApi = {
    getProviders: function (req, res) {
        let params = req.query;
        let searchFilters = {};
        if (params.max_discharges) {
            searchFilters.Total_Discharges = Object.assign({}, searchFilters.Total_Discharges, { $lte: params.max_discharges });
        }
        if (params.min_discharges) {
            searchFilters.Total_Discharges = Object.assign({}, searchFilters.Total_Discharges, { $gte: params.min_discharges });
        }
        if (params.max_average_covered_charges) {
            searchFilters.Average_Covered_Charges = Object.assign({}, searchFilters.Average_Covered_Charges, { $lte: params.max_average_covered_charges });
        }
        if (params.min_average_covered_charges) {
            searchFilters.Average_Covered_Charges = Object.assign({}, searchFilters.Average_Covered_Charges, { $gte: params.min_average_covered_charges });
        }
        if (params.max_average_medicare_payments) {
            searchFilters.Average_Medicare_Payments = Object.assign({}, searchFilters.Average_Medicare_Payments, { $lte: params.max_average_medicare_payments });
        }
        if (params.min_average_medicare_payments) {
            searchFilters.Average_Medicare_Payments = Object.assign({}, searchFilters.Average_Medicare_Payments, { $gte: params.min_average_medicare_payments });
        }
        if (params.state) {
            searchFilters.Provider_State = { $eq: params.state }
        }

        Provider.find(searchFilters, function (err, providers) {
            if (err) {
                res.send(err);
            } else {
                res.json(providers);
            }
        });
    }
}

module.exports = providerApi;

// GET /providers?max_discharges=5&min_discharges=6&max_average_covered_charges=50000
// &min_average_covered_charges=40000&min_average_medicare_payments=6000
// &max_average_medicare_payments=10000&state=GA