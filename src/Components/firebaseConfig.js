import firebase from "react-native-firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqLX1Pm550L-h85ysiXkEtpaBOB529WI4",
  authDomain: "hoc-chat1.firebaseapp.com",
  databaseURL: "https://hoc-chat1.firebaseio.com",
  projectId: "hoc-chat1",
  storageBucket: "hoc-chat1.appspot.com",
    messagingSenderId: "213027420366",
    appId: "1:213027420366:web:bae6c04f8ebcdf0c"
 
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;