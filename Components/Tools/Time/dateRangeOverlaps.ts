/** @format */

export function dateRangeOverlaps(
	a_start: Date,
	a_end: Date,
	b_start: Date,
	b_end: Date
) {
	if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
	if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
	if (b_start < a_start && a_end < b_end) return true; // a in b
	return false;
}

export function multipleDateRangeOverlaps() {
	var i, j;
	if (arguments.length % 2 !== 0)
		throw new TypeError('Arguments length must be a multiple of 2');
	for (i = 0; i < arguments.length - 2; i += 2) {
		for (j = i + 2; j < arguments.length; j += 2) {
			if (
				dateRangeOverlaps(
					arguments[i],
					arguments[i + 1],
					arguments[j],
					arguments[j + 1]
				)
			)
				return true;
		}
	}
	return false;
}
