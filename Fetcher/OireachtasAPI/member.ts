/** @format */

import fetcher from '..';
import { memberRequest } from '../../Models/apiRequests';
import { member } from '../../Models/UI/member';
import formatMember from './Formatter/member';

export default async function fetchMember(props: memberRequest) {
	let members;
	let url: string;

	if (props.member !== undefined) {
		url = `https://api.oireachtas.ie/v1/members?member_id=https%3A%2F%2Fdata.oireachtas.ie%2Fie%2Foireachtas%2Fmember%2Fid%2F${props.member}`;
	} else {
		url = `https://api.oireachtas.ie/v1/members?${
			props.date ? `date_start=${props.date}` : ''
		}&chamber_id=${props.chamber ? `&chamber=${props.chamber}` : ''}${
			props.houseNo ? `&house_no=${props.houseNo}` : ''
		}&date_end=${props.dateEnd ? props.dateEnd : '2099-01-01'}${
			props.constId ? `&const_code=${props.constId}` : ''
		}${props.partyId ? `&party_code=${props.partyId}` : ''}&limit=${
			props.limit ? props.limit : 2500
		}`;
	}

	members = (await fetcher(url)).results;

	if (props.formatted == false) {
		return members;
	}

	if (members.length == 1) {
		members = formatMember(members[0].member);
		if (props.serialized == true) {
			members = JSON.stringify(members);
			return members;
		}
	} else {
		let array: member[] = [];

		for (let m of members) {
			array.push(formatMember(m.member));
		}
		if (props.serialized == true) {
			members = JSON.stringify(array);
			return members;
		}
		return array;
	}
}
