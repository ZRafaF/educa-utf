// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import {
	FunctionComponent,
	Suspense,
	useContext,
	useEffect,
	useState,
} from 'react';
import drawerWidth from '../../../lib/drawerWidth';
import styled from '@mui/material/styles/styled';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { OverlayControllerContext } from '@/contexts/OverlayControllerProvider';
import ToggleDrawerButton from './TogglerDrawerButton';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import ProfileButton from '../ProfileButton/ProfileButton';
import SearchBar from '../SearchBar/SearchBar';
import MainLogo from '../MainLogo/MainLogo';
import dynamic from 'next/dynamic';
import SearchBarIsExtendedContext from '@/contexts/SearchBarIsExtendedContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const NoSSRThemeToggler = dynamic(
	() => import('../ThemeToggler/ThemeToggler'),
	{
		ssr: true,
	}
);
interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

interface ControllerProps {}

const AppBarController: FunctionComponent<ControllerProps> = () => {
	const [open] = useContext(OverlayControllerContext);
	const [searchIsExtended, setSearchIsExtended] = useState(false);
	const theme = useTheme();
	const onlySmallScreen = useMediaQuery(theme.breakpoints.only('xs'));

	useEffect(() => {
		setSearchIsExtended(!onlySmallScreen);
	}, [onlySmallScreen]);

	return (
		<SearchBarIsExtendedContext.Provider
			value={[searchIsExtended, setSearchIsExtended]}
		>
			<AppBar
				position="absolute"
				open={open}
				sx={{
					position: 'fixed',
				}}
			>
				<Toolbar>
					<ToggleDrawerButton
						visible={!(onlySmallScreen && searchIsExtended)}
					/>

					<Link href={'/'}>
						<MainLogo
							visible={!(onlySmallScreen && searchIsExtended)}
						/>
					</Link>

					<SearchBar
						isExtended={searchIsExtended}
						setIsExtended={setSearchIsExtended}
						onlySmallScreen={onlySmallScreen}
					/>
					<Suspense fallback={<div>Carregando</div>}>
						{!(onlySmallScreen && searchIsExtended) && (
							<>
								<NoSSRThemeToggler />
								<ProfileButton />
							</>
						)}
					</Suspense>
				</Toolbar>
			</AppBar>
		</SearchBarIsExtendedContext.Provider>
	);
};

export default AppBarController;
