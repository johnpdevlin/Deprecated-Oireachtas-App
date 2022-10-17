/** @format */

export default function findOldestObject(array: any[]): any {
	const oldest = array.reduce((a, b) => (a < b ? a : b));
	return oldest;
}
