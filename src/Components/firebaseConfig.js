import firebase from "react-native-firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqLX1Pm550L-h85ysiXkEtpaBOB529WI4",
  authDomain: "hoc-chat1.firebaseapp.com",
  databaseURL: "https://hoc-chat1.firebaseio.com",
  projectId: "hoc-chat1",
 //Not sure if i need the storageBucket url, migt need to add later
  //storageBucket: "<your-storage-bucket>"
 
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;