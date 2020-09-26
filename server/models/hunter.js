var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hunterSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Hunters' },
    locked: { type: Boolean },
    level: { type: Number }
});


hunterSchema.index({user: 1, level:1 })

// is useful when there are a lot locked=true hunters
hunterSchema.index({locked:1, level:1  })


module.exports = mongoose.model('Hunter', hunterSchema);
