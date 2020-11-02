/** @format */

import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyAdfQwhIkJmXkMzL9kp7vakVRHRRm9u9TQ',
	authDomain: 'barter-a625f.firebaseapp.com',
	databaseURL: 'https://barter-a625f.firebaseio.com',
	projectId: 'barter-a625f',
	storageBucket: 'barter-a625f.appspot.com',
	messagingSenderId: '1089716750829',
	appId: '1:1089716750829:web:cc2ad5d7e302a27923ffe4',
};

if (!firebase.apps.length) {
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
