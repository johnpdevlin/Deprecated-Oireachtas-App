/** @format */

import { GetStaticPaths, GetStaticProps } from 'next/types';
import TdRecordsTabs from '../../UI-Components/Member/TdRecordsTabs';
import format from 'date-fns/format';
import Head from 'next/head';
import { Container, Grid, Paper } from '@mui/material';
import Header from '../../UI-Components/Header';
import AttendanceTable from '../../UI-Components/ParticipationTable';
import fetchMember from '../../Fetcher/OireachtasAPI/member';
import fetcher from '../../Fetcher';
import axios from 'axios';
import { Info } from '@mui/icons-material';
import formatMember from '../../Fetcher/OireachtasAPI/Formatter/member';

import {
	getAggMemberRecords,
	getAllAggMemberRecords,
} from '../../Fetcher/FirestoreDB/Records/aggRecords';
import ParticipationTable from '../../UI-Components/ParticipationTable';

export default function TeachtaDála(props: {
	members: JSON;
	participation: JSON[];
}) {
	const members: [] = props.members.map((m) => {
		return fetchMember(m.member.memberCode);
	});
	const participation = JSON.parse(props.participation);
	// const imgUrl = `https://data.oireachtas.ie/ie/oireachtas/member/id/${member.uri}/image/large`;
	console.log(participation);
	// export interface houseRequest {
	// 	chamber?: 'dail' | 'seanad' | 'dail & seanad';
	// 	houseNo?: number;
	// 	limit?: number;
	// }

	// const dates = {
	// 	start: new Date('2019-03-10'),
	// 	end: new Date('2020-02-07'),
	// };
	// runAttendanceRegister1111('dail', 32, dates);

	// const records = getSomeDateRecords({ endDate: new Date('2016-03-20') });
	// const dates = { end: new Date('2016-03-14') };

	// const records = aggregateParticipationChecker('dail', 33);

	return (
		<>
			<Head>
				<title>TDs of Dáil Éireann</title>
				<meta name='description' content={`Informational content Dái`} />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<Container>
				<main>
					{/* <Paper elevation={3}>
						<Grid container spacing={2}>
							<Grid item>
								<img
									src={imgUrl}
									alt={member.fullName}
									width={150}
									height={150}
								/>
							</Grid>
							<Grid item>
								<h1>{member.fullName}</h1>
								<h3>{member.offices?.map((o) => o.name)}</h3>
								<h4>
									{member.isCurrent
										? member.party?.name
										: member.pastParties?.map((pp) => pp.name)}{' '}
									{member.constituency?.type! == 'constituency' ? 'TD' : null}
									{member.pastConstituencies?.map((pp) => pp.name)}{' '}
								</h4>
							</Grid>
						</Grid>
					</Paper> */}

					<ParticipationTable participation={participation} />
					<br />
					<br />
				</main>
				<footer></footer>
			</Container>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const request = axios.get(
		`https://api.oireachtas.ie/v1/members?date_start=1900-01-01&chamber_id=&chamber=dail&house_no=33&date_end=2099-01-01&limit=50`
	);

	const member = (await request).data;

	const memberParticipation = await getAllAggMemberRecords({
		houseNo: 33,
		chamber: 'dail',
	});

	return {
		props: {
			members: member.results,
			participation: memberParticipation,
		},
		revalidate: 43200, // 12 hours
	};
};
