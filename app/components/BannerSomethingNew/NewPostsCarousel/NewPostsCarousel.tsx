// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import PostCard from "@/components/PostCard/PostCard";
import { defaultPostResponse } from "@/lib/helper";
import { FunctionComponent, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

interface CardSlideProps {
	myId: number;
	activeId: number;
}

const CardSlide: FunctionComponent<CardSlideProps> = ({ myId, activeId }) => {
	const imActive = myId == activeId;
	return (
		<PostCard
			myPost={defaultPostResponse}
			isExpanded={true}
			isClickable={imActive}
		/>
	);
};

interface NewPostsCarouselProps {}

const NewPostsCarousel: FunctionComponent<NewPostsCarouselProps> = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
	const [currentId, setCurrentId] = useState<number>(0);
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
		<Swiper
			effect={"coverflow"}
			spaceBetween={0}
			modules={[Navigation, Pagination, EffectCoverflow]}
			centeredSlides={true}
			slidesPerView={isSmallScreen ? 1 : 2}
			loop
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
			navigation
			pagination={{ clickable: true }}
		>
			{myPosts.map((title, idx) => (
				<SwiperSlide
					key={"slider_" + idx}
					className="object-cover w-full h-full swiper-lazy"
				>
					<CardSlide myId={idx} activeId={currentId} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default NewPostsCarousel;
