/** @format */

import fetchDebates from '../../Fetcher/OireachtasAPI/debates';
import fetchQuestions from '../../Fetcher/OireachtasAPI/questions';
import fetchVotes from '../../Fetcher/OireachtasAPI/votes';
import { member, chamber } from '../../Models/UI/member';
import { participationDayRecord } from '../../Models/UI/participation';
import { writeRecordsBatch } from './writeToFirestore/writeBatch';
import checkParticipation from '../CheckParticipation';

export default async function writeParticipationRecords(
	dates: Date[],
	members: Promise<member[]>,
	chamber: chamber,
	session: number
): Promise<void> {
	let output = 0;
	let dateRecords: Promise<participationDayRecord[]> = [];
	let counter = 0; // count for writing batch

	for (let date of dates) {
		const hVotes = await fetchVotes({
			date: date,
			dateEnd: date,
			formatted: false,
			chamberType: 'house',
			chamber: 'dail',
		});

		const oQuestions = await fetchQuestions({
			questionType: 'oral',
			formatted: false,
			date: date,
			dateEnd: date,
		});

		const wQuestions = await fetchQuestions({
			questionType: 'written',
			formatted: false,
			date: date,
			dateEnd: date,
		});

		// // loops through dates to aggregate attendance
		for (let m of await members) {
			const debates = await fetchDebates({
				member: m.uri,
				chamberType: 'house',
				chamber: 'dail',
				date: date,
				dateEnd: date,
			});

			const mp = checkParticipation(
				m.uri,
				hVotes,
				debates,
				oQuestions,
				wQuestions
			);

			let record: participationDayRecord = {
				name: m.fullName,
				uri: m.uri,
				date: date,
				house: chamber,
				houseNo: session,
			};

			// Assigns returned values to object
			if ((await mp).housePresent == true) {
				// if present compounds tallies
				record.housePresent == true;
				record.houseSpeeches = (await mp).houseSpeeches;
				record.houseVotes = (await mp).houseVotes;
				if (chamber != 'seanad') {
					record.writtenQuestions! += (await mp).writtenQuestions;
					record.oralQuestions = (await mp).oralQuestions;
				}
			} else {
				record.housePresent = false;
				record.houseVotesMissed = (await mp).houseVotesMissed;
				record.writtenQuestions = (await mp).writtenQuestions!;
			}

			// Overall member record for session
			(await dateRecords).push(await record);
			if (counter == 499) {
				writeRecordsBatch(dateRecords);
				counter = 0;
				dateRecords = [];
				break;
			}
			output++;
			counter++;
			// }
		}
	}
	writeRecordsBatch(dateRecords);

	console.log(`Ended: ${new Date(Date.now())}`);

	setTimeout(async function () {
		console.log(output, 'ALL MEMBERS COMMITTED SUCCESSFULLY');
	}, 10000); // commits batch to firestore
}
