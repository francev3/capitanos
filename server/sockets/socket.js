const { io } = require('../server');
// const { clientRedis } = require('../server');
const {getFriends, getRandom} = require('../controllers/huntersController')


const cache = (user, callback) => {
    clientRedis.get(user._id+user.hunter, (err, data) => {
        if (err) return null

        if( data ){
            callback(JSON.parse(data))        
        }else{
            getFriends(user, callback, clientRedis)
        }
    });
}

io.on('connection', (client) => {
    
    /*
     * Build a emitter as a callback with in a event as prefix
     */
    const emitBuilder = (event) => {
        return (data) => {
            console.log(data)
            client.emit(event, data)
        }
        
    }
    

    
    client.on('disconnect', () => {
        // console.log('Usuario desconectado');
    });
    
    


    client.on('GetFriends', ({user}, callback) => {
        // enable this if you want use cache and comment the second line
        // cache(user, callback) 
        getFriends(user, callback) 
    })

    client.on('GetRandom', ({hunter}, callback) => {

        return getRandom(hunter, callback)
    })


    // getFriends(user, emitBuilder('GetFriends'))



});
