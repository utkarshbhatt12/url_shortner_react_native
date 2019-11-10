import firebase from 'firebase/app';
import 'firebase/auth';
const init = require('./init.json');

const Firebase = firebase.initializeApp(init);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default Firebase;
