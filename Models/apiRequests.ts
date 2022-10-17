/** @format */

export interface voteRequest {
	member?: string;
	chamberType?: 'house' | 'committee';
	chamber?: 'dail' | 'seanad';
	date?: string | Date;
	dateEnd?: string | Date;
	limit?: number;
	outcome?: 'carried' | 'lost';
	debateId?: string;
	voteId?: string;
	formatted?: boolean;
}

export interface questionRequest {
	member?: string;
	questionType?: 'oral' | 'written';
	date?: string | Date;
	dateEnd?: string | Date;
	limit?: number;
	questionId?: string;
	questionNo?: number;
	formatted?: boolean;
}

export interface debateRequest {
	member?: string;
	chamberType?: 'house' | 'committee';
	chamber?: 'dail' | 'seanad';
	date?: string | Date;
	dateEnd?: string | Date;
	debateId?: string;
	limit?: number;
	formatted?: boolean;
	serialized?: boolean;
}

export interface memberRequest {
	member?: string;
	date?: string | Date;
	dateEnd?: string | Date;
	houseNo?: number;
	chamber?: 'dail' | 'seanad';
	chamberType?: 'house' | 'committee';
	constId?: string;
	partyId?: string;
	limit?: number;
	formatted?: boolean;
	serialized?: boolean;
}

export interface houseRequest {
	chamber?: 'dail' | 'seanad' | 'dail & seanad';
	houseNo?: number;
	limit?: number;
	formatted?: boolean;
	serialized?: boolean;
}

export interface constituenciesRequest {
	chamber?: 'dail' | 'seanad';
	houseNo?: number;
	limit?: number;
	formatted?: boolean;
	serialized?: boolean;
}

export interface partiesRequest {
	chamber?: 'dail' | 'seanad';
	houseNo?: number | string;
	limit?: number;
	formatted?: boolean;
	houseDetails?: boolean;
	serialized?: boolean;
}
