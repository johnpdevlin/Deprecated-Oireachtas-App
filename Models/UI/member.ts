/** @format */

export interface member {
	uri: string;
	firstName: string;
	lastName: string;
	fullName: string;
	dateOfBirth?: Date;
	dateOfDeath?: Date;

	// MEMBERSHIPS
	party?: membership;
	pastParties?: membership[];
	constituency?: membership;
	pastConstituencies?: membership[];
	offices?: membership[];
	pastOffices?: membership[];
	dails?: membership[];
	seanads?: membership[];

	// PROCESSED DATA
	oireachtasUrl: string;
	// memberType: memberType;
	// pastMemberTypes?: memberType[];
	isCurrent?: boolean;
	firstElected: Date;
	firstDailElected?: Date;
	firstSeanadElected?: Date;
	cessation?: Date;
}

export interface membership {
	name: string;
	uri: string;
	type?: membershipType;
	house?: 'dail' | 'seanad';
	houseNo?: number;
	startDate: Date;
	endDate?: Date | undefined;
}

export type membershipType =
	| 'office'
	| 'house'
	| 'constituency'
	| 'party'
	| 'chamber'
	| 'panel'
	| undefined;

export type chamberType = 'house' | 'committee';
export type chamber = 'dail' | 'seanad' | undefined;
export type memberType = 'td' | 'senator' | undefined;
