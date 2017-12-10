var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var Provider = mongoose.model('Provider', {
    DRG_Definition: String,
    Provider_Id: Number,
    Provider_Name : String,
    Provider_Street_Address: String,
    Provider_City: String,
    Provider_State: String,
    Provider_Zip_Code: Number,
    Hospital_Referral_Region_Description : String,
    Total_Discharges : Number,
    Average_Covered_Charges : SchemaTypes.Double,
    Average_Total_Payments : SchemaTypes.Double,
    Average_Medicare_Payments : SchemaTypes.Double
});

module.exports = Provider;