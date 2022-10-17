/** @format */

import axios from 'axios';

export default async function fetcher(url: string) {
	try {
		const request = axios.get(url);
		return (await request).data;
	} catch (error) {
		console.log(error);
	}
}
