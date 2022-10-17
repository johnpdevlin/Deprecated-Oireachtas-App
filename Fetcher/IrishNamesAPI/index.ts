/** @format */
import fetcher from '../index';

export default function fetchNames(gender: string) {
	// fetches all boy or girl names registered in Ireland
	switch (gender) {
		case 'boy':
			return fetchBoyNames();
		case 'girl':
			return fetchGirlNames();
	}
}

async function fetchGirlNames(): Promise<string[]> {
	const url: string = `https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset/VSA60/JSON-stat/1.0/en`;
	const results = await fetcher(url);
	const names = results.dataset.dimension.C02514V04120.category.label;
	return names;
}

async function fetchBoyNames(): Promise<string[]> {
	const url: string = `https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset/VSA50/JSON-stat/2.0/en`;
	const results = await fetcher(url);
	const names = results.dimension.C02512V04117.category.label;
	return names;
}
