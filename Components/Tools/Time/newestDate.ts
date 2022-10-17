/** @format */

export default function findNewestDate(dates: Date[]): Date {
	let newest: Date = dates.reduce((c, n) => (n > c ? n : c));

	return newest;
}
