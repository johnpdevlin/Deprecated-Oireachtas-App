/** @format */

export default interface house {
	name: string;
	uri: string;
	chamber?: 'dail' | 'seanad';
	houseNo: number;
	seats: number;
	startDate: Date;
	endDate?: Date | null;
}
