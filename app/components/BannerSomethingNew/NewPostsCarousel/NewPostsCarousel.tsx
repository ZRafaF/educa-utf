// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import PostCard from "@/components/PostCard/PostCard";
import { defaultPostResponse } from "@/lib/helper";
import { FunctionComponent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

interface NewPostsCarouselProps {}

const NewPostsCarousel: FunctionComponent<NewPostsCarouselProps> = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));

	return (
		<Swiper
			spaceBetween={5}
			modules={[Navigation, Pagination]}
			slidesPerView={isSmallScreen ? 1 : 3}
			onSlideChange={() => console.log("slide change")}
			onSwiper={(swiper) => console.log(swiper)}
			navigation
			pagination={{ clickable: true }}
		>
			<SwiperSlide>
				<PostCard myPost={defaultPostResponse} />
			</SwiperSlide>
			<SwiperSlide>
				<PostCard myPost={defaultPostResponse} />
			</SwiperSlide>
			<SwiperSlide>
				<PostCard myPost={defaultPostResponse} />
			</SwiperSlide>
			<SwiperSlide>
				<PostCard myPost={defaultPostResponse} />
			</SwiperSlide>
		</Swiper>
	);
};

export default NewPostsCarousel;
