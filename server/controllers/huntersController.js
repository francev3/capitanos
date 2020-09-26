var mongoose = require('mongoose')
const Hunter = require('../models/hunter')


const getFriends  = async(user, callback, client) => {

    const start = Date.now()
    const friends = user.friends.reduce((acc, el) => {
        acc.push(mongoose.Types.ObjectId(el))
        return acc
    }, [])

    const {level} = await Hunter.findById(user.hunterSelected).select('level -_id');

    const hunters = await Hunter.find(
        {
            locked: false,
            level: { $gte: level-10, $lte: level+10   },
            user: { $in: friends },
        }
    )
    .select({user: 1, locked: 1, level: 1})
    .limit(10)
    .lean()
    .exec((err, res) => {
        
        if (err)    callback(err)

        console.log('Duration = ', Date.now()-start)

        // enable this if you want use cache
        // client.setex(user._id, 10, JSON.stringify(res))

        callback(res)
    })

    // .explain()
    // console.log(hunters) 




 
}


const getRandom  = async(hunter, callback) => {
    
    const {level} = await Hunter.findById(hunter).select('level -_id').explain();

    const t = await Hunter.aggregate([
        {   
            $match: {
                locked: false,
                level: { $gte: level-10, $lte: level+10   },
            }
        }    
    ])
    .sample(10)
    .exec((err, res) => {
        if (err){
            console.log(err)
            callback(err)
        }        
        callback(res)
    })

    // .explain()
    // console.log(t)

}



module.exports = {
    getFriends : getFriends,
    getRandom: getRandom
};