/** @format */
// INTERNAL
import fetchMember from '../../Fetcher/OireachtasAPI/member';
import Header from '../../UI-Components/Header';
import { getAggMemberRecords } from '../../Fetcher/FirestoreDB/Records/aggRecords';
import TDlayout from '../../UI-Components/Member/TDlayout';

//EXTERNAL
import { GetStaticPaths, GetStaticProps } from 'next/types';
import Head from 'next/head';
import {
	groupParticipationRecord,
	participationRecord,
} from '../../Models/UI/participation';

export default function TeachtaDála(props: {
	member: JSON;
	participation: (participationRecord | groupParticipationRecord)[];
}) {
	const member = JSON.parse(props.member.toString());

	return (
		<>
			<Head>
				<title>{member.fullName} </title>
				<meta
					name='description'
					content={`Informational content ${member.fullName}`}
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<TDlayout member={member} participation={props.participation} />=
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: 'blocking', //indicates the type of fallback
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params!;

	const member = await fetchMember({
		member: slug?.toString(),
		serialized: true,
	});

	const participation: participationRecord | groupParticipationRecord[] =
		await getAggMemberRecords({
			uri: slug,
			houseNo: 33,
		});

	return {
		props: {
			member: member,
			participation: participation,
		},
		// revalidate: 43200, // 12 hours
	};
};

// Bertie-Ahern.D.1977-07-05
// Stephen-Donnelly.D.2011-03-09
// Ivana-Bacik.S.2007-07-23
