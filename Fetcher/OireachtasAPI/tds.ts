/** @format */

import fetcher from '..';

export default async function fetchTds(session: number) {
	const url = `https://api.oireachtas.ie/v1/members?date_start=1900-01-01&chamber_id=&chamber=dail&house_no=${session}&date_end=2099-01-01&limit=250`;
	const td = await fetcher(url);
	return td;
}
