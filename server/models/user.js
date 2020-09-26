var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hunterSchema = new Schema({
    friends:  [Schema.Types.ObjectId],
    hunterSelected: { type: Schema.Types.ObjectId, ref: 'Hunters', required: false },
    
});


module.exports = mongoose.model('User', hunterSchema);
