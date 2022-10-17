/** @format */

import { chamber } from './UI/member';
import { groupType } from './UI/participation';

export interface dateRecordRequest {
	startDate?: Date;
	endDate?: Date;
	chamber?: chamber;
	houseNo?: number;
}

export interface aggRecordRequest {
	uri?: string;
	chamber?: chamber;
	houseNo?: number;
	member?: number;
	type?: groupType;
}
