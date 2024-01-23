// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import ChapterCard from '@/components/ChapterCard/ChapterCard';
import { FunctionComponent, RefObject, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide, useSwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Stack from '@mui/material/Stack/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton/IconButton';
import {
	ChaptersResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import { ChaptersExpandTags } from '@/types/expanded-types';
import Box from '@mui/material/Box/Box';

interface CardSlideProps {
	myId: number;
	sliderRef: RefObject<SwiperRef>;
	myChapter: ChaptersStatsResponse<ChaptersExpandTags>;
}

const CardSlide: FunctionComponent<CardSlideProps> = ({
	myId,
	sliderRef,
	myChapter,
}) => {
	const imActive = useSwiperSlide().isActive;

	return (
		<>
			<div
				onClick={() => {
					sliderRef.current?.swiper.slideTo(myId);
				}}
			>
				<ChapterCard
					myChapter={myChapter}
					isExpanded={true}
					isClickable={imActive}
				/>
				<div
					style={{
						position: 'absolute',
						background:
							'radial-gradient(50% 30% at 50% 50%, #fff -700%, rgba(0, 0, 0, 0.0) 100%)',
						height: '100px',
						width: '100%',
						bottom: '-80px',
						zIndex: -1,
					}}
				/>
			</div>
		</>
	);
};

interface NewChaptersCarouselProps {
	myChapters: ChaptersStatsResponse<ChaptersExpandTags>[];
}

const NewChaptersCarousel: FunctionComponent<NewChaptersCarouselProps> = ({
	myChapters,
}) => {
	const theme = useTheme();
	const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only('xs'));
	const isSmallScreen = useMediaQuery(theme.breakpoints.only('sm'));
	const isMediumScreen = useMediaQuery(theme.breakpoints.only('md'));
	const isLargeScreen = useMediaQuery(theme.breakpoints.only('lg'));
	const sliderRef = useRef<SwiperRef>(null);

	return (
		<Box
			style={{
				position: 'relative',
			}}
			className={isExtraSmallScreen ? '' : 'faded-edges'}
		>
			<Swiper
				effect={'coverflow'}
				spaceBetween={
					isExtraSmallScreen
						? 5
						: isSmallScreen
						? -50
						: isMediumScreen
						? -80
						: -150
				}
				autoHeight
				modules={[Pagination, EffectCoverflow]}
				centeredSlides={true}
				slidesPerView={
					isExtraSmallScreen
						? 1
						: isSmallScreen || isMediumScreen
						? 1.7
						: isLargeScreen
						? 3
						: 3.5
				}
				rewind={true}
				preventClicksPropagation={false}
				preventClicks={false}
				speed={750}
				style={{
					paddingBottom: '75px',
				}}
				coverflowEffect={{
					rotate: 0,
					stretch: 20,
					scale: 0.7,
					depth: 0,
					modifier: isExtraSmallScreen ? 0 : 1,
					slideShadows: true,
				}}
				pagination={{
					clickable: true,
				}}
				ref={sliderRef}
			>
				{myChapters.map((post, idx) => (
					<SwiperSlide key={'slider_' + idx}>
						<CardSlide
							myId={idx}
							sliderRef={sliderRef}
							myChapter={post}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<div
				style={{
					position: 'absolute',
					background:
						'radial-gradient(50% 30% at 50% 50%, #fff -500%, rgba(0, 0, 0, 0.00) 100%)',
					height: '200px',
					width: '100%',
					bottom: '0px',
				}}
			/>
			<div data-mui-color-scheme="dark">
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					position={'absolute'}
					bottom={0}
					right={0}
					left={0}
				>
					<Stack
						direction="row"
						spacing={2}
						justifyContent={'space-between'}
						width={{ xs: '100%', sm: '90%' }}
					>
						<IconButton
							aria-label="carrossel anterior"
							size="small"
							sx={{ zIndex: 1 }}
							onClick={() => {
								sliderRef.current?.swiper.slidePrev();
							}}
						>
							<ChevronLeftIcon fontSize="large" />
						</IconButton>
						<IconButton
							aria-label="próximo carrossel "
							size="small"
							sx={{ zIndex: 1 }}
							onClick={() => {
								sliderRef.current?.swiper.slideNext();
							}}
						>
							<ChevronRightIcon fontSize="large" />
						</IconButton>
					</Stack>
				</Grid>
			</div>
		</Box>
	);
};

export default NewChaptersCarousel;
