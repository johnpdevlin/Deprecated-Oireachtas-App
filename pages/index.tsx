/** @format */

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Container from '@mui/material/Container';
import Header from '../UI-Components/Header';
import fetchMember from '../Fetcher/OireachtasAPI/member';
import { member } from '../Models/UI/member';
import IndexLayout from '../UI-Components/Index/IndexLayout';
import fetchParties from '../Fetcher/OireachtasAPI/parties';
import fetchConstituencies from '../Fetcher/OireachtasAPI/constituencies';

const Home = (props: {
	members: JSON[];
	parties: JSON[];
	constits: JSON[];
}) => {
	let members: member[] = JSON.parse(props.members.toString()).filter(
		(m: { cessation: null }) => m.cessation == (undefined || null)
	);
	const name = '33rd Dáil';
	// let parties = JSON.parse(props.parties);
	console.log(props.constits);

	return (
		<>
			<Head>
				<title>{name} </title>
				<meta
					name={'description'}
					content={`Informational content for ${name} `}
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Container>
				<IndexLayout
					name={name}
					members={members}
					parties={props.parties}
					constits={props.constits}
				/>
				<footer></footer>
			</Container>
		</>
	);
};

export default Home;

/** @format */

export const getStaticProps: GetStaticProps = async () => {
	const members = await fetchMember({
		houseNo: 33,
		serialized: true,
	});

	const parties = await fetchParties({
		chamber: 'dail',
		houseNo: 33,
	});

	const constits = await fetchConstituencies({ chamber: 'dail', houseNo: 33 });

	return {
		props: {
			members: members,
			parties: parties,
			constits: constits,
		},
		revalidate: 43200, // 12 hours
	};
};
