/** @format */

import fetcher from '..';

export default async function fetchTd(tdUri: string) {
	const url = `https://api.oireachtas.ie/v1/members?member_id=https%3A%2F%2Fdata.oireachtas.ie%2Fie%2Foireachtas%2Fmember%2Fid%2F${tdUri}`;
	const td = await fetcher(url);
	return td;
}
