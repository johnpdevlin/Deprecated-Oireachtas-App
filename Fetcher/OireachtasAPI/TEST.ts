/** @format */

import fetchMember from './member';

export default async function testFunction() {
	const member = await fetchMember({ member: 'Stephen-Donnelly.D.2011-03-09' });
	console.log(member);
}
