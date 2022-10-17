/** @format */

export default function findOldestDate(dates: Date[]): Date {
	const oldest: Date = dates.reduce((c, n) => (n < c ? n : c));
	return oldest;
}
