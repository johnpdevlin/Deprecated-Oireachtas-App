/** @format */
import { Attendance } from '../Models/types';
import fetchTds from '../Fetcher/OireachtasAPI/tds';
import {
	writeBatch,
	doc,
	query,
	where,
	collection,
	getDocs,
} from 'firebase/firestore';
import { firestore } from '.';

export default async function processAttendance(session: number) {
	// takes session, checks attendance for all tds in that session and writes batch to database
	const tdData = await fetchTds(session); // gets tdData
	const tds = tdData.results; // parses tdData slightly

	const ref = collection(firestore, 'attendance');

	const uri = `Holly-Cairns.D.2020-02-08`;

	const q = query(collection(firestore, 'attendance'), where('uri', '==', uri));

	// Tallies initialised and declared
	let presentTally = 0;
	let absentTally = 0;
	let totalContributions = 0;
	let totalQuestions = 0;
	let totalVotes = 0;

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		const data = doc.data();
		if (data.present == true) {
			presentTally++;
		} else if (data.present == false) {
			absentTally++;
		}
		if (data.contributions!) {
			totalContributions += data.contributions;
		}
		if (data.questions!) {
			totalQuestions += data.questions;
		}
		if (data.votes!) {
			totalVotes += data.votes;
		}
	});

	console.log(
		'votes: ',
		totalVotes,
		'questions: ',
		totalQuestions,
		'constributions:',
		totalContributions,
		'present: ',
		presentTally,
		'absent: ',
		absentTally,
		'% Present:',
		(presentTally / (presentTally + absentTally)) * 100
	);
}
