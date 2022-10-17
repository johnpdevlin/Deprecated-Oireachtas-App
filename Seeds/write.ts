/** @format */
import { firestore } from './index';
import { doc, setDoc } from 'firebase/firestore';
import runAttendanceRegister from '../Attendance/WriteRecord';
import checkGender from './CheckGender';
import fetchTd from '../Fetcher/OireachtasAPI/td';
import fetchNames from '../Fetcher/IrishNamesAPI';

const td = doc(firestore, 'members/td');

const eoghan: string = 'Eoghan-Murphy.D.2011-03-09';
const ivana: string = 'Ivana-Bacik.S.2007-07-23';
const stevo: string = 'Stephen-Donnelly.D.2011-03-09';

export default async function writeTd() {
	const data = await fetchTd(stevo);
	const tdData = data.results[0].member;
	console.log(tdData);
	const { firstName, lastName, memberCode: uri } = tdData;
	const memberships = processMemberships(tdData.memberships);
	// try {
	// 	await setDoc(td, tdData);
	// 	console.log('Success');
	// } catch (err) {
	// 	console.log(err);
	// }
	checkGender(firstName);
}

function processMemberships(...memberships: any[]) {
	// Finds TD Memberships (Party, Constituency, Office)
	const houses = [];
	const parties = [];
	const constituencies = [];
	const offices = [];

	for (let m1 of memberships) {
		// Nested loop required as multidimensional array must be traversed
		for (let m2 of m1) {
			const houseNo = m2.membership.house.houseNo;
			// PUSH TO ARRAY
			// consider check for gaps / resignations / byelection?
			// if doesn't match session dates or uri date?
			processOffices(m2.membership.offices);
			processParties(m2.membership.parties);
			// ORDER PREVIOUS PARTIES BY YEARS
			processConstituencies(m2.membership.represents);
			// NEED FUNCTION TO CHECK FOR CONSTIT GAPS
			// CHECK AGAINST DAIL DATES
		}
	}
}

function processOffices(...offices: any[]) {
	// Finds TD Offices
	for (let office of offices) {
		for (let o of office) {
			const name = o.office.officeName.showAs;
			const start = new Date(o.office.dateRange.start);
			const end = new Date(o.office.dateRange.end);
			// PUSH TO ARRAY
		}
	}
}

function processParties(...parties: any[]) {
	// Finds TD Parties
	for (let party of parties) {
		for (let p of party) {
			const name = p.party.showAs;
			const uri = p.party.partyCode;
			const start = new Date(p.party.dateRange.start);
			const end = new Date(p.party.dateRange.end);
			// PUSH TO ARRAY
		}
	}
}

function processConstituencies(...constituencies: any[]) {
	for (let cons of constituencies) {
		for (let c of cons) {
			const name = c.represent.showAs;
			const type = c.represent.representType;
			const uri = c.represent.representCode;
			// PUSH TO ARRAY
		}
	}
}
function memberCode(memberCode: any) {
	throw new Error('Function not implemented.');
}
