var socket = io('http://localhost:3000');

socket.on('connect', function(){
    console.log('Connected');
});

socket.on('disconnect', function(){
    console.log('Disconnected');
});


let start = Date.now()


socket.emit('GetFriends', { 
    user: {
        "_id": "5effcb25844bf524ff780d68",
        "friends":["5f00beb87e255924ab87125c","5f0240ad9a3ef024c73a47d5","5f00af9a844bf524ff78140d","5f0bccb5e84f7721297bc600","5f48791cc58104051a95e979","5f53a955f24a97065bb0ecd4","5f4896ca4000040608dd3013","5f14e7d17d2b2b4e8be6cc84","5f3f754b76cd56063e4738e3","5f45e891545f2d0527ba5f4f","5f581f5fe3240f29a382b6df","5ee9b2b9b237ea2cf010da30","5f584e6c35722529deb96b07","5efeda8727639022b34e35a8","5ec30e33a4bcf9062c5a62f2","5f5c829ed9971d052b613076","5f5e18bc082872051350eee0"],
        "hunterSelected":"5effcb25844bf524ff780d6a"
    }

}, ( res ) => {
    console.log(`Hunters: ${res.length}`,res);

    console.log('total time =', Date.now()-start)
});



start = Date.now()


socket.emit('GetRandom', { 
    hunter: "5effcb25844bf524ff780d6a"

}, ( res ) => {
    console.log(`Hunters: ${res.length}`, res);

    console.log('total time =', Date.now()-start)
});
