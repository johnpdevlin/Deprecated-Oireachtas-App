/** @format */
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

// class MyDate {
// 	dates: Date[];
// 	constructor() {
// 		this.dates = [];
// 	}

// 	private addDays(currentDate: string | number | Date) {
// 		let date = new Date(currentDate);
// 		date.setDate(date.getDate() + 1);
// 		return date;
// 	}

// 	getDates(startDate: Date, endDate: Date) {
// 		let currentDate: Date = startDate;
// 		while (currentDate <= endDate) {
// 			this.dates.push(currentDate);
// 			currentDate = this.addDays(currentDate);
// 		}

// 		return this.dates;
// 	}
// }

// let md = new MyDate();

// export default function daysBetween(start: Date, end: Date): string[] {

// 	const dates = md.getDates(start, end);

// 	const datesArray = dates.map((date: Date) => {
// 		const year = `${date.getFullYear()}`;
// 		const month = `${date.getMonth() + 1}`.padStart(2, '0');
// 		const day = `${date.getDate()}`.padStart(2, '0');
// 		return `${year}-${month}-${day}`;
// 	});

// 	return datesArray;
// }

export default function getDaysBetween(start: Date, end: Date) {
	const dates = eachDayOfInterval({ start, end });
	// const dates: Date[] = [];

	// let running: boolean = true;
	// let currentDate: Date = start;

	// let count = 100;
	// while (running && count != 0) {
	// 	if (dates.includes(end)) {
	// 		running = false;
	// 	}
	// 	if (dates.includes(currentDate) == false) {
	// 		dates.push(currentDate);
	// 		currentDate.setDate(currentDate.getDate() + 1);
	// 	}

	// 	count--;
	// }

	console.log(dates);
	// const dates = md.getDates(start, end);

	return dates.map((date: Date) => {
		const year = `${date.getFullYear()}`;
		const month = `${date.getMonth() + 1}`.padStart(2, '0');
		const day = `${date.getDate()}`.padStart(2, '0');
		return `${year}-${month}-${day}`;
	});
}
