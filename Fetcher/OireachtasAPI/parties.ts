/** @format */

`https://api.oireachtas.ie/v1/parties?chamber_id=&chamber=dail&house_no=33&limit=50`;

import fetcher from '..';
import { partiesRequest } from '../../Models/apiRequests';

export default async function fetchParties(
	props: partiesRequest
): Promise<any[]> {
	const url = `https://api.oireachtas.ie/v1/parties?chamber_id=${
		props.chamber
			? `&chamber=${props.chamber}${
					props.houseNo ? `&house_no=${props.houseNo.toString()}` : ''
			  }`
			: ''
	}&limit=${props.limit ? props.limit : '150'}`;

	let parties = (await fetcher(url)).results;

	if (props.houseDetails == true) {
		return parties;
	}

	parties = parties.house.parties;

	return await parties;
}
