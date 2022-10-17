/** @format */

import { chamber } from './UI/member';

export default interface house {
	name: string;
	uri: string;
	chamber?: chamber;
	houseNo: number;
	seats: number;
	startDate: Date;
	endDate?: Date | null;
}
