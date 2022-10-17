/** @format */

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBLqH3iy-9uJlSLcnfpRdqSJk-s-0gFBxQ',
	authDomain: 'democracyapp-471e5.firebaseapp.com',
	projectId: 'democracyapp-471e5',
	storageBucket: 'democracyapp-471e5.appspot.com',
	messagingSenderId: '656973864541',
	appId: '1:656973864541:web:9fdec4176154eb4699b7b4',
	measurementId: 'G-DXLR56NW1Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
// const analytics = getAnalytics(app);
