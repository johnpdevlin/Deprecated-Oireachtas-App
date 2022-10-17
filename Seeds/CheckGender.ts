/** @format */

import fetchNames from '../Fetcher/IrishNamesAPI';

export default async function checkGender(firstName: string) {
	// gets all names registered by gender
	const girlNames = await fetchNames('girl');
	const boyNames = await fetchNames('boy');

	if (firstName == (undefined || null)) return console.log('Name not found');

	if (
		// Check if male and not female name
		Object.values(boyNames).includes(firstName) &&
		Object.values(girlNames).includes(firstName) == false
	)
		return 'Male';

	if (
		// inverse of above
		Object.values(girlNames).includes(firstName) &&
		Object.values(boyNames).includes(firstName) == false
	)
		return 'Female';

	return console.log(
		'Name never been registered in Ireland or is considered both a male and female name.'
	);
}
