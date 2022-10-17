/** @format */

import { firestore } from '../../../Seeds';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { dateRecordRequest } from '../../../Models/firestoreRequests';

export async function getAllDateRecords() {
	const querySnapshot = await getDocs(
		collection(firestore, 'Participation Records (Date)')
	);

	return querySnapshot;
}

export async function getSomeDateRecords(props: dateRecordRequest) {
	const q = query(
		collection(firestore, 'Participation Records (Date)'),
		// 	// where('houseNo', '==', 32),
		where('date', '<', props.endDate)
	);

	const querySnapshot = await getDocs(q);

	const datesRecords: [] = [];
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		datesRecords.push(doc.data());
	});

	return datesRecords;
}

export async function getMemberDateRecords(props: {
	uri: string;
	session?: number;
}) {
	const q = query(
		collection(firestore, 'Participation Records (Date)'),
		where('houseNo', '==', props.session),
		where('uri', '<', props.uri)
	);

	const querySnapshot = await getDocs(q);

	const datesRecords: [] = [];
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		datesRecords.push(doc.data());
	});

	return datesRecords;
}
