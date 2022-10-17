/** @format */

import fetchHouses from './houses';
import { houseRequest } from '../../Models/apiRequests';
import fetchVotes from './votes';
import {
	CurrencyExchangeRounded,
	HouseSidingOutlined,
} from '@mui/icons-material';

const currentDail = 33;
const currentSeanad = 26;
const currentOireachtas = 26;

interface committee {
	name: string;
	house: 'dail' | 'seanad' | 'dail & seanad';
	houseNo: number;
	uri: string;
}

// ISSUES EXIST AS NOT ALL VOTES // COMMITTEES RETURN AS EXPECTED
// ISSUE WITH OIREACHTAS API

export default async function getMemberCommittees(member: string) {
	// Only members can vote in commitee meetings
	// So gets member votes in committee meetings
	// Then if voted in commitee for that session, then deemed member

	const committeeVotes = fetchVotes({
		chamberType: 'committee',
		date: '2002-01-01',
		dateEnd: '2022-01-01',
		limit: 1000,
	});

	console.log(committeeVotes);
	const currentCommittees: committee[] = [];
	const pastCommittees: committee[] = [];

	for (let c of await committeeVotes) {
		let coms = {
			name: c.committee,
			uri: c.committeeUri,
			house: c.house,
			houseNo: +c.houseNo,
		};
		if (!currentCommittees.includes(coms)) {
			if (
				(coms.house == 'dail' && coms.houseNo == currentDail) ||
				(coms.house == 'seanad' && coms.houseNo == currentSeanad) ||
				(coms.house = 'dail & oireachtas' && coms.houseNo == currentOireachtas)
			) {
				currentCommittees.push(coms);
				break;
			}
		}
		if (!pastCommittees.includes(coms)) {
			if (
				(coms.house != 'dail' && coms.houseNo != currentDail) ||
				(coms.house != 'seanad' && coms.houseNo != currentSeanad) ||
				(coms.house != 'dail & oireachtas' && coms.houseNo != currentOireachtas)
			) {
				pastCommittees.push(coms);
				break;
			}
		}
	}

	return { currentCommittees, pastCommittees };
}
