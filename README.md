# CAPITANOS

### Requerimientos
- NodeJS V12
- MongoDB
- Redis

### Instalation
- Clone this repo
- Set the environment variables in the .env file in the root directory of project like 
```env
URLDB=mongodb://localhost:27017/capitanos
PORT=3000
REDIS_PORT=6379
```
- Run:
```bash
$ npm install
$ npm start
```
Inside the `public/js/socket.js` file there is an example of how to use the ws
### SocketIO Events
- GetFriends: Receive a user document like this
```JS
user: {
        "_id": "5effcb25844bf524ff780d68",
        "friends":[
            "5f00beb87e255924ab87125c", "5f0240ad9a3ef024c73a47d5", 
            "5f00af9a844bf524ff78140d", "5f0bccb5e84f7721297bc600",
            "5f48791cc58104051a95e979", "5f53a955f24a97065bb0ecd4", 
            "5f4896ca4000040608dd3013", "5f14e7d17d2b2b4e8be6cc84",
            "5f3f754b76cd56063e4738e3", "5f45e891545f2d0527ba5f4f", 
            "5f581f5fe3240f29a382b6df", "5ee9b2b9b237ea2cf010da30",
            "5f584e6c35722529deb96b07", "5efeda8727639022b34e35a8", 
            "5ec30e33a4bcf9062c5a62f2", "5f5c829ed9971d052b613076",
            "5f5e18bc082872051350eee0"
        ],
        "hunterSelected": "5effcb25844bf524ff780d6a"
    }
```

- GetRandom: Receive a hunter id like this
```JS
{ 
    "hunter": "5effcb25844bf524ff780d6a"
}
```
