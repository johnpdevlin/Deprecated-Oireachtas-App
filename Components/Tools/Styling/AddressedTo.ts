/** @format */

import CapitaliseFirstLetter from './CapitaliseFirstLetter';

export default function formatAddressedTo(minister: string) {
	if (minister != 'Taoiseach' && minister != 'Tánaiste') {
		return `Minister for ${CapitaliseFirstLetter(minister)}`;
	}
	if (minister == 'Taoiseach' || 'Tánaiste') {
		return `An ${CapitaliseFirstLetter(minister)}`;
	}
}
