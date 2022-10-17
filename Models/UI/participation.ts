/** @format */

import { chamber } from './member';

export type MembershipType =
	| 'house'
	| 'party'
	| 'constituency'
	| 'panel'
	| 'committee';

export type groupType =
	| 'house'
	| 'party'
	| 'constituency'
	| 'panel'
	| 'committee';

export interface participationRecord {
	name: string;
	uri: string;
	house: chamber;
	houseNo?: number;
	members: Array<string>;
	houseContributed: number;
	noHouseContribution: number;
	committeePresent?: number;
	committeeAbsent?: number;
	houseSpeeches: number;
	committeeSpeeches?: number;
	oralQuestions?: number;
	writtenQuestions?: number;
	houseVotes: number;
	committeeVotes?: number;
}

// export interface participationDayRecord {
// 	name: string;
// 	uri: string;
// 	date: Date;
// 	house: chamber;
// 	houseNo: number;
// 	housePresent: boolean;
// 	committeePresent?: boolean;
// 	houseSpeeches: number;
// 	committeeSpeeches?: number;
// 	oralQuestions?: number;
// 	writtenQuestions?: number;
// 	houseVotes: number;
// 	houseVotesMissed?: number;
// 	committeeVotes?: number;
// }

export interface groupParticipationRecord extends participationRecord {
	type: groupType;
	pastMembers?: Array<{ uri: string; days: number }>;
	count?: number;
}

export interface Question {
	type: 'written' | 'oral' | 'oral, written';
	addressedTo: string;
	topic: string;
	content: string;
	questionNumber: number;
	url: string;
}

export interface Vote {
	chamber: 'house' | 'committtee';
	house: 'dail' | 'seanad';
	houseNo: string | number;
	committee?: string;
	committeeUri?: string;
	debate: string;
	subject: string;
	outcome: 'Carried' | 'Lost';
	tallies: { yes: number; no: number; abstained: number };
	memberTallies?: {
		yes: string[] | null | undefined;
		no: string[] | null | undefined;
		abstained: string[] | null | undefined;
	};
	voted?: 'Tá' | 'Níl' | 'Staon';
	voteId: number;
	debateSection: string;
	timeStamp: Date;
	voteUrl: string;
	debateUrl: string;
}
