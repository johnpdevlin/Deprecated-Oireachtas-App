/** @format */

import fetcher from '..';
import { constituenciesRequest, houseRequest } from '../../Models/apiRequests';
import house from '../../Models/house';

export default async function fetchConstituencies(
	props: constituenciesRequest
): Promise<any[]> {
	const url: string = `https://api.oireachtas.ie/v1/constituencies?chamber_id=&chamber=${
		props.chamber
	}&house_no=${props.houseNo}&limit=${props.limit ? props.limit : 80}`;

	let constits = (await fetcher(url)).results;

	return constits.house.constituenciesOrPanels;
}
