/** @format */

export default function findNewestObject(array: any[]): any {
	const newest = array.reduce((a, b) => (a.endDate > b.endDate ? a : b));
	return newest;
}
