/** @format */
import { membership, membershipType } from '../../../../Models/UI/member';

interface DatePeriod {
	start: Date;
	end: Date | null | undefined;
}

let tempMembershipArray: membership[] = [];

export function processMembershipType(
	memberships: any[],
	membershipType: membershipType
) {
	tempMembershipArray = [];
	// FINDS NUMBER OF MEMBERSHIPS FOR THIS TYPE // EG No. of Partys been a member of
	const uris: string[] = countMemberships(memberships, membershipType);
	// console.log(uris);
	// IF MULTIPLE PARTIES
	if (uris.length > 1) {
		switch (membershipType) {
			case 'office':
				const officeNames = countMemberships(memberships, membershipType);
				for (let off of officeNames) {
					processIndividualMembership(
						memberships.filter((o) => {
							return o.office.officeName.showAs == off;
						}),
						membershipType
					);
				}
				//
				break;
			case 'party':
				for (let u of uris) {
					processIndividualMembership(
						memberships.filter((party) => {
							return party.party.partyCode == u;
						}),
						membershipType
					);
				}
				break;
			case 'constituency':
				for (let u of uris) {
					processIndividualMembership(
						memberships.filter((constit) => {
							return constit.represent.representCode == u;
						}),
						membershipType
					);
				}
				break;
		}
		// IF SINGLE PARTY
	} else if (uris.length == 1) {
		switch (membershipType) {
			case 'office':
				processIndividualMembership(memberships, membershipType);
				break;
			case 'party':
				processIndividualMembership(memberships, membershipType);
				break;
			case 'constituency':
				processIndividualMembership(memberships, membershipType);
		}
	}

	const { current, past } = formatMemberships(tempMembershipArray);

	return { current: current, past: past };
}

function processIndividualMembership(
	membershipInstances: any[],
	membershipType: membershipType
) {
	let uri: string;
	let name: string;
	let conType: string;

	// Destructures to get basic details
	if (membershipType == 'office') {
		name = membershipInstances[0].office.officeName.showAs;
		uri = name;
	} else if (membershipType == 'party') {
		name = membershipInstances[0].party.showAs;
		uri = membershipInstances[0].party.partyCode;
	} else if (membershipType == 'constituency') {
		name = membershipInstances[0].represent.showAs;
		uri = membershipInstances[0].represent.representCode;
		conType = membershipInstances[0].represent.representType;
	}

	const periods = reformatPeriods(membershipInstances, membershipType); // Gets continuous periods of membership

	for (let p of periods) {
		// FOR EACH UNBROKEN PERIOD, CREATES NEW OBJECT
		const newMembership: membership = {
			name: name,
			uri: uri,
			type: (membershipType = 'constituency' ? conType : undefined),
			startDate: p.startDate,
			endDate: p.endDate,
		};
		tempMembershipArray.push(newMembership);
	}
}

export function formatMemberships(tempArray: membership[]) {
	// FILTERS PARTIES BY DATES
	let currentMemberships: membership[];
	let pastMemberships: membership[];

	// FIND CURRENT MEMBERSHIP(S)
	currentMemberships = tempArray.filter(
		(cm) => cm.endDate == (null || undefined)
	);

	pastMemberships = tempArray.filter(
		(mem) => !currentMemberships.includes(mem)
	);

	return { current: currentMemberships, past: pastMemberships };
}

export function countMemberships(
	memberships: membership[],
	membershipType: 'office' | 'constituency' | 'party'
): string[] {
	// FINDS NUMBER OF PARTIES / CONSTIT / OFFICES

	let uriCodes: string[] = [];

	switch (membershipType) {
		case 'office':
			for (let m of memberships) {
				check(m.office.officeName.showAs);
			}
			break;
		case 'party':
			for (let m of memberships) {
				check(m.party.partyCode);
			}
			break;
		case 'constituency':
			for (let m of memberships) {
				check(m.represent.representCode);
			}
			break;
		default:
	}

	function check(uri: string) {
		if (uriCodes.includes(uri)) {
		} else {
			uriCodes.push(uri);
		}
	}

	return uriCodes;
}

export function reformatPeriods(instances: any[], membershipType: string) {
	let startDate: Date = new Date();
	let endDate: Date | undefined = new Date();

	if (instances.length >= 2) {
		// Merges time periods and separates where breaks in party membership
		switch (membershipType) {
			case 'office':
				return mergeMembershipPeriods(instances.map((i) => i.office));
			case 'party':
				return mergeMembershipPeriods(instances.map((i) => i.party));
			case 'constituency':
				return mergeMembershipPeriods(instances.map((i) => i.represent));
		}
	} else if (instances.length == 1) {
		// If only one instance, no merging required
		switch (membershipType) {
			case 'office':
				return [
					{
						startDate: instances[0].office.dateRange.start,
						endDate: instances[0].office.dateRange.end,
					},
				];
			case 'party':
				return [
					{
						startDate: instances[0].party.dateRange.start,
						endDate: instances[0].party.dateRange.end,
					},
				];
			case 'constituency':
				return [
					{
						startDate: instances[0].represent.dateRange.start,
						endDate: instances[0].represent.dateRange.end,
					},
				];
		}
	}
}

export function mergeMembershipPeriods(instances: any[]) {
	// console.log(instances);
	const yearRange = instances.map((i) => {
		let end = () => {
			if (i.dateRange.end == (null || undefined)) {
				return null;
			} else {
				return new Date(i.dateRange.end);
			}
		};
		return {
			startDate: new Date(i.dateRange.start),
			endDate: end(),
		};
	});
	return mergeRange(yearRange);
}

export function mergeRange(ranges: any[]) {
	// MERGES MEMBERSHIP PERIODS
	// CREATES INDIVIDUAL OBJECTS WHERE GAPS IN PERIODS
	// (compares start to end dates, uses year as dates do not align completely )
	const NOW = null;
	ranges.sort((r1, r2) => r1.startDate - r2.startDate);

	return ranges.reduce((result, current) => {
		if (result.length === 0) return [current];

		const lastRange = result[result.length - 1];

		if (
			lastRange.endDate === NOW ||
			lastRange.endDate.getFullYear() >= current.startDate.getFullYear()
		) {
			lastRange.endDate =
				lastRange.endDate === NOW || current.endDate === NOW
					? NOW
					: new Date(Math.max(lastRange.endDate, current.endDate));
		} else {
			result.push(current);
		}
		return result;
	}, []);
}
