// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import PostCard from "@/components/PostCard/PostCard";
import { defaultPostResponse } from "@/lib/helper";
import {
	FunctionComponent,
	MutableRefObject,
	RefObject,
	useRef,
	useState,
} from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

interface CardSlideProps {
	myId: number;
	activeId: number;
	sliderRef: RefObject<SwiperRef>;
	numberOfSlides: number;
}

const CardSlide: FunctionComponent<CardSlideProps> = ({
	myId,
	activeId,
	sliderRef,
	numberOfSlides,
}) => {
	const imActive = myId == activeId;

	const slideNext = () => {
		sliderRef.current?.swiper.slideNext();
	};
	const slidePrev = () => {
		sliderRef.current?.swiper.slidePrev();
	};

	return (
		<>
			<div
				onClick={() => {
					const leftIdx =
						activeId == 0 ? numberOfSlides - 1 : activeId - 1;
					const rightIdx =
						activeId == numberOfSlides - 1 ? 0 : activeId + 1;

					if (myId == leftIdx) {
						slidePrev();
						return;
					}
					if (myId == rightIdx) {
						slideNext();
						return;
					}
				}}
			>
				<PostCard
					myPost={defaultPostResponse}
					isExpanded={true}
					isClickable={imActive}
				/>
			</div>
			<div
				style={{
					position: "absolute",
					background:
						"radial-gradient(50% 50% at 50% 50%, #000 -50%, rgba(2, 2, 2, 0.0) 80%)",
					height: "100px",
					width: "100%",
					bottom: "-50px",
					zIndex: -1,
				}}
			/>
		</>
	);
};

interface NewPostsCarouselProps {}

const NewPostsCarousel: FunctionComponent<NewPostsCarouselProps> = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
	const [currentId, setCurrentId] = useState<number>(0);
	const sliderRef = useRef<SwiperRef>(null);

	const myPosts = [
		"priome",
		"2",
		"123",
		"akjsnd",
		"o",
		":3",
		"priome",
		"2",
		"123",
		"akjsnd",
		"o",
		":3",
	];
	return (
		<div
			style={{
				position: "relative",
			}}
		>
			<Swiper
				effect={"coverflow"}
				spaceBetween={5}
				modules={[Navigation, Pagination, EffectCoverflow]}
				centeredSlides={true}
				slidesPerView={isSmallScreen ? 1 : 2}
				loop
				speed={750}
				onSlideChange={(swiper) => {
					if (swiper.realIndex == myPosts.length) {
						setCurrentId(0);
						return;
					}
					setCurrentId(swiper.realIndex);
				}}
				style={{
					paddingBottom: "50px",
				}}
				coverflowEffect={{
					rotate: 0,
					stretch: 80,
					scale: 0.7,
					depth: 100,
					modifier: isSmallScreen ? 0 : 1,
					slideShadows: true,
				}}
				navigation={!isSmallScreen}
				pagination={{ clickable: true }}
				ref={sliderRef}
			>
				{myPosts.map((title, idx) => (
					<SwiperSlide key={"slider_" + idx}>
						<CardSlide
							myId={idx}
							activeId={currentId}
							sliderRef={sliderRef}
							numberOfSlides={myPosts.length}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<div
				style={{
					position: "absolute",
					background:
						"radial-gradient(50% 50% at 50% 50%, #000 -50%, rgba(0, 0, 0, 0.00) 100%)",
					height: "100px",
					width: "100%",
					bottom: "-10px",
				}}
			/>
		</div>
	);
};

export default NewPostsCarousel;
