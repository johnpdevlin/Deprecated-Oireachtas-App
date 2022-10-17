/** @format */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// ICONS // MUI
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

// INTERNAL UI-COMPONENTS
import SearchBar from './SearchBar';
import Image from 'next/image';

// IMAGES
import logo from '../images/logo.png';
import Link from 'next/link';

const pages = [
	{ title: 'TDs', url: '/td' },
	{ title: 'Constituencies', url: '/constituency' },
	{ title: 'Parties', url: 'party' },
	{ title: 'About', url: '/about' },
	{ title: 'Contact', url: '/contact' },
];

export default function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position='static' sx={{ mb: '5px', backgroundColor: '#A4C6CD' }}>
			<Container maxWidth='xl'>
				{/* HOMEPAGE LOGO // HOME BUTTON */}
				<Toolbar disableGutters>
					<Typography
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 'auto',
							display: { xs: 'none', md: 'flex' },
						}}>
						<Box maxWidth='330px' minWidth='200px'>
							<Image src={logo} />
						</Box>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						{/* MOBILE MENU */}
						<IconButton
							size='large'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
							<Box display='flex' maxWidth='290px' minWidth='250px'>
								<Image src={logo} />
							</Box>
						</IconButton>

						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{/* {pages.map((page) => (
								<MenuItem key={page.url} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>{page.title}</Typography>
								</MenuItem>
							))} */}
						</Menu>
					</Box>

					{/* <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page.url}
								onClick={handleCloseNavMenu}
								size='large'
								sx={{
									my: 4.5,
									color: 'white',
									display: 'block',
								}}>
								<Link href={page.url}>{page.title}</Link>
							</Button>
						))}
					</Box> */}
					<Box
						sx={{
							flexGrow: 3,
							maxWidth: '25%',
							display: { xs: 'none', md: 'flex' },
						}}>
						{/* <SearchBar /> */}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
