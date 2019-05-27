let functions = require('firebase-functions');
let admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


//functions for sending push notifications, need to restructure the database before this can work
sendPush = functions.database.ref('/rooms/{key}').onWrite(event => {
    let roomStateChanged = false;
	let roomCreated = false;
    let roomData = event.data.val();
    if(!event.data.previous.exists()) {
        //If the room does not exist
        roomCreated = true;
        
    }
    if (!projectCreated && event.data.changed()) {
        projectStateChanged = true;
    }
    let msg = 'Ny besked';

if (projectCreated) {
	msg = `Ny besked i: ${roomData.title}`;
}

function loadUsers() {
	let dbRef = admin.database().ref('/messages/user');
	let defer = new Promise((resolve, reject) => {
		dbRef.once('value', (snap) => {
			let data = snap.val();
      let users = [];
      for (var property in data) {
	      users.push(data[property]);
      }
			resolve(users);
		}, (err) => {
			reject(err);
		});
	});
	return defer;
}
})